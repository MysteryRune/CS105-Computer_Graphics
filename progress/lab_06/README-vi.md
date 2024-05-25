# :globe_with_meridians: [Vie](../lab_06/)
[return](../lab_06/)

Mục tiêu của bài lab này:
1. Tìm những `Đặc trưng Khuôn mặt`: Mắt, mũi, miệng.
2. Dò tìm `Người đi bộ` trong Ảnh/Video.
3. Dò tìm `Xe hơi` trong Ảnh/Video.

Với sự hỗ trợ của thư viện `OpenCV`. Ngôn ngữ lập trình chính ở đây là `Python` và giao diện hỗ trợ của `OpenCV` và `Tkinter`.
Bài lab này có GUI để người dùng Demo có thể thao tác lựa chọn dễ dàng với các mục tiêu khác nhau của bài lab:
<div style="display: flex; flex-wrap: wrap;">
    <img src=".\figure\GUI_layout_01.png" alt="GUI_layout_01" width="50%">
    <img src=".\figure\GUI_layout_02.png" alt="GUI_layout_02" width="50%">
</div>
<div style="display: flex; flex-wrap: wrap;">
    <img src=".\figure\GUI_layout_03.png" alt="GUI_layout_03" width="50%">
    <img src=".\figure\GUI_layout_04.png" alt="GUI_layout_04" width="50%">
</div>


###### Các bước hướng dẫn cài đặt Demo của `lab_06` nếu sử dụng trực tiếp trên Máy cá nhân:
1. Đảm bảo đã cài đặt ngôn ngữ `Python`, và phiên bản `Python` được sử dụng là `3.8.9`. Nếu chưa cài đặt có thể cài đặt `Python 3.8.9` thông qua các link sau từ trang web chính chủ của `Python` ([64-bit](https://www.python.org/ftp/python/3.8.9/python-3.8.9-amd64.exe), [32-bit](https://www.python.org/ftp/python/3.8.9/python-3.8.9.exe)).
2. Tải về file tất cả các file.
3. Mở Terminal của Command Prompt và dẫn đến thư mục chứa file code `lab_06.py`.
4. Tạo một môi trường ảo với `venv` của `Python` bằng lệnh **`py -m venv .venv`**.
5. Kích hoạt môi trường ảo bằng lệnh **`.venv\Scripts\activate.bat`**.
6. Cài đặt các thư viện cần thiết với lệnh **`pip install -r requirements.txt`**.
7. Chạy chương trình bằng lệnh sau **`py lab_06.py`**.
8. Để thoát chương trình, nhấn phím `ESC`.
9. Để hủy kích hoạt môi trường ảo, sử dụng lệnh **`.venv\Scripts\deactivate.bat`**

## Tham khảo
- [node-opencv](https://github.com/peterbraden/node-opencv/tree/master)
- [Vehicle Detection with Haar Cascades](https://github.com/andrewssobral/vehicle_detection_haarcascades/tree/master)