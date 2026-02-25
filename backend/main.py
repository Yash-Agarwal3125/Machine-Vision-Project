from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
import sys
import time
import traceback

# Ensure backend directory is on the path for imports
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from services.classifier import load_classifier_model, predict_class, classifier_model as _cm
from services.detector import load_detector_model, detect_objects, detector_model as _dm
from services.preprocess import preprocess_image
from services.visualizer import draw_annotations
from services.utils import get_confidence_level
import services.classifier as classifier_module
import services.detector as detector_module

# Model paths
BASE_DIR = os.path.dirname(BACKEND_DIR)
CLASSIFIER_PATH = os.path.join(BACKEND_DIR, "models", "kidney_stone_classifier.h5")
DETECTOR_PATH = os.path.join(BACKEND_DIR, "models", "best.pt")

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading models...")
    print(f"Classifier path: {CLASSIFIER_PATH} (exists: {os.path.exists(CLASSIFIER_PATH)})")
    print(f"Detector path: {DETECTOR_PATH} (exists: {os.path.exists(DETECTOR_PATH)})")
    load_classifier_model(CLASSIFIER_PATH)
    load_detector_model(DETECTOR_PATH)
    yield
    print("Shutting down...")

app = FastAPI(title="Kidney Stone Diagnosis API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "models": {
            "classifier": "loaded" if classifier_module.classifier_model else "not loaded",
            "detector": "loaded" if detector_module.detector_model else "not loaded"
        }
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        
        try:
            image_tensor, original_image = preprocess_image(contents)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
            
        classification_result = predict_class(image_tensor)
        label = classification_result["label"]
        confidence = classification_result["confidence"]
        
        detection_results = None
        annotated_image_base64 = None
        run_localization = False
        
        if label == "Stone":
            run_localization = True
            try:
                detection_results = detect_objects(original_image)
                if detection_results:
                    annotated_image_base64 = draw_annotations(original_image, detection_results)
            except Exception as e:
                print(f"Detection failed: {e}")
        
        interpretation = get_confidence_level(confidence)
        
        response = {
            "diagnosis": label,
            "diagnosis_confidence": float(confidence),
            "confidence_level": interpretation,
            "detection_confidence": None,
            "detailed_scores": classification_result.get("scores_dict", {}),
            "bounding_box": None,
            "annotated_image_base64": annotated_image_base64,
            "timestamp": time.time(),
            "run_localization": run_localization
        }
        
        if detection_results and len(detection_results) > 0:
            result = detection_results[0]
            if result.boxes and len(result.boxes) > 0:
                best_box = max(result.boxes, key=lambda x: x.conf[0])
                response["detection_confidence"] = float(best_box.conf[0])
                response["bounding_box"] = best_box.xyxy[0].tolist()
        
        return response
        
    except HTTPException as he:
        raise he
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
