// Earlham College team
// Bach, Samadhi, Sora




class XRayAnalyzer {
    constructor() {
        this.model = null;
        this.currentModelType = null;
        this.multiDiseases = [
            "Atelectasis", "Cardiomegaly", "Effusion", "Infiltration",
            "Mass", "Nodule", "Pneumonia", "Pneumothorax", "Consolidation",
            "Edema", "Emphysema", "Fibrosis", "Pleural Thickening", "Hernia"
        ];
        this.singleDisease = ["Pneumonia"];
        this.uploadBox = document.getElementById('upload-box');
        this.fileInput = document.getElementById('file-input');
        this.analyzeBtn = document.getElementById('analyze-btn');
        this.modelSelect = document.getElementById('model-select');
        this.previewCanvas = document.getElementById('preview-canvas');
        this.resultsList = document.getElementById('results-list');
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.loadingText = document.getElementById('loading-text');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add model selection handler that triggers image resize (b/c Sora model uses a different input shape :)) )
        this.modelSelect.addEventListener('change', () => {
            // If there's an image already loaded, reload it with new dimensions
            if (this.fileInput.files[0]) {
                this.handleFile(this.fileInput.files[0]);
            }
            this.analyzeBtn.disabled = !this.modelSelect.value || !this.previewCanvas.getContext('2d').getImageData(0, 0, 1, 1).data[3];
        });

        // Modified file handling to check both model and image
        this.uploadBox.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag and drop handling
        this.uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadBox.classList.add('dragover');
        });
        
        this.uploadBox.addEventListener('dragleave', () => {
            this.uploadBox.classList.remove('dragover');
        });
        
        this.uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadBox.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) this.handleFile(file);
        });

        // Modified analyze button to load model first
        this.analyzeBtn.addEventListener('click', async () => {
            await this.loadModel();
            await this.analyzeImage();
        });
    }

    handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const ctx = this.previewCanvas.getContext('2d');
                const modelType = this.modelSelect.value;
                
                // Set canvas dimensions based on model type
                if (modelType === 'single') {
                    this.previewCanvas.width = 180;
                    this.previewCanvas.height = 180;
                } else {
                    this.previewCanvas.width = 245;
                    this.previewCanvas.height = 245;
                }
                
                // Fill background
                ctx.fillStyle = 'white';  // Use white for better contrast
                ctx.fillRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
                
                // Calculate scaling to maintain aspect ratio
                const scale = Math.min(
                    this.previewCanvas.width / img.width,
                    this.previewCanvas.height / img.height
                );
                
                // Calculate position to center the image
                const x = (this.previewCanvas.width - img.width * scale) / 2;
                const y = (this.previewCanvas.height - img.height * scale) / 2;
                
                // Draw the image
                ctx.drawImage(
                    img,
                    x, y,
                    img.width * scale,
                    img.height * scale
                );
                
                // Enable analyze button only if model is selected
                this.analyzeBtn.disabled = !this.modelSelect.value;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    async loadModel() {
        const modelType = this.modelSelect.value;
        
        // Skip if same model is already loaded
        if (this.model && this.currentModelType === modelType) {
            return;
        }

        // Cleanup previous model if exists
        if (this.model) {
            this.model.dispose();
            this.model = null;
        }

        const modelPath = modelType === 'multi' 
            ? 'Final_EC_HackPrinceton_model/tfjs_EC_Team/model.json'
            : 'Final_EC_HackPrinceton_model/tfjs_1dis/model.json';

        try {
            this.loadingOverlay.style.display = 'flex';
            this.loadingText.textContent = 'Loading AI Model...';

            await tf.ready();
            await tf.setBackend('webgl');
            
            this.model = await tf.loadLayersModel(modelPath, {
                onProgress: (fraction) => {
                    const percent = (fraction * 100).toFixed(1);
                    this.loadingText.textContent = `Loading AI Model: ${percent}%`;
                }
            });

            // Warmup with correct input shape
            const warmupResult = tf.tidy(() => {
                const dummyInput = modelType === 'single' 
                    // RGB input for single disease
                    ? tf.zeros([1, 180, 180, 3])
                    // Grayscale input for multi-disease
                    : tf.zeros([1, 245, 245, 1]);   
                return this.model.predict(dummyInput);
            });
            await warmupResult.data();
            warmupResult.dispose();

            this.currentModelType = modelType;
            this.loadingOverlay.style.display = 'none';

        } catch (error) {
            console.error('Model loading error:', error);
            this.loadingText.textContent = 'Error loading model. Please try again.';
            throw error;
        }
    }

    async handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) this.handleFile(file);
    }

    async initialize() {
        try {
            this.loadingText.textContent = 'Initializing TensorFlow...';
            await tf.ready();
            await tf.setBackend('webgl');
            
            tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 0);
            tf.env().set('WEBGL_FORCE_F16_TEXTURES', false);
            tf.env().set('WEBGL_VERSION', 2);
            tf.env().set('WEBGL_FLUSH_THRESHOLD', 1);
            
            console.log('TensorFlow.js backend:', tf.getBackend());
            console.log('TensorFlow.js version:', tf.version.tfjs);

            this.loadingText.textContent = 'Loading AI Model...';
            const modelUrl = 'Final_EC_HackPrinceton_model/tfjs_EC_Team/model.json';
            const modelResponse = await fetch(modelUrl);
            if (!modelResponse.ok) {
                throw new Error(`Failed to fetch model: ${modelResponse.statusText}`);
            }

            this.model = await tf.loadLayersModel(modelUrl, {
                onProgress: (fraction) => {
                    const percent = (fraction * 100).toFixed(1);
                    this.loadingText.textContent = `Loading AI Model: ${percent}%`;
                    console.log(`Model loading: ${percent}%`);
                }
            });

            if (!this.model || typeof this.model.predict !== 'function') {
                throw new Error('Invalid model loaded');
            }

            this.loadingText.textContent = 'Warming up model...';
            const warmupResult = tf.tidy(() => {
                const dummyInput = tf.zeros([1, 245, 245, 1]);
                return this.model.predict(dummyInput);
            });
            
            await warmupResult.data();
            warmupResult.dispose();

            console.log('Model loaded and warmed up successfully');
            
            // Remove loading overlay
            this.loadingOverlay.style.display = 'none';
            document.body.classList.remove('loading');
            
            return true;

        } catch (error) {
            console.error('Model loading error:', error);
            this.loadingText.textContent = 'Error loading model. Please refresh the page.';
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                modelPath: 'Final_EC_HackPrinceton_model/tfjs_EC_Team/model.json',
                tfVersion: tf.version.tfjs,
                backend: tf.getBackend(),
                webglVersion: tf.env().getNumber('WEBGL_VERSION')
            });
            
            alert('Error loading the analysis model. Time to open console :))');
            return false;
        }
    }

    async processImage(modelType) {
        return tf.tidy(() => {
            const canvas = document.getElementById('preview-canvas');
            const ctx = canvas.getContext('2d');
            
            if (modelType === 'single') {
                // Create a temporary canvas with the exact dimensions needed
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = 180;
                tempCanvas.height = 180;
                const tempCtx = tempCanvas.getContext('2d');
                
                // Fill with white background (in case the image is smaller)
                tempCtx.fillStyle = 'white';
                tempCtx.fillRect(0, 0, 180, 180);
                
                // Draw the image maintaining aspect ratio
                const scale = Math.min(180 / canvas.width, 180 / canvas.height);
                const x = (180 - canvas.width * scale) / 2;
                const y = (180 - canvas.height * scale) / 2;
                tempCtx.drawImage(canvas, x, y, canvas.width * scale, canvas.height * scale);
                
                // Convert to RGB tensor with exact specifications
                return tf.browser.fromPixels(tempCanvas)  // This will be RGB (3 channels)
                    .resizeBilinear([180, 180])          // Ensure exact size
                    .expandDims(0)                        // Add batch dimension
                    .div(255.0);                         // Normalize to [0,1]
            } else {
                // Multi-disease model processing (unchanged)
                return tf.browser.fromPixels(canvas, 1)   // Grayscale
                    .resizeBilinear([245, 245])          // Original size
                    .expandDims(0)                        // Add batch dimension
                    .div(255.0);                         // Normalize to [0,1]
            }
        });
    }

    async analyzeImage() {
        if (!this.model) return;

        const modelType = this.modelSelect.value;
        let tensor = null;

        try {
            this.loadingOverlay.style.display = 'flex';
            this.loadingText.textContent = 'Analyzing image...';

            // Process image based on model type
            tensor = await this.processImage(modelType);
            
            // Get predictions
            const predictions = await this.model.predict(tensor).data();
            
            // Format predictions based on model type
            let formattedPredictions;
            if (modelType === 'single') {
                // Single disease model returns [[probability]]
                formattedPredictions = [[predictions[0]]];
            } else {
                // Multi-disease model returns array of probabilities
                formattedPredictions = Array.from(predictions);
            }

            // Display results
            this.displayResults(formattedPredictions);

        } catch (error) {
            console.error('Analysis error:', error);
            alert('Error analyzing image. Please try again.');
        } finally {
            this.loadingOverlay.style.display = 'none';
            // Clean up tensor
            if (tensor) {
                tensor.dispose();
            }
        }
    }

    displayResults(predictions) {
        this.resultsList.innerHTML = '';
        
        // Handle different model types
        if (this.currentModelType === 'single') {
            // Single disease model (Pneumonia)
            const probability = predictions[0][0]; // Get the single prediction value
            const percentage = (probability * 100).toFixed(1);
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            // Updated thresholds
            let confidenceClass;
            if (probability >= 0.20) {
                confidenceClass = 'high';
            } else if (probability >= 0.10) {
                confidenceClass = 'medium';
            } else {
                confidenceClass = 'low';
            }
            
            resultItem.innerHTML = `
                <div class="result-info">
                    <span class="disease">Pneumonia</span>
                </div>
                <div class="probability-container">
                    <div class="circular-progress ${confidenceClass}" 
                         style="--percentage: ${percentage}">
                        <div class="inner">
                            <div class="number">${percentage}%</div>
                        </div>
                    </div>
                </div>
            `;
            
            this.resultsList.appendChild(resultItem);
            
        } else {
            // Multi-disease model (original behavior)
            const results = this.multiDiseases.map((disease, index) => ({
                disease,
                probability: predictions[index]
            }));
            
            const topResults = results
                .sort((a, b) => b.probability - a.probability)
                .slice(0, 3);
            
            topResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                
                const confidence = result.probability;
                const percentage = (confidence * 100).toFixed(1);
                
                let confidenceClass;
                if (confidence >= 0.20) {
                    confidenceClass = 'high';
                } else if (confidence >= 0.10) {
                    confidenceClass = 'medium';
                } else {
                    confidenceClass = 'low';
                }
                
                resultItem.innerHTML = `
                    <div class="result-info">
                        <span class="disease">${result.disease}</span>
                    </div>
                    <div class="probability-container">
                        <div class="circular-progress ${confidenceClass}" 
                             style="--percentage: ${percentage}">
                            <div class="inner">
                                <div class="number">${percentage}%</div>
                            </div>
                        </div>
                    </div>
                `;
                
                this.resultsList.appendChild(resultItem);
            });
        }
    }
}

