from PIL import Image
import numpy as np
import io

def preprocess_image(file_bytes: bytes):
    """
    Process uploaded image bytes for classification and detection.
    Args:
        file_bytes: Raw bytes from the uploaded file
    Returns:
        tuple: (processed_image_tensor, original_image_pil)
    """
    try:
        # 1. Convert to PIL image
        image = Image.open(io.BytesIO(file_bytes))
        
        # 2. Convert to RGB (handle RGBA, Grayscale)
        if image.mode != "RGB":
            image = image.convert("RGB")
            
        # 3. Resize for Classifier (Standard size 224x224)
        target_size = (224, 224)
        img_resized = image.resize(target_size)
        
        # 4. Convert to NumPy array
        img_array = np.array(img_resized)
        
        # 5. Normalize (rescaling to 0-1 range is a safe bet usually, 
        # unless model has Rescaling layer. I'll stick to 0-255 float 
        # as many Keras models handle internal scaling, or simple /255)
        # Given "Normalize" instruction:
        img_array = img_array.astype(np.float32) / 255.0
        
        # 6. Expand batch dimension
        img_tensor = np.expand_dims(img_array, axis=0)
        
        # Return tuple: (tensor for model, original PIL for visualization)
        return img_tensor, image
        
    except Exception as e:
        print(f"Error processing image: {e}")
        raise ValueError("Invalid image file")
