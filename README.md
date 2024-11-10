# 🫁 ChestVision AI

<div align="center">
  <img src="hero-gifer.gif" alt="ChestVision AI Demo" width="150px" style="border-radius: 50%"/>
  <h3>Advanced Chest X-Ray Analysis Powered by AI</h3>
  <img src="https://img.shields.io/badge/TensorFlow-2.0+-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
</div>

## 🌟 Overview

Welcome to **ChestVision AI**, the cutting-edge web application designed to empower healthcare professionals with **AI-driven chest X-ray analysis**. Our platform uses advanced deep learning to provide **rapid, accurate, and reliable detection** of a variety of chest conditions, significantly improving diagnostic accuracy and speed.

### 🚀 **Visit Our Official Website**  
For more information, explore our official website:  
[**chestvision.us**](https://chestvision.us)

At **ChestVision AI**, we are dedicated to pushing the boundaries of medical technology, combining **artificial intelligence** with **medical imaging** to provide **real-time insights** directly on your browser. Whether you are a healthcare professional or a researcher, **ChestVision AI** offers an indispensable tool for analyzing chest X-ray images.

Our platform’s key benefits include:

- **🌍 Accessible Anywhere**: Accessible via web browsers, providing a **responsive design** for desktops, tablets, and mobile devices.
- **⚡ Real-Time Results**: AI-powered analysis provides instant results with confidence scores, enhancing clinical workflow.
- **🔒 Secure & Private**: All image analysis happens **client-side**, ensuring that your data remains private and secure.
- **🧠 AI Specialization**: Our models specialize in detecting a wide range of chest-related conditions, including **pneumonia**, **atelectasis**, **cardiomegaly**, and more.

By utilizing state-of-the-art machine learning technologies like **TensorFlow.js**, our platform offers powerful diagnostics directly in your browser without the need for external servers, ensuring both **speed** and **data privacy**.

---

**Discover the future of medical imaging with ChestVision AI.**  
Visit our website at [**chestvision.us**](https://chestvision.us) to learn more and get started today!

## ✨ Features

- 🔍 **Multi-Disease Detection**: Capable of identifying 14 different chest conditions
- 🏥 **Pneumonia Specialization**: Dedicated model for pneumonia detection
- 📊 **Real-time Analysis**: Instant results with confidence scores
- 📱 **Responsive Design**: Seamless experience across all devices
- 🔒 **Secure Processing**: Client-side analysis ensuring data privacy

## 🔧 Technical Specifications

### Dataset

- **Training**: 78,468 images from ChestX-ray14 Dataset
- **Validation**: 11,218 images from ChestX-ray14 Dataset
- **Testing**: 22,432 images from ChestX-ray14 Dataset

### Supported Conditions

Js
   
    ```const detectedConditions = [
      "Atelectasis", "Cardiomegaly", "Effusion", 
      "Infiltration", "Mass", "Nodule", 
      "Pneumonia", "Pneumothorax", "Consolidation",
      "Edema", "Emphysema", "Fibrosis", 
      "Pleural Thickening", "Hernia"
      ]
      '''
## Get Started

1. Clone the repository:
    ```bash
    git clone https://github.com/2006coder/ChestVision_AI_HackPrinceton2024.git
    ```
2. Open **index.html** in your browser or set up a local server:
    ```bash
    python -m http.server 8000
    ```

Then, visit http://localhost:8000 in your browser.


## 💻 Usage

Follow these simple steps to get started with ChestVision AI:

1. **Select your preferred model**  
   Choose between **Multi-Disease Detection** or **Pneumonia Detection** to tailor the analysis for your needs.

2. **Upload a chest X-ray image**  
   Supported formats: **DICOM**, **JPG**, or **PNG**. Simply drag and drop the image into the uploader.

3. **Click "Analyze Image"**  
   Let the AI work its magic and process the image.

4. **View the detailed analysis results**  
   Get instant results with confidence scores for each detected condition.

---

## ⚠️ Disclaimer

> This AI-assisted diagnostic tool is designed to **supplement**, not replace, **professional medical judgment**.  
> Always consult with qualified healthcare professionals for medical decisions.

---

## 🛠️ **Technologies Used** 🔧

### **TensorFlow.js** - 🧠 Real-Time AI Model Deployment
- **TensorFlow.js** powers the machine learning models deployed **directly in the browser**, enabling **real-time AI inference**. This means your data never leaves your device, ensuring **privacy** and **speed**.
- The **Multi-Disease Detection Model** was trained by **Bach** using a **complex residual network** that predicts **14 different chest-related conditions** from X-ray images. Here's a breakdown:
  - **Training Time**: ⏱️ **3.68 hours**
  - **Network Architecture**: 🧬 **Residual Network** for efficient feature extraction.
  - **Dataset**: 🖼️ **ChestX-ray14 Dataset**
    - **Training Set**: 78,468 images
    - **Validation Set**: 11,218 images
    - **Testing Set**: 22,432 images
- This model is able to detect conditions like **Atelectasis**, **Cardiomegaly**, **Effusion**, and more!

### **Particles.js** - ✨ Interactive Background Animations
- **Particles.js** creates stunning and **interactive particle effects** in the background. These beautiful animations enhance the overall **user experience** by responding to scroll and mouse movements.
- With **Particles.js**, the background remains lively and dynamic, engaging users without distracting from the core content.

### **AOS (Animate On Scroll)** - 🌀 Smooth Scroll Animations
- **AOS** adds smooth, engaging animations that trigger when the user scrolls through the page. This helps keep the **user interface** dynamic, making the app feel more fluid and interactive.
- Whether it’s **fade-ins**, **slide-ins**, or **zoom effects**, AOS ensures a captivating user experience that highlights important content as users scroll.

### **Modern CSS Techniques** - 🎨 Sleek & Responsive Design
- **Flexbox** and **CSS Grid** were employed to create a **flexible** and **responsive layout**, ensuring the app looks great on all screen sizes, from mobile to desktop.
- **Glassmorphism** adds a **frosted-glass** effect, making the design feel modern and sophisticated with translucent backgrounds and soft blur effects.
- Together, these technologies provide a **clean**, **minimalistic**, and **intuitive** design that’s easy to navigate.

---

### 💡 **Model-Specific Details:**

#### **Multi-Disease Detection Model** (14 Conditions) 🏥
- **Training Time**: ⏱️ **3.68 hours**
- **Network Architecture**: 🧬 **Residual Network** - A complex deep learning architecture optimized for high accuracy.
- **Dataset**: 🖼️ **ChestX-ray14 Dataset**
  - **Training Set**: 78,468 images
  - **Validation Set**: 11,218 images
  - **Testing Set**: 22,432 images
- **Supported Conditions**:  
  This model can detect a range of chest-related diseases such as:
  - **Atelectasis**, **Cardiomegaly**, **Effusion**, **Mass**, **Nodule**, and more!
  
#### **Pneumonia Detection Model** (Binary Classification) 🫁
- **Training Time**: ⏱️ **22 minutes**
- **Network Architecture**: **DenseNet-121** 💥 - A highly efficient and advanced deep learning network optimized for medical imaging.
- **Dataset**: 🖼️ **Kaggle Chest X-ray Dataset**
  - **Training Set**: 5,863 images of chest X-rays labeled as **Pneumonia** or **Non-Pneumonia**.
- **Output**: This model provides a **Pneumonia vs. Non-Pneumonia** classification for X-ray images, offering a quick diagnosis for suspected cases.

---

## 👥 Meet the Team

<div align="center">
  <table>
    <thead>
      <tr>
        <th>Member</th>
        <th>Role</th>
        <th>GitHub</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Bach</td>
        <td>ML Engineer</td>
        <td><a href="https://github.com/2006coder">@2006coder</a></td>
      </tr>
      <tr>
        <td>Samadhi</td>
        <td>Web Developer</td>
        <td><a href="https://github.com/samadhichandrasena">@samadhichandrasena</a></td>
      </tr>
      <tr>
        <td>Sora</td>
        <td>ML Engineer</td>
        <td><a href="https://github.com/sowada23">@sowada23</a></td>
      </tr>
    </tbody>
  </table>
</div>

---

## 📄 License

Copyright © 2024 **ChestVision AI**. All rights reserved.

---

<div align="center">
  Made with ❤️
</div>
