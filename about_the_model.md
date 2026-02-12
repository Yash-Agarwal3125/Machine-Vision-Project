# Kidney Stone AI Diagnosis System: Training Methodology

## Project Overview
This project implements a two-stage Deep Learning pipeline to automate the detection and localization of kidney stones in CT scans. The system mimics a radiologist's workflow: first identifying the pathology (Classification) and then pinpointing its location (Object Detection).

---

## Phase 1: Disease Classification (The "Triage" Model)

### 1. Objective
To categorize a CT scan into one of four classes: **Cyst, Normal, Stone, or Tumor**. This acts as a filter to ensure only relevant cases are passed to the localization engine.

### 2. Dataset
* **Source:** CT Kidney Dataset (Kaggle).
* **Volume:** ~12,400 images.
* **Classes:** Normal, Cyst, Tumor, Stone.
* **Splitting Strategy:** * **80% Training:** Used to teach the model.
    * **20% Validation:** Used to test the model on unseen data to prevent "memorization" (overfitting).

### 3. Model Architecture: EfficientNetB0
We utilized **Transfer Learning** with the **EfficientNetB0** architecture.
* **Why EfficientNet?** It is a State-of-the-Art (SOTA) convolutional neural network (CNN) that balances accuracy with computational efficiency. It uses "Compound Scaling" to optimize depth, width, and resolution simultaneously.
* **Pre-training:** The model was initialized with weights pre-trained on **ImageNet** (14 million images). This allows the model to recognize basic shapes (edges, textures) immediately, drastically reducing training time.
* **Custom Head:** We removed the original top layer and added:
    * `GlobalAveragePooling2D`: To reduce feature map dimensions.
    * `Dense (256 neurons, ReLU)`: To learn kidney-specific features.
    * `Dropout (0.4)`: To randomly deactivate 40% of neurons during training, forcing the network to learn robust features (preventing overfitting).
    * `Softmax Layer`: To output probabilities for the 4 specific classes.

### 4. Training Configuration
* **Optimizer:** Adam (Adaptive Moment Estimation) - adjusts learning rates dynamically.
* **Loss Function:** `categorical_crossentropy` (standard for multi-class classification).
* **Callbacks:**
    * `EarlyStopping`: Monitors validation loss; stops training if performance degrades for 3 epochs.
    * `ModelCheckpoint`: Automatically saves the version of the model with the highest validation accuracy.

---

## Phase 2: Stone Localization (The "Specialist" Model)

### 1. Objective
To detect the exact coordinates (bounding box) of a kidney stone within an image identified as "positive" for stones.

### 2. Dataset
* **Source:** Kidney Stone Images with Bounding Box Annotations (Kaggle).
* **Volume:** ~1,300 images (Subset of data specifically annotated for object detection).
* **Format:** YOLO (You Only Look Once) format, where each image has a corresponding text file with coordinates: `<class_id> <x_center> <y_center> <width> <height>`.

### 3. Model Architecture: YOLOv8 (Nano)
We utilized **YOLOv8n (Nano)**, the lightest and fastest version of the YOLO family.
* **Single-Shot Detection:** Unlike older models (R-CNN) that scan an image multiple times, YOLO looks at the image once to predict both class and location simultaneously.
* **Anchor-Free Detection:** It predicts the center of an object directly rather than using pre-defined "anchor boxes," making it more flexible for irregular shapes like kidney stones.

### 4. Training Metrics Explained
During training, the model minimized three specific loss functions:
1.  **Box Loss (`box_loss`):** Measures how accurate the predicted bounding box coordinates are compared to the ground truth. (Lower is better).
2.  **Class Loss (`cls_loss`):** Measures if the object inside the box was correctly identified as a "Stone". (Lower is better).
3.  **DFL Loss (Distribution Focal Loss):** Helps refine the boundaries of the box when the edges are fuzzy (common in ultrasound/CT scans).

### 5. Performance Metrics (mAP)
The primary metric for success was **mAP50 (Mean Average Precision at IoU 0.50)**.
* **IoU (Intersection over Union):** The overlap between the *predicted* box and the *actual* box.
* **mAP50:** The accuracy of the model when we require at least 50% overlap to count a detection as "correct".
* **Result:** The model achieved an **mAP50 of ~0.74 (74%)** in just 15 epochs, indicating strong localization capabilities for a prototype.

---

