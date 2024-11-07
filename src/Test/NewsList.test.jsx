import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NewsList from "../pages/Private/staff/createNews/createNews";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { vi } from "vitest";

// Thiết lập mock cho axios
vi.mock("axios");

// Thiết lập mock cho react-toastify
vi.mock("react-toastify", () => ({
  ToastContainer: vi.fn(() => <div>Toast Container Mock</div>), // Mock ToastContainer
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockStore = configureStore([]);
const mockUserId = "testUserId";
const mockToken = "testToken";

const renderComponent = () =>
  render(
    <Provider
      store={mockStore({
        users: { data: { result: { userId: mockUserId } } },
        auth: { data: { token: mockToken } },
      })}
    >
      <NewsList />
      <ToastContainer />
    </Provider>
  );

describe("NewsList Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          newsId: 1,
          title: "Sample News",
          newsContent: "This is a sample news content.",
          image: "https://sample.com/image.jpg",
        },
      ],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("adds a new news item successfully", async () => {
    renderComponent();

    // Nhập tiêu đề và nội dung tin tức
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New News Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Content"), {
      target: { value: "New News Content" },
    });

    // Mock API tạo tin tức
    axios.post.mockResolvedValue({});

    // Nhấp nút "Add News"
    fireEvent.click(screen.getByText("Add News"));

    // Đợi Toast hiển thị thành công
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("News created successfully!");
    });
  });

  it("displays an error when trying to create a news item with empty fields", async () => {
    renderComponent();

    // Nhấp nút "Add News" mà không nhập tiêu đề và nội dung
    fireEvent.click(screen.getByText("Add News"));

    // Kiểm tra thông báo lỗi
    await waitFor(() => {
      expect(
        screen.getByText("Please fill in all fields.")
      ).toBeInTheDocument();
    });
  });
});
