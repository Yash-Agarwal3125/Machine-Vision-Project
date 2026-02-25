try:
    import fastapi
    print("fastapi imported")
    import tensorflow
    print("tensorflow imported")
    import ultralytics
    print("ultralytics imported")
    import cv2
    print("cv2 imported")
    import PIL
    print("PIL imported")
    import numpy
    print("numpy imported")
    import uvicorn
    print("uvicorn imported")
    import multipart
    print("python-multipart imported")
    print("All imports successful")
except ImportError as e:
    print(f"Import failed: {e}")
    exit(1)
except Exception as e:
    print(f"An error occurred: {e}")
    exit(1)
