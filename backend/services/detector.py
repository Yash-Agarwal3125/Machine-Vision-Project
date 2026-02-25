from ultralytics import YOLO
import os

# Global variable to hold the model
detector_model = None

def load_detector_model(model_path: str):
    global detector_model
    if not os.path.exists(model_path):
        print(f"Error: Detector model file not found at {model_path}")
        return False

    try:
        detector_model = YOLO(model_path)
        # Warmup or check
        print(f"Detector loaded successfully from {model_path}")
        return True
    except Exception as e:
        print(f"Error loading detector: {e}")
        detector_model = None
        return False

def detect_objects(image, conf_threshold=0.25):
    """
    Detects kidney stones in the image.
    Args:
        image: Original image (numpy array or PIL)
        conf_threshold: Confidence threshold for detection
    Returns:
        list: Detected objects with bounding boxes and scores
    """
    if detector_model is None:
        raise ValueError("Detector model not loaded")
    
    try:
        results = detector_model(image, conf=conf_threshold)
        # extraction logic pending in later phase
        return results
    except Exception as e:
        print(f"Error during detection inference: {e}")
        raise e
