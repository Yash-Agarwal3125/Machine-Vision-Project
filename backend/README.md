# Kidney Stone Diagnosis Backend

## Overview
FastAPI backend for Kidney Stone Diagnosis using Deep Learning (Classification) and YOLOv8 (Detection).

## Setup

1.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the server**:
    ```bash
    python main.py
    # OR
    uvicorn main:app --reload --port 8000
    ```

## API Endpoints

### `GET /health`
Checks if the backend is running and models are loaded.

**Response**:
```json
{
  "status": "ok",
  "models": {
    "classifier": "loaded",
    "detector": "loaded"
  }
}
```

### `POST /predict`
Upload an image for diagnosis.

**Request**: `multipart/form-data` with `file` field.

**Response Schema**:
```json
{
  "diagnosis": "Stone",          // String: "Cyst", "Normal", "Stone", "Tumor"
  "diagnosis_confidence": 0.95,  // Float: 0.0 - 1.0
  "confidence_level": "High confidence", // String: "High", "Medium", "Low"
  "detection_confidence": 0.88,  // Float or null (if no detection run/found)
  "bounding_box": [x1, y1, x2, y2], // List[float] or null
  "annotated_image_base64": "...", // String (Base64) or null
  "timestamp": 1234567890.123,   // Float
  "run_localization": true       // Boolean
}
```

## Logic
1.  **Classification**: Input image is classified into one of 4 classes.
2.  **Conditional Logic**: If class is "Stone", the detector is run.
3.  **Detection**: YOLOv8 detects stones and draws bounding boxes.
4.  **Response**: Aggregated results are returned.