## Integration Strategy (The "Pipeline")
For the final application, these two models function in series:
1.  **Input:** Raw CT Scan Image.
2.  **Step 1 (Classifier):** `kidney_stone_classifier.h5` predicts the diagnosis.
3.  **Logic Check:** * `IF prediction == "Stone"` $\rightarrow$ Proceed to Step 2.
    * `ELSE` $\rightarrow$ Generate Report immediately (e.g., "Finding: Tumor detected").
4.  **Step 2 (Detector):** `best.pt` scans the image and overlays a bounding box on the stone.
5.  **Output:** Annotated image + Diagnosis Text.


Here is the updated **Technical Architecture** section. This is written in a formal, academic style suitable for your project report or `README.md`. It breaks down exactly what is happening inside the models you just trained.

---

# Technical Architecture & Model Specifications

This project utilizes a cascaded deep learning pipeline consisting of two distinct models: a **Classifier** (EfficientNetB0) for pathology identification and an **Object Detector** (YOLOv8n) for precise localization.

## Model 1: Pathology Classifier (EfficientNetB0)

* **Role:** Determines the presence of pathology (Stone, Cyst, Tumor) or if the scan is Normal.
* **Framework:** TensorFlow/Keras.
* **Input Resolution:**  (RGB).

### Network Architecture

We utilized **Transfer Learning** based on the **EfficientNetB0** architecture. The network consists of a frozen pre-trained backbone and a custom trainable classification head.

| Component | Layer Type | Specifications | Purpose |
| --- | --- | --- | --- |
| **Backbone** | **EfficientNetB0** | Pre-trained on ImageNet | Feature extraction (edges, textures, shapes). **Frozen** during training. |
| **Neck** | `GlobalAveragePooling2D` | Output:  vector | Condenses 3D feature maps () into a 1D feature vector. |
| **Head (Hidden)** | `Dense` (Fully Connected) | **256 Neurons**, ReLU Activation | Learns kidney-specific patterns from the extracted features. |
| **Regularization** | `Dropout` | Rate: **0.4** (40%) | Randomly zeros out neurons during training to prevent overfitting. |
| **Output** | `Dense` (Output Layer) | **4 Neurons**, Softmax Activation | Outputs probability distribution for: `[Cyst, Normal, Stone, Tumor]`. |

### Parameter Count

* **Total Parameters:** ~4,380,000
* **Trainable Parameters:** ~330,000 (Custom Head)
* **Non-Trainable Parameters:** ~4,050,000 (Frozen Backbone)

---

## Model 2: Stone Localization (YOLOv8n)

* **Role:** Localizes the exact position of the kidney stone if the classifier detects one.
* **Framework:** Ultralytics YOLOv8.
* **Variant:** Nano (n) – Optimized for speed and edge deployment.
* **Input Resolution:**  pixels.

### Network Architecture

YOLOv8 employs a **Single-Stage, Anchor-Free** detection architecture. It predicts bounding boxes and class probabilities in a single pass of the network.

* **Backbone: CSPDarknet53 (Modified)**
* Uses **C2f modules** (Cross-Stage Partial connections with bottleneck) to improve gradient flow and feature extraction efficiency.
* Extracts features at multiple scales (small, medium, large) to detect stones of varying sizes.


* **Neck: PANet (Path Aggregation Network)**
* Fuses features from different backbone levels.
* Ensures that semantic information (what it is) and spatial information (where it is) are combined effectively.


* **Head: Decoupled Anchor-Free Head**
* Unlike older YOLO versions, the head is **decoupled**. It has two separate branches:
1. **Objectness/Classification Branch:** "Is this an object and what class is it?"
2. **Regression Branch:** "What are the exact  coordinates?"


* **Anchor-Free:** Predicts the stone's center directly rather than adjusting pre-defined "anchor boxes," reducing complexity.



### Parameter Count

* **Total Layers:** 225
* **Total Parameters:** ~3.2 Million (Lightweight)
* **GFLOPs:** 8.7 (Low computational cost, suitable for standard laptops)

---

## Performance Metrics (Evaluation)

We utilized the following metrics to validate model performance:

1. **Classification Accuracy:** Percentage of correctly labeled images (Target: >95%).
2. **Confusion Matrix:** Visualizes misclassifications (e.g., mistaking a Cyst for a Tumor).
3. **mAP50 (Mean Average Precision):** Used for YOLO. Measures how accurately the predicted box overlaps with the ground truth box (Intersection over Union  0.50).

---

### **Phase 3: The Web Interface (Streamlit)**

Now that you have the trained models (`.h5` and `.pt`) and the documentation, the final step is the **Web App code** to put it all together.

**Would you like the `app.py` code now so you can finish the project?**