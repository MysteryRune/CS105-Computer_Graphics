import cv2
import cv2.data
from pymediainfo import MediaInfo
import numpy as np

import os
import subprocess

import tkinter as tk
from tkinter import *
from tkinter import filedialog, messagebox


frames = {}
def show_layout(root, layout, title):
    for frame in frames.values():
        frame.grid_forget()
    frames[layout].grid(row=0, column=0, padx=10, pady=10)
    root.title(title)

def return_value(value):
    print("Returned Value:", value)





def open_file_dialog_image():
    # Open a file dialog and get the selected file path
    file_path = filedialog.askopenfilename( title="Select a file",
                                            filetypes=(("Image files", "*.jpg;*.png"),))
    
    return file_path


def open_file_dialog_video():
    # Open a file dialog and get the selected file path
    file_path = filedialog.askopenfilename( title="Select a file",
                                            filetypes=(("MPEG-4", "*.mp4;*.m4a;*.m4p;*.m4b;*.m4r;*.m4v"),
                                                        ("MPEG-2", "*.mpg;*.mpeg;*.m2v")))
    
    return file_path


def addNote_0(img):
    # Create canvas
    note_height = 80
    note_canvas = np.zeros((note_height, img.shape[1], 3), dtype=np.uint8)

    # Add text to the note canvas
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.5
    thickness = 1

    # Text for Red rectangle
    cv2.putText(note_canvas, 'Red rectangle: Eye', (10, 20), font, font_scale, (0, 0, 255), thickness, cv2.LINE_AA)
    # Text for Green rectangle
    cv2.putText(note_canvas, 'Green rectangle: Nose', (10, 40), font, font_scale, (0, 255, 0), thickness, cv2.LINE_AA)
    # Text for Blue rectangle
    cv2.putText(note_canvas, 'Blue rectangle: Mouth', (10, 60), font, font_scale, (255, 0, 0), thickness, cv2.LINE_AA)

    # Step 5: Combine the note canvas and the main image
    combined_image = np.vstack((note_canvas, img))

    return combined_image


def addNote_1(img, text='None', x=0, y=0, color=(0, 0, 0)):

    # Text config
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.4
    thickness = 1

    # Set Text
    cv2.putText(img, text, (x, y), font, font_scale, color, thickness, cv2.LINE_AA)

    return img


def detectFaceFeature_image(img, 
                            scaleFactor_eye=1.1,
                            minNeighbors_eye=10, 
                            scaleFactor_nose=1.1,
                            minNeighbors_nose=15, 
                            scaleFactor_mouth=1.41,
                            minNeighbors_mouth=21):
    """
        img: An object img (Matlike - np.array)
    """

    # Load Cascade
    path_face_feature_eye = cv2.data.haarcascades + 'haarcascade_eye.xml'
    path_face_feature_nose = './haarcascade/haarcascade_mcs_nose.xml'
    path_face_feature_mouth = './haarcascade/haarcascade_mcs_mouth.xml'

    cascade_detector_eye = cv2.CascadeClassifier(path_face_feature_eye)
    cascade_detector_nose = cv2.CascadeClassifier(path_face_feature_nose)
    cascade_detector_mouth = cv2.CascadeClassifier(path_face_feature_mouth)


    # Convert to Grayscale
    if img.shape[2] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect the face feature
    eyes = cascade_detector_eye.detectMultiScale(gray_img, scaleFactor_eye, minNeighbors_eye)
    noses = cascade_detector_nose.detectMultiScale(gray_img, scaleFactor_nose, minNeighbors_nose)
    mouths = cascade_detector_mouth.detectMultiScale(gray_img, scaleFactor_mouth, minNeighbors_mouth)

    # Draw the Rectangle around each Face detected
    img_detected = img.copy()
    for (x, y, w, h) in eyes:
        cv2.rectangle(img_detected, (x, y), (x+w, y+h), (0, 0, 255), 2)
        img_detected = addNote_1(img_detected, 'Eye', x, y-5, (0, 0, 255))
    for (x, y, w, h) in noses:
        cv2.rectangle(img_detected, (x, y), (x+w, y+h), (0, 255, 0), 2)
        img_detected = addNote_1(img_detected, 'Nose', x, y-5, (0, 255, 0))
    for (x, y, w, h) in mouths:
        cv2.rectangle(img_detected, (x, y), (x+w, y+h), (255, 0, 0), 2)
        img_detected = addNote_1(img_detected, 'Mouth', x, y-5, (255, 0, 0))

    # Add note to Image
    # img_detected = addNote_0(img_detected)

    return img_detected


