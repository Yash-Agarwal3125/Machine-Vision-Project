import cv2
import numpy as np
import base64
from PIL import Image, ImageDraw, ImageFont

def draw_annotations(image: Image.Image, detections: list, label: str = "Stone") -> str:
    """
    Draws bounding boxes and labels on the image.
    Args:
        image: PIL Image
        detections: List of detection results (from YOLO)
        label: Label to draw
    Returns:
        str: Base64 encoded string of the annotated image
    """
    try:
        # Convert to numpy for OpenCV or use PIL Draw
        # Using PIL Draw for simplicity with fonts
        draw = ImageDraw.Draw(image)
        
        # Determine font (default if not available)
        try:
            # Try to load a font, otherwise use default
            font = ImageFont.truetype("arial.ttf", 20)
        except IOError:
            font = ImageFont.load_default()

        # Iterate through detections
        # YOLO results object handling
        # Usually results[0].boxes contains the boxes
        
        # If detections is a YOLO Result object list:
        for result in detections:
            boxes = result.boxes
            for box in boxes:
                # get coordinates
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                conf = box.conf[0].item()
                
                # Draw rectangle
                draw.rectangle([x1, y1, x2, y2], outline="red", width=3)
                
                # Draw label
                text = f"{label} {conf:.2f}"
                
                # Calculate text size using getbbox (left, top, right, bottom)
                text_bbox = draw.textbbox((x1, y1), text, font=font)
                text_width = text_bbox[2] - text_bbox[0]
                text_height = text_bbox[3] - text_bbox[1]
                
                # Draw background for text
                draw.rectangle([x1, y1 - text_height, x1 + text_width, y1], fill="red")
                draw.text((x1, y1 - text_height), text, fill="white", font=font)

        # Convert back to base64
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        return f"data:image/jpeg;base64,{img_str}"
        
    except Exception as e:
        print(f"Error generating visualization: {e}")
        return ""

import io
