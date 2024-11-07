import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import CreateHealthRecord from "../pages/Private/vet/healthRecord/CreatehealthRecord";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock axios
vi.mock("axios");

// Mock react-toastify
vi.mock("react-toastify", async (importOriginal) => {
  const actual = await importOriginal();
  const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
  };

  const originalToastError = mockToast.error;
  mockToast.error = (...args) => {
    console.log("Mocked toast.error called with:", args);
    originalToastError(...args);
  };

  return {
    ...actual,
    toast: mockToast,
  };
});

const mockStore = configureMockStore()({
  auth: { data: { token: "mockToken" } },
  users: { data: { result: { userId: "mockVetId" } } },
});

const renderWithProviders = (component) => {
  return render(
    <Provider store={mockStore}>
      {component}
      <ToastContainer />
    </Provider>
  );
};

describe("CreateHealthRecord component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("All fields are fully", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          fish: { fishId: "1", species: "Koi" },
          customer: { username: "customerA" },
        },
      ],
    });
    axios.post.mockResolvedValue({ data: { success: true } });

    renderWithProviders(<CreateHealthRecord />);

    waitFor(() => {
      expect(screen.getByText("Koi - owned by customerA")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Select Fish:"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Diagnosis:"), {
      target: { value: "Bacterial infection" },
    });
    fireEvent.change(screen.getByLabelText("Treatment:"), {
      target: { value: "Daily cleaning" },
    });
    fireEvent.change(screen.getByLabelText("Select Medicine:"), {
      target: { value: "Antibiotic A" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /create health record/i })
    );

    waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Health record created successfully!"
      );
    });
  });

  it("when required fields are missing", async () => {
    renderWithProviders(<CreateHealthRecord />);

    fireEvent.click(
      screen.getByRole("button", { name: /create health record/i })
    );

    waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please fill in all fields.");
    });
  });
});
