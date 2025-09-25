Tôi có một đoạn clip "ClipDichVu.mp4" cần chèn vào website ở section dịch vụ.

Yêu cầu:
1. Video sẽ chạy nền toàn màn hình trong section (background).
2. Trên video có 6 button (2 dịch vụ chính và 4 dịch vụ phụ) đặt bằng position tuyệt đối theo % để khi scale màn hình không lệch.
   - 2 button chính (chấm đỏ) lớn hơn, nổi bật hơn.
   - 4 button phụ (chấm xanh) nhỏ hơn.
   - Các button có tiêu đề dịch vụ: 
     + Chính: "Cho thuê kho hàng hóa", "Cho thuê bãi lưu hàng".
     + Phụ: "Vận chuyển & Điều phối", "Bốc xếp & Đóng gói", "Quản lý tồn kho", "Hỗ trợ đa dạng".
3. Khi hover vào button:
   - Hiển thị thông tin chi tiết của dịch vụ ở 2 vùng trống hai bên video (ví dụ div #service-info-left và #service-info-right).
   - Tạo hiệu ứng khung viền sáng quanh tiêu đề button.
4. Các button phải responsive theo kích thước clip (dùng % top/left, width/height tương đối).
5. CSS sử dụng màu: đỏ (#CC0000) cho dịch vụ chính, xanh (#1A73E8) cho dịch vụ phụ.
6. Code cần chia tách: HTML (section + video + overlay buttons + info panels), CSS (style responsive, hover effects), JS (hover sự kiện cập nhật nội dung).
Vị trí các button:
2 chấm đỏ (dịch vụ chính):
Trái trên giữa → top: 30%; left: 25%
Phải trên giữa → top: 30%; left: 70%
4 chấm xanh (dịch vụ phụ):
Trái dưới → top: 65%; left: 20%
Giữa dưới → top: 70%; left: 50%
Phải dưới → top: 65%; left: 75%
Trên giữa → top: 15%; left: 50%