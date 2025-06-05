# Automation-Test-Project

## Mô tả dự án
Dự án này dùng để auto test một trang web bán đồ nội thất đơn giản được xây dựng bằng HTML, CSS và JavaScript. Trang web bao gồm:
- **Trang chủ**: Hiển thị 3 sản phẩm với nút "Xem chi tiết" và "Thêm vào giỏ hàng".
- **Đăng nhập**: Người dùng có thể đăng nhập với email `test@gmail.com` và mật khẩu `123456`.
- **Đăng xuất**: Thoát khỏi tài khoản.
- **Giỏ hàng**: Hiển thị tối đa 5 sản phẩm, cho phép xóa sản phẩm và tính tổng tiền.
Dự án được lưu trữ trên GitHub, sử dụng GitHub Actions để triển khai CI/CD pipeline và Playwright để viết các bài test tự động (positive và negative).

## Cấu trúc thư mục
Automation-Test-Project/
- index.html                         # File HTML
- css/styles.css                     # File CSS
- js/script.js                       # File JavaScript
- tests/1_authentication.spec.js     # File kiểm thử Playwright: Kiểm tra xác thực
- tests/2_product_info.spec.js       # File kiểm thử Playwright: Kiểm tra thông tin về sản phẩm
- tests/3_cart_operation.spec.js     # File kiểm thử Playwright: Kiểm tra quản lý giỏ hàng
- tests/4_negative_cases.spec.js     # File kiểm thử Playwright: Kiểm tra các trường hợp negative
- .github/workflows/configCI.yml     # File cấu hình GitHub Actions
- README.md                          # Tài liệu hướng dẫn
- playwright.config.js               # File cấu hình Playwright
- package.json                       # Cấu hình dự án Node.js


## Yêu cầu
1. **Node.js**: Cài đặt Node.js (phiên bản 16 trở lên), npm

2. **Playwright**: Cài đặt playwright, @playwright/test

3. **Git**: Cài đặt Git để quản lý source code


## Cài đặt và chạy dự án
1. **Clone repository**:
   git clone https://github.com/viro1295/Automation-Test-Project.git
   cd Automation-Test-Project

2. **Cài đặt phụ thuộc**:
   npm install

3. **Cài đặt trình duyệt**:
   npx playwright install

4. **Chạy kiểm thử Playwright**:
   npx playwright test

5. **Xem báo cáo kiểm thử**:
   npx playwright show-report


## Cấu hình CI/CD
Pipeline CI/CD được định nghĩa trong file `.github/workflows/configCI.yml`. Pipeline sẽ tự động chạy khi có thay đổi được push lên repository. Các giai đoạn bao gồm:
- **Checkout**: Clone repository.
- **Build**: Cài đặt phụ thuộc và check code.
- **Test**: Chạy kiểm thử Playwright.
- **Report**: Lưu trữ báo cáo kiểm thử dưới dạng artifact.

## Cách đọc báo cáo kiểm thử
- Báo cáo kiểm thử được tạo tự động bởi Playwright và lưu trong thư mục `playwright-report`.
- Để xem báo cáo, truy cập file `index.html` trong thư mục `playwright-report` hoặc chạy lệnh `npx playwright show-report`.
- Báo cáo hiển thị:
  - Tổng số bài kiểm thử (passed/failed).
  - Chi tiết từng test case (positive/negative).
  - Thời gian thực thi và thông tin lỗi (nếu có).

## Link repository
- Repository công khai: https://github.com/viro1295/Automation-Test-Project.git

## Note
- Kiểm tra pipeline trên GitHub Actions để đảm bảo tất cả các giai đoạn chạy thành công.
- Nếu gặp lỗi, kiểm tra log trong tab "Actions" trên GitHub.