USE banquet_booking_db;

-- Bảng foods (Thực đơn)
INSERT INTO foods (food_name, category, price, description, is_active, image_url) VALUES 
('Thăn Bò Wagyu A5', 'Món chính', 1500000.00, 'Thăn bò Wagyu nướng sốt vang đỏ, kèm khoai tây nghiền nấm truffle.', 1, 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop'),
('Cá Hồi Na Uy Áp Chảo', 'Món chính', 650000.00, 'Cá hồi Na Uy tươi áp chảo giòn da, sốt bơ chanh dây chua ngọt.', 1, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop'),
('Ức Vịt Pháp Xông Khói', 'Món chính', 750000.00, 'Ức vịt xông khói gỗ sồi, ăn kèm măng tây và sốt cam chua ngọt.', 1, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1913&auto=format&fit=crop'),
('Súp Cua Bào Ngư Vi Cá', 'Khai vị', 850000.00, 'Súp hải sản thượng hạng bồi bổ sức khỏe.', 1, 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?q=80&w=2070&auto=format&fit=crop'),
('Salad Ức Gà Nướng', 'Khai vị', 180000.00, 'Rau xanh tổng hợp hữu cơ, ức gà nướng sốt mè rang.', 1, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop'),
('Hàu Pháp Bỏ Lò Phô Mai', 'Khai vị', 320000.00, 'Hàu nhập khẩu bỏ lò phô mai Mozzarella béo ngậy.', 1, 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1974&auto=format&fit=crop'),
('Bánh Tiramisu Ý', 'Tráng miệng', 120000.00, 'Tiramisu cà phê nguyên bản.', 1, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1974&auto=format&fit=crop'),
('Panna Cotta Chanh Dây', 'Tráng miệng', 950000.00, 'Panna Cotta chua thanh béo ngậy giải nhiệt.', 1, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop'),
('Rượu Vang Đỏ Chateau', 'Đồ uống', 2500000.00, 'Rượu vang thượng hạng nhập khẩu từ Pháp.', 1, 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop'),
('Nước Ép Trái Cây Hữu Cơ', 'Đồ uống', 80000.00, 'Cam, cà rốt, cần tây detox.', 1, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1974&auto=format&fit=crop'),
('Combo Hạnh Phúc', 'Combo', 2500000.00, 'Dành cho 2 người (1 Súp, 2 Món chính, 2 Ly vang, 2 Tráng miệng).', 1, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop');

-- Bảng party_packages (Gói tiệc)
INSERT INTO party_packages (package_name, description, price, is_active, image_url) VALUES 
('Lãng Mạn (Romantic)', 'Trang trí bàn tiệc với hoa hồng đỏ, nến thơm. Tặng kèm 2 ly vang sủi và 1 bánh kem mini.', 1500000.00, 1, 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop'),
('Sinh Nhật VIP', 'Trang trí không gian sinh nhật cực chill. Background chụp ảnh, bóng bay nghệ thuật.', 3000000.00, 1, 'https://images.unsplash.com/photo-1530103862676-de8892b1265b?q=80&w=2070&auto=format&fit=crop'),
('Tiệc Công Ty (Corporate)', 'Phù hợp cho công ty từ 30 người trở lên. Bao gồm MC chuyên nghiệp, âm thanh ánh sáng.', 5000000.00, 1, 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop');

-- Bảng tables (Không gian bàn)
INSERT INTO tables (table_number, capacity, area, status, description, image_url) VALUES 
('S01 - Lumina Hall', 120, 'Sảnh Chính', 'AVAILABLE', 'Không gian mở, thoáng đãng với trần cao và đèn chùm pha lê sang trọng.', 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop'),
('V01 - Khu Vườn Kính', 12, 'VIP', 'AVAILABLE', 'Phòng riêng biệt với vách kính cách âm, nhìn ra view thành phố.', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'),
('V02 - Phòng Hoàng Gia', 20, 'VIP', 'AVAILABLE', 'Thiết kế tân cổ điển, tông màu vàng hoàng gia, có phục vụ riêng.', 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop'),
('T01 - Sky Lounge', 50, 'Sân Thượng', 'AVAILABLE', 'Ngắm nhìn toàn cảnh thành phố lung linh về đêm.', 'https://images.unsplash.com/photo-1536939459926-301728717817?q=80&w=2070&auto=format&fit=crop');
