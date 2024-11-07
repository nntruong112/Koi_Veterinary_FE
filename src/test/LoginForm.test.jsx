import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginForm from "../components/LoginForm";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as status from "../utils/status";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

const GOOGLE_CLIENT_ID =
  "333028122679-8qui3jtdf79sm38ft0rqnrgnbvuhmrs5.apps.googleusercontent.com";

// Khởi tạo mockStore và store một lần duy nhất
const initialState = {
  auth: {
    status: status.IDLE,
    data: null,
    error: null,
  },
};

const mockStore = configureStore([]);
const store = mockStore(initialState);

describe("LoginForm", () => {
  beforeEach(() => {
    // Reset lại tất cả các action đã dispatch để tránh ảnh hưởng đến các bài test khác
    store.clearActions();
  });

  it("Login successfully", async () => {
    render(
      <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Router>
            <LoginForm />
          </Router>
        </GoogleOAuthProvider>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "vuong23112005" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "12345679" },
    });

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    // Sử dụng waitFor với timeout để chờ modal xuất hiện lâu hơn
    waitFor(() => {
      expect(screen.getByText(/Login successfully!/i)).toBeInTheDocument();
    });
  });

  it("Login fails with invalid values", async () => {
    render(
      <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Router>
            <LoginForm />
          </Router>
        </GoogleOAuthProvider>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "wrongusername" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Access denied!");
    });
  });
});
