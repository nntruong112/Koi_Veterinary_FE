import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import CreateHealthRecord from "../pages/Private/vet/healthRecord/CreatehealthRecord";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { ToastContainer } from "react-toastify";

// Khởi tạo mockStore để giả lập Redux store
const mockStore = configureStore([]);
vi.mock("axios");

describe("CreateHealthRecord", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { data: { token: "mockToken" } },
      users: { data: { result: { userId: "mockVetId" } } },
    });
  });

  it("renders CreateHealthRecord form correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateHealthRecord />
        </Router>
      </Provider>
    );

    // Kiểm tra các phần tử của form
    expect(screen.getByLabelText(/Select Fish:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Diagnosis:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Treatment:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Health Record/i })
    ).toBeInTheDocument();
  });

  it("displays error messages when fields are empty", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateHealthRecord />
        </Router>
      </Provider>
    );

    // Bấm nút "Create Health Record" mà không điền dữ liệu
    const createButton = screen.getByRole("button", {
      name: /Create Health Record/i,
    });
    fireEvent.click(createButton);

    // Kiểm tra thông báo lỗi cho các trường còn trống
    expect(screen.getByText(/Please fill in all fields./i)).toBeInTheDocument();
  });

  it("submits form and displays success message with valid data", async () => {
    const mockDispatch = vi.fn(() => Promise.resolve({ payload: true }));
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <Router>
          <CreateHealthRecord />
          <ToastContainer />
        </Router>
      </Provider>
    );

    // Điền thông tin hợp lệ vào form
    fireEvent.change(screen.getByLabelText(/Select Fish:/i), {
      target: { value: "mockFishId" },
    });
    fireEvent.change(screen.getByLabelText(/Diagnosis:/i), {
      target: { value: "Test Diagnosis" },
    });
    fireEvent.change(screen.getByLabelText(/Treatment:/i), {
      target: { value: "Test Treatment" },
    });

    // Bấm vào nút "Create Health Record"
    const createButton = screen.getByRole("button", {
      name: /Create Health Record/i,
    });
    fireEvent.click(createButton);

    // Kiểm tra xem hàm dispatch đã được gọi chưa
    expect(mockDispatch).toHaveBeenCalled();

    // Kiểm tra thông báo thành công
    await waitFor(() => {
      expect(
        screen.getByText(/Health record created successfully!/i)
      ).toBeInTheDocument();
    });
  });

  it("displays fish list from API", async () => {
    const fishListData = [
      {
        fishId: "063d7220-dcf9-4c01-9eed-a66c48d16e5a",
        species: "showa",
        customerUsername: "vuong23112005",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: fishListData });

    render(
      <Provider store={store}>
        <Router>
          <CreateHealthRecord />
        </Router>
      </Provider>
    );

    // Kiểm tra danh sách cá được hiển thị sau khi tải
    await waitFor(() =>
      expect(
        screen.getByText(/Goldfish - owned by customer1/i)
      ).toBeInTheDocument()
    );
  });
});