def detectHuman_image(img, 
                      scaleFactor_fullBody=1.1,
                      minNeighbors_fullBody=3, 
                      scaleFactor_upperBody=1.1,
                      minNeighbors_upperBody=3, 
                      scaleFactor_lowerBody=1.1,
                      minNeighbors_lowerBody=3):
    """
        img: An object img (Matlike - np.array)
    """

    # Load Cascade
    path_body_feature_full = cv2.data.haarcascades + 'haarcascade_fullbody.xml'
    path_body_feature_upper = cv2.data.haarcascades + 'haarcascade_upperbody.xml'
    path_body_feature_lower = cv2.data.haarcascades + 'haarcascade_lowerbody.xml'

    cascade_detector_fullbody = cv2.CascadeClassifier(path_body_feature_full)
    cascade_detector_upperbody = cv2.CascadeClassifier(path_body_feature_upper)
    cascade_detector_lowerbody = cv2.CascadeClassifier(path_body_feature_lower)

    # Convert to Grayscale
    if img.shape[2] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect Human
    fullBodies = cascade_detector_fullbody.detectMultiScale(gray_img, scaleFactor_fullBody, minNeighbors_fullBody)
    # upperBodies = cascade_detector_upperbody.detectMultiScale(gray_img, scaleFactor_upperBody, minNeighbors_upperBody)
    # lowerBodies = cascade_detector_lowerbody.detectMultiScale(gray_img, scaleFactor_lowerBody, minNeighbors_lowerBody)

    # Draw the Rectangle around each Face detected
    img_detected = img.copy()
    for (x, y, w, h) in fullBodies:
        cv2.rectangle(img_detected, (x, y), (x+w, y+h), (0, 0, 255), 2)
    # for (x, y, w, h) in upperBodies:
    #     cv2.rectangle(img_detected, (x, y), (x+w, y+h), (0, 0, 255), 2)
    # for (x, y, w, h) in lowerBodies:
    #     cv2.rectangle(img_detected, (x, y), (x+w, y+h), (0, 0, 255), 2)

    return img_detected


def detectCar_image(img, 
                    scaleFactor_car=1.1,
                    minNeighbors_car=3):
    """
        img: An object img (Matlike - np.array)
    """

    # Load Cascade
    path_car_feature = './cascade/cars.xml'

    cascade_detector_car = cv2.CascadeClassifier(path_car_feature)

    # Convert to Grayscale
    if img.shape[2] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect Human
    cars = cascade_detector_car.detectMultiScale(gray_img, scaleFactor_car, minNeighbors_car)

    # Draw the Rectangle around each Face detected
    img_detected = img.copy()
    for (x, y, w, h) in cars:
        cv2.rectangle(img_detected, (x, y), (x+w, y+h), (0, 0, 255), 2)

    return img_detected


def faceFeatureDetection(option=0):

    if option==0:

        # Select file
        file_path = open_file_dialog_image()

        # Read image
        img = cv2.imread(file_path, cv2.IMREAD_COLOR)
        
        # Detection
        img_detected = detectFaceFeature_image(img)

        # Display
        cv2.imshow('Face feature Detection', img_detected)
        cv2.waitKey(0)  # Wait for a key press to close the window
        cv2.destroyAllWindows()

    elif option==1:

        # Capture Video from Webcam
        camera = cv2.VideoCapture(0)
        camera.set(cv2.CAP_PROP_FPS, 60.0)
        camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

        while True:
            # Read image from frame
            _, img = camera.read()

            # Detection
            img_detected = detectFaceFeature_image(img)

            # Display
            cv2.imshow('Face feature Detection', img_detected)

            # Stop if `ESC` key is pressed
            k = cv2.waitKey(30) & 0xff
            if k == 27:
                cv2.destroyAllWindows()
                break

        # Release Video Capture
        camera.release()
    
    else:

        # Select file
        file_path = open_file_dialog_video()

        # Capture Video from Webcam
        cap = cv2.VideoCapture(file_path)

        # Check error open Video file
        if not cap.isOpened():
            messagebox.showinfo("Error", "Could not open video")
            return
        
        while cap.isOpened():
            # Read Image from Frame
            ret, frame = cap.read()

            # Check End of Video
            if not ret:
                break

            # Detection
            img_detected = detectFaceFeature_image(frame)

            # Display
            cv2.imshow('Face feature Detection', img_detected)

            # Stop if `ESC` key is pressed
            k = cv2.waitKey(30) & 0xff
            if k == 27:
                cv2.destroyAllWindows()
                break

        # Release Video Capture
        cap.release()


def humanDetection(option=0):
    """
        Option case:
            0: Detect on Image
            1: Detect on Video
    """

    if option==0:

        # Select file
        file_path = open_file_dialog_image()

        # Read image
        img = cv2.imread(file_path, cv2.IMREAD_COLOR)
        
        # Detection
        img_detected = detectHuman_image(img, scaleFactor_fullBody=1.01, minNeighbors_fullBody=3)

        # Display
        cv2.imshow('People Detection', img_detected)
        cv2.waitKey(0)  # Wait for a key press to close the window
        cv2.destroyAllWindows()
    else:

        # Select file
        file_path = open_file_dialog_video()

        # Capture Video from Webcam
        cap = cv2.VideoCapture(file_path)

        # Check error open Video file
        if not cap.isOpened():
            messagebox.showinfo("Error", "Could not open video")
            return
        
        while cap.isOpened():
            # Read Image from Frame
            ret, frame = cap.read()

            # Check End of Video
            if not ret:
                break

            # Detection
            img_detected = detectHuman_image(frame)

            # Display
            cv2.imshow('People Detection', img_detected)

            # Stop if `ESC` key is pressed
            k = cv2.waitKey(30) & 0xff
            if k == 27:
                cv2.destroyAllWindows()
                break

        # Release Video Capture
        cap.release()


