# Kidney Stone Detection and Classification Project

## Project Overview

This project is a machine learning solution for kidney stone detection and classification using medical imaging. The project is organized into two distinct phases, each with different objectives and outputs.

---

## Project Structure

```
Machine Vision Project/
├── README.md
├── kidney_stone_classifier.h5          (Phase 1 Output)
└── kidney_stone_detector/              (Phase 2 Output)
    ├── args.yaml
    ├── results.csv
    └── weights/
        ├── best.pt
        └── last.pt
```

---

## Phase 1: Classification Model

### Objective
Build a classification model to categorize kidney imaging samples into different classes.

### Output
- **File**: `kidney_stone_classifier.h5`
- **Format**: HDF5 (Hierarchical Data Format)
- **Model Type**: Deep Learning Classifier (Keras/TensorFlow)
- **Purpose**: This is a trained neural network model that can classify medical images into predefined categories

### What is a Model File (.h5)?
A `.h5` file contains the complete trained model including:
- Network architecture (layer structure)
- Model weights (learned parameters from training)
- Optimization configuration

### What are Model Weights?
Model weights are numerical parameters that the neural network learns during training. They determine how the model processes input data to make predictions. These weights are calculated from the training dataset and represent the model's "knowledge" about the problem.

---

## Phase 2: Detection Model (YOLOv8)

### Objective
Build an object detection model to locate and identify kidney stones within medical images.

### Output
- **Directory**: `kidney_stone_detector/`
- **Framework**: YOLOv8 (You Only Look Once - Version 8)
- **Purpose**: Real-time detection model that can identify and localize kidney stones in ultrasound or CT images

### Model Weights
The trained model weights are stored in the `weights/` subdirectory:

| File | Description |
|------|-------------|
| `best.pt` | The best performing model weights during training (checkpoint with lowest validation loss) |
| `last.pt` | The final model weights after all training epochs completed |

**.pt files** are PyTorch checkpoint files containing:
- Model architecture
- Trained weights (learned parameters)
- Training history
- Optimizer state

### Training Configuration
The file `args.yaml` contains all hyperparameters and settings used for training:
- **Model Base**: YOLOv8 Nano (`yolov8n.pt`)
- **Training Epochs**: 15
- **Batch Size**: 16
- **Image Size**: 640x640 pixels
- **Device**: CUDA/GPU enabled
- **Data Split**: Training and validation sets
- **Optimization**: Automated optimizer selection
- **Augmentation**: Multiple data augmentation techniques applied during training

### Training Results
The file `results.csv` contains training metrics for each epoch:
- **Box Loss**: Loss related to bounding box predictions
- **Classification Loss**: Loss related to object classification
- **DFL Loss**: Distribution Focal Loss used in detection models
- **Precision & Recall**: Model accuracy metrics
- **mAP50 & mAP50-95**: Mean Average Precision at different IoU thresholds
- **Validation Metrics**: Performance on validation dataset

### Training Duration
- Total training time: ~263 seconds (approximately 4-5 minutes total)
- Average time per epoch: ~17-18 seconds

---

## Key Differences Between Phases

| Aspect | Phase 1 | Phase 2 |
|--------|---------|---------|
| **Task** | Classification | Detection |
| **Output** | Single class label | Bounding boxes + class labels |
| **Model Framework** | Keras/TensorFlow | YOLOv8/PyTorch |
| **File Format** | .h5 (HDF5) | .pt (PyTorch) |
| **Use Case** | Categorize entire image | Locate objects within image |

---

## What Happens Next

To use these models:
1. **Phase 1 Model**: Load the `.h5` file with Keras and use it to classify new medical images
2. **Phase 2 Model**: Load the best performing `.pt` weights from the `weights/best.pt` file and use YOLOv8 for detection tasks

Both models have been trained and are ready for evaluation and deployment.

---

## Notes for Partners

- Both models have completed their training phases
- The 15-epoch training ensured the models learned meaningful features from the dataset
- Model weights represent the "brain" of the models - they contain all learned information
- Two weight files are provided for Phase 2: use `best.pt` for optimal performance in production
