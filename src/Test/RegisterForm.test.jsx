// import { render, screen, fireEvent } from "@testing-library/react";
// import RegisterForm from "../components/RegisterForm"; // điều chỉnh đường dẫn tùy vào dự án của bạn
// import { describe, expect, it, vi } from "vitest";
// import { BrowserRouter, Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { register } from "../services/authService"; // mock service
// import "@testing-library/jest-dom";

// // Mock the `register` service
// vi.mock("../services/authService", () => ({
//   register: vi.fn(),
// }));

// // Mock reducer
// // const mockReducer = (state = {}, action) => state; // Reducer giả
// const mockReducer = (state = {}) => state;

// // Tạo store mock với reducer
// const mockStore = configureStore({
//   reducer: {
//     mockReducer, // Bạn có thể thêm nhiều reducer nếu cần
//   },
// });

// describe("RegisterForm", () => {
//   const setup = () => {
//     render(
//       <Provider store={mockStore}>
//         <BrowserRouter>
//           <RegisterForm />
//         </BrowserRouter>
//       </Provider>
//     );
//   };

//   it("renders all input fields and buttons", () => {
//     setup();

//     expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
//     expect(screen.getByText("Register")).toBeInTheDocument();
//   });

//   it("shows error messages if input is invalid", () => {
//     setup();

//     // Nhấn nút submit mà không nhập dữ liệu
//     fireEvent.click(screen.getByText("Register"));

//     // Kiểm tra các thông báo lỗi
//     expect(screen.getByText("Name must be not blank")).toBeInTheDocument();
//     expect(screen.getByText("Email must be not blank")).toBeInTheDocument();
//     expect(screen.getByText("Username must be not blank")).toBeInTheDocument();
//     expect(screen.getByText("Password must be not blank")).toBeInTheDocument();
//     expect(
//       screen.getByText("Confirm password must be not blank")
//     ).toBeInTheDocument();
//   });

//   it("calls register service when valid data is submitted", async () => {
//     setup();

//     // Điền dữ liệu hợp lệ
//     fireEvent.change(screen.getByPlaceholderText("Full Name"), {
//       target: { value: "John Doe" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Email"), {
//       target: { value: "john.doe@example.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Username"), {
//       target: { value: "johndoe" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Password"), {
//       target: { value: "password123" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
//       target: { value: "password123" },
//     });

//     // Nhấn nút đăng ký
//     fireEvent.click(screen.getByText("Register"));

//     // Kiểm tra xem hàm `register` đã được gọi với thông tin người dùng đúng hay chưa
//     expect(register).toHaveBeenCalledWith({
//       name: "John Doe",
//       email: "john.doe@example.com",
//       username: "johndoe",
//       password: "password123",
//       confirmPassword: "password123",
//     });
//   });
// });