def carDetection(option=0):
    """
        Option case:
            0: Detect on Image
            1: Detect on Video
    """

    if option==0:

        # Select file
        file_path = open_file_dialog_image()

        # Read image
        img = cv2.imread(file_path, cv2.IMREAD_COLOR)
        
        # Detection
        img_detected = detectCar_image(img, scaleFactor_car=1.05, minNeighbors_car=1)

        # Display
        cv2.imshow('Car Detection', img_detected)
        cv2.waitKey(0)  # Wait for a key press to close the window
        cv2.destroyAllWindows()
    else:

        # Select file
        file_path = open_file_dialog_video()

        # Capture Video from Webcam
        cap = cv2.VideoCapture(file_path)

        # Check error open Video file
        if not cap.isOpened():
            messagebox.showinfo("Error", "Could not open video")
            return
        
        while cap.isOpened():
            # Read Image from Frame
            ret, frame = cap.read()

            # Check End of Video
            if not ret:
                break

            # Detection
            img_detected = detectCar_image(frame, scaleFactor_car=1.1, minNeighbors_car=2)

            # Display
            cv2.imshow('Car Detection', img_detected)

            # Stop if `ESC` key is pressed
            k = cv2.waitKey(30) & 0xff
            if k == 27:
                cv2.destroyAllWindows()
                break

        # Release Video Capture
        cap.release()







# Create the main window
root = tk.Tk()
root.title("Detection GUI")
GUI_WIDTH = 300
GUI_HEIGHT = 220
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()
x = (screen_width - GUI_WIDTH) // 2
y = (screen_height - GUI_HEIGHT) // 2
root.geometry(str(GUI_WIDTH) + "x" + str(GUI_HEIGHT) + f'+{x}+{y}')

# Button configuration for consistent size
button_config_default = {
    "width": 20,
    "height": 2,
}
button_config_01 = {
    "width": 8,
    "height": 2,
}
center_const = 60

# Layout 1
layout1 = tk.Frame(root)
frames['layout1'] = layout1
layout1.grid_rowconfigure(0, weight=1)
layout1.grid_rowconfigure(1, weight=1)
layout1.grid_rowconfigure(2, weight=1)
layout1.grid_columnconfigure(0, weight=1)
tk.Button(layout1, text="Face features detection", command=lambda: show_layout(root, 'layout2', "Face features detection"), **button_config_default).grid(row=0, column=0, padx=5+center_const, pady=5)
tk.Button(layout1, text="Human detection", command=lambda: show_layout(root, 'layout3', "Human detection"), **button_config_default).grid(row=1, column=0, padx=5+center_const, pady=5)
tk.Button(layout1, text="Car detection", command=lambda: show_layout(root, 'layout4', "Car detection"), **button_config_default).grid(row=2, column=0, padx=5+center_const, pady=5)

# Layout 2
layout2 = tk.Frame(root)
frames['layout2'] = layout2
tk.Button(layout2, text="Use Webcam", command=lambda: faceFeatureDetection(1), **button_config_default).grid(row=0, column=0, padx=5+center_const, pady=5)
tk.Button(layout2, text="From Image", command=lambda: faceFeatureDetection(0), **button_config_default).grid(row=1, column=0, padx=5+center_const, pady=5)
tk.Button(layout2, text="From Video", command=lambda: faceFeatureDetection(2), **button_config_default).grid(row=2, column=0, padx=5+center_const, pady=5)
tk.Button(layout2, text="Back", command=lambda: show_layout(root, 'layout1', "Detection GUI"), **button_config_01).grid(row=3, column=0, padx=5+center_const, pady=5)

# Layout 3
layout3 = tk.Frame(root)
frames['layout3'] = layout3
tk.Button(layout3, text="From Image", command=lambda: humanDetection(0), **button_config_default).grid(row=0, column=0, padx=5+center_const, pady=5)
tk.Button(layout3, text="From Video", command=lambda: humanDetection(1), **button_config_default).grid(row=1, column=0, padx=5+center_const, pady=5)
tk.Button(layout3, text="Back", command=lambda: show_layout(root, 'layout1', "Detection GUI"), **button_config_01).grid(row=2, column=0, padx=5+center_const, pady=5)

# Layout 4
layout4 = tk.Frame(root)
frames['layout4'] = layout4
tk.Button(layout4, text="From Image", command=lambda: carDetection(0), **button_config_default).grid(row=0, column=0, padx=5+center_const, pady=5)
tk.Button(layout4, text="From Video", command=lambda: carDetection(1), **button_config_default).grid(row=1, column=0, padx=5+center_const, pady=5)
tk.Button(layout4, text="Back", command=lambda: show_layout(root, 'layout1', "Detection GUI"), **button_config_01).grid(row=2, column=0, padx=5+center_const, pady=5)

# Show Layout 1 initially
show_layout(root, 'layout1', "Detection GUI")

# Run the application
root.mainloop()