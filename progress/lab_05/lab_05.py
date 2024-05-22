import cv2
import cv2.data

# Load Cascade
path_cascade_feature = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(path_cascade_feature)

# Capture Video from Webcam
camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FPS, 60.0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

while True:
    # Read image from frame
    _, img = camera.read()

    # Convert to Grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect the face
    faces = face_cascade.detectMultiScale(gray_img, 1.05, 7)

    # Draw the Rectangle around each Face detected
    img_detected = img.copy()
    for (x, y, w, h) in faces:
        cv2.rectangle(img_detected, (x, y), (x+w, y+h), (0, 0, 255), 4)

    # Display
    cv2.imshow('Detect Face', img_detected)

    # Stop if `ESC` key is pressed
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

# Release Video Capture
camera.release()
