// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
// import configureStore from "redux-mock-store"; // Để mock Redux store
// import LoginForm from "../components/LoginForm";
// import { beforeEach, describe, expect, it, vi } from "vitest";
// import * as status from "../utils/status";

// // Khởi tạo mockStore để giả lập Redux store
// const mockStore = configureStore([]);
// let store;

// describe("LoginForm", () => {
//   beforeEach(() => {
//     store = mockStore({
//       auth: {
//         status: status.IDLE,
//         data: null,
//         error: null,
//       },
//     });
//   });

//   it("renders login form correctly", () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <LoginForm />
//         </Router>
//       </Provider>
//     );

//     // Kiểm tra hiển thị các phần tử của form
//     expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
//     expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
//   });

//   it("displays error messages when fields are empty", async () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <LoginForm />
//         </Router>
//       </Provider>
//     );

//     // Bấm vào nút "Login" mà không điền thông tin
//     const loginButton = screen.getByRole("button", { name: /login/i });
//     fireEvent.click(loginButton);

//     // Kiểm tra thông báo lỗi cho username và password
//     expect(screen.getByText(/username must be not blank/i)).toBeInTheDocument();
//     expect(screen.getByText(/password blank /i)).toBeInTheDocument();
//   });

//   it("toggles password visibility", () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <LoginForm />
//         </Router>
//       </Provider>
//     );

//     // Kiểm tra mật khẩu ban đầu được ẩn
//     const passwordInput = screen.getByPlaceholderText(/password/i);
//     expect(passwordInput).toHaveAttribute("type", "password");

//     // Bấm vào biểu tượng mắt để hiển thị mật khẩu
//     const toggleShowPass = screen.getByLabelText(/Show password/i);
//     fireEvent.click(toggleShowPass);

//     // Kiểm tra mật khẩu đã được hiển thị
//     expect(passwordInput).toHaveAttribute("type", "text");
//   });

//   it("calls login function and displays success modal when form is submitted with valid data", async () => {
//     const mockDispatch = vi.fn(() => Promise.resolve({ payload: true })); // Giả lập thành công
//     store.dispatch = mockDispatch;

//     render(
//       <Provider store={store}>
//         <Router>
//           <LoginForm />
//         </Router>
//       </Provider>
//     );

//     // Điền thông tin hợp lệ vào form
//     fireEvent.change(screen.getByPlaceholderText(/username/i), {
//       target: { value: "thienloc" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/password/i), {
//       target: { value: "123456789" },
//     });

//     // Bấm vào nút "Login"
//     const loginButton = screen.getByRole("button", { name: /login/i });
//     fireEvent.click(loginButton);

//     // Kiểm tra xem hàm dispatch đã được gọi chưa
//     expect(mockDispatch).toHaveBeenCalled();

//     // Kiểm tra xem modal thông báo thành công có xuất hiện không
//     waitFor(() => {
//       expect(screen.getByText(/Login successfully!/i)).toBeInTheDocument();
//     });
//   });

//   // it("displays alert when login fails", async () => {
//   //   // Mock alert
//   //   window.alert = vi.fn();

//   //   const mockDispatch = vi.fn(() =>
//   //     Promise.reject({
//   //       response: { data: { error: "Invalid credentials" } },
//   //     })
//   //   );
//   //   store.dispatch = mockDispatch;

//   //   render(
//   //     <Provider store={store}>
//   //       <Router>
//   //         <LoginForm />
//   //       </Router>
//   //     </Provider>
//   //   );

//   //   fireEvent.change(screen.getByPlaceholderText(/username/i), {
//   //     target: { value: "thienloc" },
//   //   });
//   //   fireEvent.change(screen.getByPlaceholderText(/password/i), {
//   //     target: { value: "saipassword" },
//   //   });

//   //   const loginButton = screen.getByRole("button", { name: /login/i });
//   //   fireEvent.click(loginButton);

//   //   expect(mockDispatch).toHaveBeenCalled();

//   //   await waitFor(() => {
//   //     expect(window.alert).toHaveBeenCalledWith(
//   //       "Login failed: Invalid credentials"
//   //     );
//   //   });
//   // });
// });

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";

test("successful login with correct credentials", async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText(/Username/i), {
    target: { value: "" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Login/i }));

  await waitFor(() => {
    expect(screen.getByText(/Login successfully/i)).toBeInTheDocument();
  });
});

test("shows error message on invalid credentials", async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "wrong@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "wrongpass" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Login/i }));

  await waitFor(() => {
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});

test("navigates to dashboard after successful login", async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Login/i }));

  await waitFor(() => {
    expect(window.location.pathname).toBe("/dashboard");
  });
});
