from PIL import Image
import numpy as np
import io
import fitz  # PyMuPDF

def extract_image_from_pdf(pdf_bytes: bytes) -> Image.Image:
    """
    Extracts the first page of a PDF as a high-resolution PIL Image.
    """
    try:
        # Open the PDF from bytes
        pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
        
        if len(pdf_document) == 0:
            raise ValueError("PDF document is empty")
            
        # Get the first page
        page = pdf_document[0]
        
        # Render the page to a pixmap (image) with higher resolution
        # Zoom factor 2.0 gives ~144 DPI (default is 72)
        zoom_matrix = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=zoom_matrix)
        
        # Convert pixmap to PIL Image
        # get_pixmap returns RGB or RGBA by default
        mode = "RGBA" if pix.alpha else "RGB"
        img = Image.frombytes(mode, [pix.width, pix.height], pix.samples)
        
        # Always convert to RGB for consistency
        if img.mode != "RGB":
            img = img.convert("RGB")
            
        pdf_document.close()
        return img
        
    except Exception as e:
        print(f"Error extracting image from PDF: {e}")
        raise ValueError(f"Failed to process PDF file: {str(e)}")

def preprocess_image(file_bytes: bytes, content_type: str = "image/jpeg"):
    """
    Process uploaded image or PDF bytes for classification and detection.
    Args:
        file_bytes: Raw bytes from the uploaded file
        content_type: MIME type of the file
    Returns:
        tuple: (processed_image_tensor, original_image_pil)
    """
    try:
        # 1. Handle PDF vs Image
        if "pdf" in content_type.lower():
            image = extract_image_from_pdf(file_bytes)
        else:
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
