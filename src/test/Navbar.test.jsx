import { render, screen, waitFor } from "@testing-library/react";
import HealthRecordPage from "../pages/Private/member/fish/HealthRecord";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("axios");

describe("HealthRecordPage", () => {
  const mockFishId = 123;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("This fish have health record", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          healthRecordId: 1,
          createdDate: "2024-11-01",
          diagnosis: "Fin Rot",
          treatment: "Antibiotic Treatment",
          medicine: "Med A",
        },
        {
          healthRecordId: 2,
          createdDate: "2024-11-02",
          diagnosis: "Ich",
          treatment: "Salt Bath",
          medicine: "Med B",
        },
      ],
    });

    render(
      <Router>
        <Routes>
          <Route path="/health-record" element={<HealthRecordPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    );

    waitFor(() => {
      expect(screen.getByText("Fish Health Records")).toBeInTheDocument();
    });

    waitFor(() => {
      expect(screen.getByText("Fin Rot")).toBeInTheDocument();
      expect(screen.getByText("Antibiotic Treatment")).toBeInTheDocument();
      expect(screen.getByText("Med A")).toBeInTheDocument();
    });
  });

  test("This fish does not have health record", async () => {
    axios.get.mockResolvedValueOnce({
      data: [],
    });

    render(
      <Router>
        <Routes>
          <Route path="/health-record" element={<HealthRecordPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    );

    waitFor(() => {
      expect(
        screen.getByText(/This fish does not have health records/)
      ).toBeInTheDocument();
    });
  });
});
