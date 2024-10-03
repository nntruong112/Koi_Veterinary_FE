import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store"; // Để mock Redux store
import LoginForm from "../components/LoginForm";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as status from "../utils/status";

// Khởi tạo mockStore để giả lập Redux store
const mockStore = configureStore([]);
let store;

describe("LoginForm", () => {
  beforeEach(() => {
    store = mockStore({
      auth: {
        status: status.IDLE,
        data: null,
        error: null,
      },
    });
  });

  it("renders login form correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );

    // Kiểm tra hiển thị các phần tử của form
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it("displays error messages when fields are empty", async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );

    // Bấm vào nút "Login" mà không điền thông tin
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    // Kiểm tra thông báo lỗi cho username và password
    expect(screen.getByText(/username must be not blank/i)).toBeInTheDocument();
    expect(screen.getByText(/ /i)).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );

    // Kiểm tra mật khẩu ban đầu được ẩn
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    // Bấm vào biểu tượng mắt để hiển thị mật khẩu
    const toggleShowPass = screen.getByLabelText(/Show password/i);
    fireEvent.click(toggleShowPass);

    // Kiểm tra mật khẩu đã được hiển thị
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("calls login function when form is submitted with valid data", async () => {
    const mockDispatch = vi.fn(() => Promise.resolve()); // Giả lập thành công
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );

    // Điền thông tin hợp lệ vào form
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "vuong" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456789" },
    });

    // Bấm vào nút "Login"
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    // Kiểm tra xem hàm dispatch đã được gọi chưa
    expect(mockDispatch).toHaveBeenCalled();
  });

  // it("displays error message when login fails", async () => {
  //   // Giả lập hành động login thất bại
  //   const mockDispatch = vi.fn(() =>
  //     Promise.reject({
  //       response: { data: { error: "Invalid credentials" } },
  //     })
  //   );
  //   store.dispatch = mockDispatch;

  //   // // Theo dõi window.alert
  //   // const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <LoginForm />
  //       </Router>
  //     </Provider>
  //   );

  //   // Điền thông tin hợp lệ vào form
  //   fireEvent.change(screen.getByPlaceholderText(/username/i), {
  //     target: { value: "vuong" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText(/password/i), {
  //     target: { value: "123456789" },
  //   });

  //   // Bấm vào nút "Login"
  //   const loginButton = screen.getByRole("button", { name: /login/i });
  //   fireEvent.click(loginButton);

  //   expect(mockDispatch).toHaveBeenCalled();
  // });
});
