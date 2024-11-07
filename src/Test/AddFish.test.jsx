import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "react-toastify";
import { addNewFish } from "../services/userService";
import AddFish from "../pages/Private/member/fish/AddFish";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../services/userService", () => ({
  addNewFish: vi.fn(),
}));

// Mock redux store
const mockStore = configureStore();
const store = mockStore({
  users: {
    data: {
      result: {
        userId: "12345",
      },
    },
  },
});

describe("AddFish Component", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("Add fish successfully", async () => {
    // Mock API call success
    addNewFish.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <AddFish />
      </Provider>
    );

    // Fill in form fields (without image)
    fireEvent.change(screen.getByLabelText(/Species/i), {
      target: { value: "Goldfish" },
    });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/Size/i), {
      target: { value: "Medium" },
    });
    fireEvent.change(screen.getByLabelText(/Weight/i), {
      target: { value: "0.5" },
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: "Male" },
    });
    fireEvent.change(screen.getByLabelText(/Color/i), {
      target: { value: "Gold" },
    });

    fireEvent.click(screen.getByText(/Add Fish/i));

    // Wait for async actions and check expectations
    waitFor(() => {
      expect(addNewFish).toHaveBeenCalledWith({
        species: "Goldfish",
        age: 2,
        size: "Medium",
        weight: 0.5,
        gender: "Male",
        color: "Gold",
        customerId: "12345",
      });
      expect(toast.success).toHaveBeenCalledWith("Added successfully");
    });
  });

  it("Add fish failed", async () => {
    // Mock API call failure
    addNewFish.mockRejectedValueOnce(new Error("Failed to add fish"));

    render(
      <Provider store={store}>
        <AddFish />
      </Provider>
    );

    // Fill in form fields (without image)
    fireEvent.change(screen.getByLabelText(/Species/i), {
      target: { value: "Goldfish" },
    });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/Size/i), {
      target: { value: "Medium" },
    });
    fireEvent.change(screen.getByLabelText(/Weight/i), {
      target: { value: "0.5" },
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: "Male" },
    });
    fireEvent.change(screen.getByLabelText(/Color/i), {
      target: { value: "Gold" },
    });

    // Submit form
    fireEvent.click(screen.getByText(/Add Fish/i));

    // Wait for async actions and check expectations
    waitFor(() => {
      expect(addNewFish).toHaveBeenCalledWith({
        species: "Goldfish",
        age: 2,
        size: "Medium",
        weight: 0.5,
        gender: "Male",
        color: "Gold",
        customerId: "12345",
      });
      expect(toast.error).toHaveBeenCalledWith("Added fail!");
    });
  });
});
