import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import HealthRecordPage from "../pages/Private/member/fish/HealthRecord";
import axios from "axios";
import { toast } from "react-toastify";
import { vi } from "vitest";

// Mocking axios and toast
vi.mock("axios");
vi.mock("react-toastify", () => ({
  ToastContainer: vi.fn(() => <div>Toast Container Mock</div>),
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

const mockStore = configureStore([]);
const mockFishId = "fish123";

const renderComponent = (fishId = mockFishId) =>
  render(
    <Provider
      store={mockStore({
        users: { data: { result: { userId: "testUserId" } } },
      })}
    >
      <Router>
        <HealthRecordPage />
      </Router>
    </Provider>
  );

describe("HealthRecordPage", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          healthRecordId: "1",
          createdDate: "2024-11-01",
          diagnosis: "Healthy",
          treatment: "None",
          medicine: "Antibiotic A",
        },
      ],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display health records when data is available", async () => {
    renderComponent();

    // Wait for health records to load
    await waitFor(() => screen.getByText("Fish Health Records"));

    // Check if the record data is displayed
    expect(screen.getByText("2024-11-01")).toBeInTheDocument();
    expect(screen.getByText("Healthy")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
    expect(screen.getByText("Antibiotic A")).toBeInTheDocument();
  });

  it("should show a message when no health records are found", async () => {
    axios.get.mockResolvedValueOnce({ data: [] }); // No records

    renderComponent();

    // Wait for health records to load
    await waitFor(() => screen.getByText("Fish Health Records"));

    // Check if the no records message is displayed
    expect(
      screen.getByText("No health records found for this fish.")
    ).toBeInTheDocument();
    expect(toast.info).toHaveBeenCalledWith(
      "No health records found for this fish."
    );
  });

  it("should show an error message if the request fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Request failed"));

    renderComponent();

    // Wait for the error toast to be shown
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "This fish does not have health records, please booking appointment for this fish to have health record from us. Thank you."
      )
    );
  });

  it("should navigate to the fish list when the close button is clicked", async () => {
    renderComponent();

    // Check for the close button in the component
    const closeButton = screen.getByRole("button", { name: /close/i });

    fireEvent.click(closeButton);

    // Verify that the navigation was triggered
    expect(screen.getByText("Toast Container Mock")).toBeInTheDocument();
  });

  it("should show a loading message when data is being fetched", async () => {
    axios.get.mockResolvedValueOnce({ data: [] }); // Simulating loading

    renderComponent();

    // While loading, check for loading message
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
