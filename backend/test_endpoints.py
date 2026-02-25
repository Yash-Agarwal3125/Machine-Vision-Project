import requests
import sys
from PIL import Image
import io
import time

BASE_URL = "http://localhost:8000"

def test_health():
    print("Testing /health...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        response.raise_for_status()
        data = response.json()
        print(f"Health response: {data}")
        
        if data["models"]["classifier"] != "loaded":
            print("FAILED: Classifier model not loaded")
            sys.exit(1)
            
        if data["models"]["detector"] != "loaded":
            print("FAILED: Detector model not loaded")
            sys.exit(1)
            
        print("PASS: /health check passed")
    except Exception as e:
        print(f"FAILED: /health check failed with error: {e}")
        sys.exit(1)

def test_predict():
    print("Testing /predict...")
    try:
        # Create a dummy image
        img = Image.new('RGB', (224, 224), color = 'red')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)
        
        files = {'file': ('test.jpg', img_byte_arr, 'image/jpeg')}
        
        response = requests.post(f"{BASE_URL}/predict", files=files)
        response.raise_for_status()
        data = response.json()
        print(f"Predict response keys: {list(data.keys())}")
        
        required_keys = ["diagnosis", "diagnosis_confidence", "confidence_level", 
                        "detection_confidence", "bounding_box", "annotated_image_base64", 
                        "timestamp", "run_localization"]
        
        for key in required_keys:
            if key not in data:
                print(f"FAILED: Missing key {key} in response")
                sys.exit(1)
                
        print("PASS: /predict check passed")
        
    except Exception as e:
        print(f"FAILED: /predict check failed with error: {e}")
        # Print response text if available
        if 'response' in locals():
            print(f"Response text: {response.text}")
        sys.exit(1)

if __name__ == "__main__":
    # Wait for server to start if needed (though caller should handle this)
    # We assume server is running
    test_health()
    test_predict()
