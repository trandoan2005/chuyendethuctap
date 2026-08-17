# 🍽️ Lumina - Hệ Thống Quản Lý Đặt Bàn Nhà Hàng (Restaurant Reservation System)

![Lumina Banner](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop)

**Lumina** là một hệ thống quản lý đặt bàn nhà hàng chuyên nghiệp, được xây dựng với mục tiêu tự động hóa quy trình đặt chỗ, quản lý bàn, phân ca nhân sự và tối ưu hóa trải nghiệm khách hàng. Dự án được thiết kế chuẩn mô hình doanh nghiệp với các thuật toán thông minh như ghép bàn tự động và chống trùng lặp giờ (Collision Detection).

---

## ✨ Tính Năng Nổi Bật (Key Features)

### 🎯 Phân hệ Đặt Bàn (Booking Core)
- **Thuật toán tìm bàn trống thông minh:** Tự động lọc và hiển thị bàn trống dựa trên ngày và giờ chính xác, tự động tính toán thời lượng dùng bữa.
- **Thuật toán ghép bàn tự động (Table Merging):** Tự động gợi ý ghép 2-3 bàn liền kề nếu đoàn khách có số lượng lớn hơn sức chứa của các bàn đơn.
- **Quản lý vòng đời đặt bàn (Lifecycle):** Xử lý trạng thái từ `PENDING` -> `CONFIRMED` -> `SEATED` -> `COMPLETED`.

### 👨‍💼 Phân hệ Quản Trị & Nhân Sự
- **Quản lý nhân viên (Employee) & Phân ca (Shift):** Lưu trữ thông tin nhân sự và lên lịch ca làm việc chi tiết.
- **Quản lý khu vực (Zone):** Phân chia nhà hàng thành các khu vực khác nhau (Tầng trệt, Phòng VIP, Sân thượng) với các mức phụ thu (surcharge) riêng biệt.
- **Quản lý thực đơn (Category & Food):** Quản lý danh sách món ăn theo các danh mục động.

### 💰 Phân hệ Marketing & Chăm Sóc Khách Hàng
- **Quản lý Khuyến mãi (Promotion):** Hỗ trợ tạo các chiến dịch mã giảm giá (voucher) áp dụng thẳng vào đơn đặt bàn.
- **Hệ thống Thông báo (Notification):** Gửi thông báo tự động cập nhật trạng thái đơn hàng.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

Dự án được triển khai theo mô hình kiến trúc **Monorepo** chia làm 2 phần độc lập Frontend và Backend.

### 1. Frontend (Thư mục `my-app`)
- **Framework:** Next.js 15+ (App Router)
- **Thư viện UI:** React 19, Tailwind CSS v4, Framer Motion (Animation)
- **Chức năng:** Giao diện khách hàng (Customer Portal), thiết kế Responsive, tương tác mượt mà và tối giản.

### 2. Backend (Thư mục `backend`)
- **Framework:** Java Spring Boot 3
- **Database:** MySQL
- **ORM:** Spring Data JPA / Hibernate
- **Chức năng:** RESTful APIs, thuật toán xử lý logic nghiệp vụ.

---

## 🚀 Hướng Dẫn Cài Đặt (Installation Guide)

### Yêu cầu hệ thống:
- Node.js (phiên bản 18 trở lên)
- Java JDK (phiên bản 17 hoặc 21)
- MySQL Server

### Bước 1: Khởi động Backend (Spring Boot)
1. Mở MySQL và tạo một database tên là `lumina_db`.
2. Di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```
3. Cấu hình lại username và password MySQL trong file `application.properties` (nếu cần).
4. Khởi chạy dự án (Các bảng sẽ tự động được tạo nhờ JPA):
   ```bash
   mvn spring-boot:run
   ```

### Bước 2: Khởi động Frontend (Next.js)
1. Mở một terminal mới, di chuyển vào thư mục `my-app`:
   ```bash
   cd my-app
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Khởi chạy server phát triển:
   ```bash
   npm run dev
   ```
4. Truy cập giao diện ứng dụng tại: `http://localhost:3000`

---

## 👨‍💻 Tác Giả (Author)
- **Đồ án Chuyên Đề Thực Tập**
- Trình bày & Phát triển bởi: **[Tên của bạn]** 

> 💡 *Dự án được xây dựng với mục tiêu mang lại giải pháp công nghệ hiện đại, đáp ứng thực tiễn vận hành khắt khe của ngành F&B.*
