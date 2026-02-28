import tensorflow as tf
import os
import numpy as np

# Global variable to hold the model
classifier_model = None
CLASS_LABELS = ["Cyst", "Normal", "Stone", "Tumor"]

def load_classifier_model(model_path: str):
    global classifier_model
    if not os.path.exists(model_path):
        print(f"Error: Classifier model file not found at {model_path}")
        return False
        
    try:
        classifier_model = tf.keras.models.load_model(model_path)
        print(f"Classifier loaded successfully from {model_path}")
        return True
    except Exception as e:
        print(f"Error loading classifier: {e}")
        classifier_model = None
        return False

def predict_class(image_array):
    """
    Predicts the class of the kidney stone image.
    Args:
        image_array: Preprocessed image tensor
    Returns:
        dict: {
            "label": str,
            "confidence": float,
            "raw_scores": list
        }
    """
    if classifier_model is None:
        raise ValueError("Classifier model not loaded")
    
    try:
        predictions = classifier_model.predict(image_array)
        predicted_index = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_index])
        label = CLASS_LABELS[predicted_index]
        
        scores_dict = {CLASS_LABELS[i]: float(predictions[0][i]) for i in range(len(CLASS_LABELS))}
        
        return {
            "label": label,
            "confidence": confidence,
            "raw_scores": predictions[0].tolist(),
            "scores_dict": scores_dict
        }
    except Exception as e:
        print(f"Error during classification inference: {e}")
        raise e
