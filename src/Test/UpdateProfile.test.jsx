import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "react-toastify";
import MyProfile from "../pages/Private/member/profile/MyProfile";
import { getInfoByToken, updateInfoById } from "../services/userService";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../services/userService", () => ({
  updateInfoById: vi.fn(),
  getInfoByToken: vi.fn(),
}));

// Cấu hình store với trạng thái mặc định cho các test cases
const initialState = {
  users: {
    data: {
      result: {
        lastname: "Doe",
        firstname: "John",
        username: "johndoe",
        email: "johndoe@example.com",
      },
    },
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe("MyProfile Component", () => {
  // Reset trạng thái của store mỗi lần trước khi chạy test case
  beforeEach(() => {
    store.clearActions(); // Xóa các actions đã dispatch để đảm bảo môi trường test sạch
  });

  it("Update successfully", async () => {
    updateInfoById.mockResolvedValueOnce({}); // Mock API call success
    getInfoByToken.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <MyProfile />
      </Provider>
    );

    // Click vào nút Edit
    fireEvent.click(screen.getByText(/Edit/i));

    // Điền vào form
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Jane" },
    });
    fireEvent.click(screen.getByText(/Save/i));

    waitFor(() => {
      expect(updateInfoById).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Update successfully");
    });
  });

  it("Update failed", async () => {
    updateInfoById.mockRejectedValueOnce(new Error("Update failed")); // Mock API call failure

    render(
      <Provider store={store}>
        <MyProfile />
      </Provider>
    );

    // Click vào nút Edit
    fireEvent.click(screen.getByText(/Edit/i));

    // Điền vào form
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Jane" },
    });
    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(updateInfoById).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Update failed!");
    });
  });
});
