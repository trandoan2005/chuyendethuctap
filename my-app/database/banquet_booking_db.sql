-- ============================================================
-- HỆ THỐNG ĐẶT BÀN VÀ QUẢN LÝ DỊCH VỤ TIỆC LINH HOẠT
-- Database: MySQL
-- Author: Trần Văn Đoàn
-- ============================================================

DROP DATABASE IF EXISTS banquet_booking_db;
CREATE DATABASE banquet_booking_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE banquet_booking_db;

-- ============================================================
-- BẢNG 1: USERS (Quản lý Người dùng)
-- ============================================================
CREATE TABLE users (
    user_id       INT             AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(100)    NOT NULL,
    email         VARCHAR(100)    NOT NULL UNIQUE,
    phone         VARCHAR(15)     NOT NULL,
    password      VARCHAR(255)    NOT NULL COMMENT 'Mã hóa BCrypt',
    role          ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    created_at    DATETIME        DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- BẢNG 2: TABLES (Quản lý Bàn & Không gian)
-- ============================================================
CREATE TABLE tables (
    table_id      INT             AUTO_INCREMENT PRIMARY KEY,
    table_number  VARCHAR(20)     NOT NULL COMMENT 'VD: Bàn 01, VIP 02',
    capacity      INT             NOT NULL COMMENT 'Sức chứa tối đa',
    area          VARCHAR(50)     NOT NULL COMMENT 'VD: Sân thượng, Trong nhà, VIP',
    status        ENUM('AVAILABLE', 'RESERVED', 'OCCUPIED') DEFAULT 'AVAILABLE',
    description   TEXT            NULL COMMENT 'Mô tả chi tiết vị trí bàn',
    image_url     VARCHAR(255)    NULL COMMENT 'Ảnh minh họa khu vực bàn (Cloudinary)'
) ENGINE=InnoDB;

-- ============================================================
-- BẢNG 3: PARTY_PACKAGES (Quản lý Gói dịch vụ tiệc)
-- ============================================================
CREATE TABLE party_packages (
    package_id    INT             AUTO_INCREMENT PRIMARY KEY,
    package_name  VARCHAR(100)    NOT NULL COMMENT 'VD: Gói Sinh Nhật Basic',
    description   TEXT            NULL COMMENT 'Mô tả dịch vụ đi kèm',
    price         DECIMAL(12,2)   NOT NULL,
    image_url     VARCHAR(255)    NULL COMMENT 'Ảnh minh họa gói tiệc (Cloudinary)',
    is_active     TINYINT(1)      DEFAULT 1 COMMENT '1=Đang kinh doanh, 0=Ngừng'
) ENGINE=InnoDB;

-- ============================================================
-- BẢNG 4: FOODS (Quản lý Thực đơn / Món ăn)
-- ============================================================
CREATE TABLE foods (
    food_id       INT             AUTO_INCREMENT PRIMARY KEY,
    food_name     VARCHAR(100)    NOT NULL,
    price         DECIMAL(12,2)   NOT NULL,
    category      VARCHAR(50)     NOT NULL COMMENT 'Món chính, Đồ uống, Tráng miệng, Combo',
    image_url     VARCHAR(255)    NULL COMMENT 'Ảnh món ăn (Cloudinary)',
    description   TEXT            NULL,
    is_active     TINYINT(1)      DEFAULT 1 COMMENT '1=Đang kinh doanh, 0=Ngừng'
) ENGINE=InnoDB;

-- ============================================================
-- BẢNG 5: BOOKINGS (Quản lý Đơn đặt bàn & Đặt tiệc)
-- ============================================================
CREATE TABLE bookings (
    booking_id    INT             AUTO_INCREMENT PRIMARY KEY,
    user_id       INT             NOT NULL,
    table_id      INT             NULL COMMENT 'Bàn được xếp (Admin gán sau khi duyệt)',
    package_id    INT             NULL COMMENT 'Gói tiệc đi kèm (nếu có)',
    booking_type  ENUM('REGULAR', 'PARTY') NOT NULL COMMENT 'Đặt bàn thường / Đặt tiệc',
    event_type    VARCHAR(50)     NULL COMMENT 'Loại sự kiện: Sinh nhật, Đám cưới, Kỷ niệm...',
    decor_theme   VARCHAR(50)     NULL COMMENT 'Theme trang trí: Classic, Modern, Rustic...',
    booking_date  DATE            NOT NULL COMMENT 'Ngày khách đến',
    booking_time  TIME            NOT NULL COMMENT 'Giờ khách đến',
    guest_count   INT             NOT NULL COMMENT 'Số lượng khách',
    note          TEXT            NULL COMMENT 'Yêu cầu/Ghi chú riêng',
    status        ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'PENDING',
    created_at    DATETIME        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_booking_user    FOREIGN KEY (user_id)    REFERENCES users(user_id)    ON DELETE CASCADE,
    CONSTRAINT fk_booking_table   FOREIGN KEY (table_id)   REFERENCES tables(table_id)  ON DELETE SET NULL,
    CONSTRAINT fk_booking_package FOREIGN KEY (package_id) REFERENCES party_packages(package_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- BẢNG 6: BOOKING_ITEMS (Chi tiết món ăn đặt trước cho tiệc)
-- ============================================================
CREATE TABLE booking_items (
    booking_item_id INT          AUTO_INCREMENT PRIMARY KEY,
    booking_id      INT          NOT NULL,
    food_id         INT          NOT NULL,
    quantity        INT          NOT NULL DEFAULT 1,

    CONSTRAINT fk_item_booking  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    CONSTRAINT fk_item_food     FOREIGN KEY (food_id)    REFERENCES foods(food_id)       ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================
-- DỮ LIỆU MẪU (Sample Data)
-- ============================================================

-- === 1. USERS ===
-- Mật khẩu mẫu: '123456' đã mã hóa BCrypt
INSERT INTO users (full_name, email, phone, password, role) VALUES
('Admin Hệ Thống',   'admin@lumina.vn',    '0901000001', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN'),
('Nguyễn Văn An',    'an.nguyen@gmail.com', '0912345678', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'CUSTOMER'),
('Trần Thị Bình',    'binh.tran@gmail.com', '0923456789', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'CUSTOMER'),
('Lê Hoàng Cường',   'cuong.le@gmail.com',  '0934567890', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'CUSTOMER'),
('Phạm Minh Duy',    'duy.pham@gmail.com',  '0945678901', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'CUSTOMER');

-- === 2. TABLES ===
INSERT INTO tables (table_number, capacity, area, status, description) VALUES
('Bàn 01',  4,  'Trong nhà',   'AVAILABLE',  'Bàn nhỏ gần cửa sổ, view sân vườn'),
('Bàn 02',  4,  'Trong nhà',   'AVAILABLE',  'Bàn nhỏ khu vực trung tâm'),
('Bàn 03',  6,  'Trong nhà',   'AVAILABLE',  'Bàn trung gần quầy bar'),
('Bàn 04',  6,  'Trong nhà',   'RESERVED',   'Bàn trung khu vực yên tĩnh'),
('Bàn 05',  8,  'Trong nhà',   'AVAILABLE',  'Bàn lớn phù hợp nhóm bạn'),
('Bàn 06',  4,  'Sân thượng',  'AVAILABLE',  'Bàn ngoài trời, view thành phố'),
('Bàn 07',  6,  'Sân thượng',  'AVAILABLE',  'Bàn ngoài trời, gần khu BBQ'),
('Bàn 08',  8,  'Sân thượng',  'OCCUPIED',   'Bàn lớn ngoài trời, có mái che'),
('VIP 01', 10,  'Phòng VIP',   'AVAILABLE',  'Phòng riêng tầng 2, máy lạnh, karaoke'),
('VIP 02', 15,  'Phòng VIP',   'AVAILABLE',  'Phòng lớn tầng 2, máy chiếu, âm thanh'),
('VIP 03', 20,  'Phòng VIP',   'RESERVED',   'Phòng đại tiệc, sức chứa lớn nhất');

-- === 3. PARTY_PACKAGES ===
INSERT INTO party_packages (package_name, description, price) VALUES
('Gói Sinh Nhật Basic',    'Bao gồm: Bánh kem 1 tầng, bóng bay trang trí, nến số, banner chúc mừng.', 500000.00),
('Gói Sinh Nhật Premium',  'Bao gồm: Bánh kem 2 tầng, bóng bay Helium, phông nền chụp ảnh, đạo cụ cầm tay, banner LED.', 1200000.00),
('Gói Sinh Nhật VIP',      'Bao gồm: Bánh kem 3 tầng, trang trí hoa tươi cao cấp, MC dẫn chương trình, pháo sáng, nhạc sống.', 3000000.00),
('Gói Kỷ Niệm Lãng Mạn',  'Bao gồm: Hoa hồng trang trí bàn, nến thơm, phông nền lãng mạn, champagne.', 1500000.00),
('Gói Tiệc Công Ty',       'Bao gồm: Phông nền logo công ty, hệ thống âm thanh, máy chiếu, micro không dây.', 2500000.00);

-- === 4. FOODS ===
INSERT INTO foods (food_name, price, category, description) VALUES
-- Món chính
('Gà nướng mật ong',             189000.00, 'Món chính',   'Gà ta nướng than hoa, tẩm mật ong rừng'),
('Bò lúc lắc khoai tây',         229000.00, 'Món chính',   'Thịt bò Úc xào cùng khoai tây chiên'),
('Cá lóc nướng trui',            199000.00, 'Món chính',   'Cá lóc đồng nướng rơm, cuốn bánh tráng'),
('Lẩu Thái hải sản',             349000.00, 'Món chính',   'Lẩu chua cay kiểu Thái, tôm sú, mực, nghêu'),
('Sườn non nướng BBQ',           259000.00, 'Món chính',   'Sườn heo non ướp sốt BBQ nướng than'),
-- Đồ uống
('Bia Tiger (thùng 24 lon)',     320000.00, 'Đồ uống',    'Thùng bia Tiger 24 lon x 330ml'),
('Nước ngọt các loại (thùng)',   180000.00, 'Đồ uống',    'Coca, Pepsi, 7Up - thùng 24 lon'),
('Rượu vang Chile',              450000.00, 'Đồ uống',    'Rượu vang đỏ Chile nhập khẩu'),
('Sinh tố trái cây',              55000.00, 'Đồ uống',    'Sinh tố bơ, dâu, xoài tươi'),
-- Tráng miệng
('Chè khúc bạch',                 45000.00, 'Tráng miệng', 'Chè khúc bạch trái cây mix'),
('Bánh Flan caramel',             35000.00, 'Tráng miệng', 'Bánh flan mềm mịn, sốt caramel'),
-- Combo
('Combo Tiệc 4 người',          799000.00, 'Combo',       'Gà nướng + Lẩu Thái + Khoai tây chiên + 4 Nước ngọt'),
('Combo Tiệc 8 người',         1499000.00, 'Combo',       'Bò lúc lắc + Sườn BBQ + Lẩu Thái + Gà nướng + Bia 1 thùng');

-- === 5. BOOKINGS ===
INSERT INTO bookings (user_id, table_id, package_id, booking_type, event_type, decor_theme, booking_date, booking_time, guest_count, note, status) VALUES
-- Đặt bàn thường
(2, 1, NULL, 'REGULAR', NULL,          NULL,      '2026-08-05', '18:30', 3, 'Xin bàn gần cửa sổ', 'CONFIRMED'),
(3, 4, NULL, 'REGULAR', NULL,          NULL,      '2026-08-06', '19:00', 5, NULL,                  'PENDING'),
(4, 5, NULL, 'REGULAR', NULL,          NULL,      '2026-08-07', '20:00', 7, 'Có trẻ em, cần ghế cao', 'CONFIRMED'),
-- Đặt tiệc sinh nhật
(2, 9, 2,    'PARTY',   'Sinh nhật',   'Modern',  '2026-08-10', '18:00', 10, 'Sinh nhật bé Minh, 5 tuổi. Cần MC và trò chơi', 'PENDING'),
-- Đặt tiệc công ty
(5, 11, 5,   'PARTY',   'Tiệc công ty','Classic', '2026-08-15', '17:30', 18, 'Tiệc team building Q3, cần máy chiếu và micro', 'CONFIRMED'),
-- Đặt tiệc kỷ niệm
(3, 10, 4,   'PARTY',   'Kỷ niệm',    'Romantic','2026-08-20', '19:00', 12, 'Kỷ niệm 10 năm ngày cưới', 'PENDING');

-- === 6. BOOKING_ITEMS ===
-- Đơn tiệc sinh nhật bé Minh (booking_id = 4)
INSERT INTO booking_items (booking_id, food_id, quantity) VALUES
(4, 1,  1),  -- Gà nướng mật ong x1
(4, 4,  1),  -- Lẩu Thái hải sản x1
(4, 7,  2),  -- Nước ngọt (thùng) x2
(4, 10, 10), -- Chè khúc bạch x10

-- Đơn tiệc công ty (booking_id = 5)
(5, 12, 1),  -- Combo Tiệc 4 người x1
(5, 13, 1),  -- Combo Tiệc 8 người x1
(5, 6,  2),  -- Bia Tiger (thùng) x2
(5, 5,  2),  -- Sườn non nướng BBQ x2

-- Đơn kỷ niệm (booking_id = 6)
(6, 2,  2),  -- Bò lúc lắc x2
(6, 8,  2),  -- Rượu vang Chile x2
(6, 11, 12); -- Bánh Flan caramel x12


-- ============================================================
-- VIEW: Xem nhanh đơn đặt bàn kèm thông tin chi tiết
-- ============================================================
CREATE VIEW v_booking_details AS
SELECT
    b.booking_id,
    u.full_name   AS customer_name,
    u.email       AS customer_email,
    u.phone       AS customer_phone,
    t.table_number,
    t.area,
    b.booking_type,
    b.event_type,
    b.decor_theme,
    pp.package_name,
    pp.price      AS package_price,
    b.booking_date,
    b.booking_time,
    b.guest_count,
    b.note,
    b.status,
    b.created_at
FROM bookings b
JOIN users u            ON b.user_id    = u.user_id
LEFT JOIN tables t      ON b.table_id   = t.table_id
LEFT JOIN party_packages pp ON b.package_id = pp.package_id;


-- ============================================================
-- VIEW: Thống kê doanh thu theo tháng
-- ============================================================
CREATE VIEW v_monthly_stats AS
SELECT
    DATE_FORMAT(b.booking_date, '%Y-%m') AS month,
    COUNT(*)                              AS total_bookings,
    SUM(CASE WHEN b.booking_type = 'REGULAR' THEN 1 ELSE 0 END) AS regular_count,
    SUM(CASE WHEN b.booking_type = 'PARTY'   THEN 1 ELSE 0 END) AS party_count,
    SUM(CASE WHEN b.status = 'CONFIRMED' THEN 1 ELSE 0 END)     AS confirmed_count,
    SUM(CASE WHEN b.status = 'PENDING'   THEN 1 ELSE 0 END)     AS pending_count
FROM bookings b
GROUP BY DATE_FORMAT(b.booking_date, '%Y-%m')
ORDER BY month DESC;

-- ============================================================
-- BẢNG 7: PAYMENTS (Quản lý Thanh toán / Đặt cọc)
-- ============================================================
CREATE TABLE payments (
    payment_id      INT             AUTO_INCREMENT PRIMARY KEY,
    booking_id      INT             NOT NULL,
    amount          DECIMAL(12,2)   NOT NULL,
    payment_method  ENUM('CASH', 'BANK_TRANSFER', 'VNPAY', 'MOMO') NOT NULL,
    payment_status  ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    payment_time    DATETIME        DEFAULT CURRENT_TIMESTAMP,
    note            TEXT            NULL,

    CONSTRAINT fk_payment_booking FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- BẢNG 8: REVIEWS (Đánh giá của khách hàng)
-- ============================================================
CREATE TABLE reviews (
    review_id       INT             AUTO_INCREMENT PRIMARY KEY,
    user_id         INT             NOT NULL,
    rating          INT             NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment         TEXT            NULL,
    is_approved     TINYINT(1)      DEFAULT 0 COMMENT '0=Chờ duyệt, 1=Đã duyệt để hiện lên web',
    created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- BẢNG 9: CONTACTS (Liên hệ / Hỗ trợ)
-- ============================================================
CREATE TABLE contacts (
    contact_id      INT             AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100)    NOT NULL,
    email           VARCHAR(100)    NOT NULL,
    phone           VARCHAR(15)     NOT NULL,
    message         TEXT            NOT NULL,
    is_resolved     TINYINT(1)      DEFAULT 0 COMMENT '0=Chưa xử lý, 1=Đã xử lý',
    created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