// Modified initialization
document.addEventListener('DOMContentLoaded', () => {
    new XRayAnalyzer();
    document.getElementById('loading-overlay').style.display = 'none';
    document.body.classList.remove('loading');
});

// Update this function at the end of your script file
function scrollToAnalysis() {
    scrollToSection('#analysis');
}

// Add this function at the end of the file
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    const headerHeight = document.querySelector('.floating-nav').offsetHeight;
    let offset;
    
    // Specific offset for analysis section
    if (sectionId === '#analysis') {
        const demoSection = document.querySelector('.demo-section');
        window.scrollTo({
            top: demoSection.offsetTop - headerHeight + 65,
            behavior: 'smooth'
        });
    } else {
        // Default behavior for other sections
        window.scrollTo({
            top: section.offsetTop - headerHeight + 65,
            behavior: 'smooth'
        });
    }
}

function toggleLoginModal(show) {
    const modal = document.getElementById('loginModal');
    modal.style.display = show ? 'flex' : 'none';
    
    if (show) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling when login window is open
    } else {
        document.body.style.overflow = ''; // Restore scrolling when login window is closed
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log('Login attempted with:', { email, password });
    
    // We did not have enough time for this
    toggleLoginModal(false);
    
    // Clear the form
    event.target.reset();
}

// Close modal when clicking outside
document.getElementById('loginModal').addEventListener('click', (e) => {
    if (e.target.className === 'modal-overlay') {
        toggleLoginModal(false);
    }
});
