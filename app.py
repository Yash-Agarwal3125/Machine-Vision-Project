from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import tensorflow as tf
from ultralytics import YOLO
from PIL import Image, ImageDraw
import numpy as np
import io
import os
import base64

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models - Updated paths for Root Directory execution
CLASSIFIER_PATH = "kidney_stone_classifier.h5"
DETECTOR_PATH = "kidney_stone_detector/weights/best.pt"

classifier = None
detector = None

# Load Classifier (EfficientNet)
try:
    if os.path.exists(CLASSIFIER_PATH):
        classifier = tf.keras.models.load_model(CLASSIFIER_PATH)
        print("✅ Classifier loaded successfully.")
    else:
        print(f"❌ Classifier not found at {CLASSIFIER_PATH}")
except Exception as e:
    print(f"❌ Error loading classifier: {e}")

# Load Detector (YOLOv8)
try:
    if os.path.exists(DETECTOR_PATH):
        detector = YOLO(DETECTOR_PATH)
        print("✅ Detector loaded successfully.")
    else:
        print(f"❌ Detector not found at {DETECTOR_PATH}")
except Exception as e:
    print(f"❌ Error loading detector: {e}")

CLASSES = ["Cyst", "Normal", "Stone", "Tumor"]

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img_resized = img.resize((224, 224)) # For Classifier
    img_array = np.array(img_resized)
    img_array = np.expand_dims(img_array, axis=0) # Add batch dimension
    return img, img_array

@app.get("/")
def read_root():
    return {"status": "Kidney Stone AI Backend Running"}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    if not classifier and not detector:
        return {"error": "Models not loaded"}
    
    try:
        contents = await file.read()
        original_img, processed_img = preprocess_image(contents)
        
        # 1. Classification
        classification_result = "Unknown"
        confidence_scores = {}
        
        if classifier:
            predictions = classifier.predict(processed_img)
            score = tf.nn.softmax(predictions[0])
            class_index = np.argmax(score)
            max_confidence = 100 * np.max(score)
            
            classification_result = CLASSES[class_index]
            confidence_scores = {
                "Cyst": f"{float(score[0]):.4f}",
                "Normal": f"{float(score[1]):.4f}",
                "Stone": f"{float(score[2]):.4f}",
                "Tumor": f"{float(score[3]):.4f}"
            }
        
        # 2. Visual Detection (YOLO)
        annotated_image_base64 = None
        detections = []
        
        if detector:
            # Run inference on the original image (YOLO handles resizing)
            results = detector(original_img)
            
            # Plot results on the image
            for result in results:
                # Plot returns a numpy array in BGR (OpenCV format)
                im_array = result.plot() 
                im = Image.fromarray(im_array[..., ::-1]) # RGB
                
                # Convert to base64
                buffered = io.BytesIO()
                im.save(buffered, format="JPEG")
                annotated_image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
                
                # Extract box info
                for box in result.boxes:
                    detections.append({
                        "class": result.names[int(box.cls)],
                        "confidence": float(box.conf),
                        "bbox": box.xyxy.tolist()[0]
                    })
        
        return {
            "result": classification_result,
            "confidence": confidence_scores,
            "detections": detections,
            "annotated_image": f"data:image/jpeg;base64,{annotated_image_base64}" if annotated_image_base64 else None
        }

    except Exception as e:
        print(f"Error processing image: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
