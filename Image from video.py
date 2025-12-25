import cv2
import os

# Replace this with the exact name of your video file
VIDEO_PATH = "dolo_video.mp4"  

# Name of the folder where you want to save the images
OUTPUT_FOLDER = "dataset_images/dolo" 

# If your video is 30fps, setting this to 30 saves 1 image per second.
# Setting to 15 saves 2 images per second (more data).
FRAME_SKIP = 15 


def extract_frames(video_path, output_folder, frame_skip):
    # 1. Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"Created folder: {output_folder}")

    # 2. Load the video
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        print(f"Error: Could not open video {video_path}")
        return

    count = 0
    saved_count = 0

    while True:
        ret, frame = cap.read()

        if not ret:
            break # Stop if video is over

        # 3. Save frame only if it matches the skip interval
        if count % frame_skip == 0:
            # Create a unique filename (e.g., dolo_0.jpg, dolo_1.jpg)
            filename = f"{output_folder}/img_{saved_count}.jpg"
            cv2.imwrite(filename, frame)
            print(f"Saved {filename}")
            saved_count += 1

        count += 1

    cap.release()
    print(f"Done! Extracted {saved_count} images to '{output_folder}'")

# Run the function
if __name__ == "__main__":
    extract_frames(VIDEO_PATH, OUTPUT_FOLDER, FRAME_SKIP)