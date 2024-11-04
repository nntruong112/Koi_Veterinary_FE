import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateHealthRecord from "../pages/Private/vet/healthRecord/CreateHealthRecord";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mock = new MockAdapter(axios);
const mockStore = configureStore();

describe("CreateHealthRecord", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        data: {
          result: {
            userId: "mocked-vet-id",
          },
        },
      },
      auth: {
        data: {
          token: "mocked-token",
        },
      },
    });

    // Mock fish fetching
    mock
      .onGet(
        "http://localhost:8080/appointments/belonged_to_vetId/mocked-vet-id"
      )
      .reply(200, [
        {
          fish: { fishId: "1", species: "Goldfish" },
          customer: { username: "JohnDoe" },
        },
      ]);
  });

  afterEach(() => {
    mock.reset();
  });

  test("should create health record successfully (happy case)", async () => {
    mock.onPost("http://localhost:8080/health_records/create").reply(200);

    render(
      <Provider store={store}>
        <CreateHealthRecord />
      </Provider>
    );

    // Simulate filling out the form
    fireEvent.change(screen.getByLabelText(/Select Fish:/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Diagnosis:/i), {
      target: { value: "Healthy" },
    });
    fireEvent.change(screen.getByLabelText(/Treatment:/i), {
      target: { value: "None" },
    });
    fireEvent.change(screen.getByLabelText(/Select Medicine:/i), {
      target: { value: "Antibiotic A" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Create Health Record/i })
    );

    await waitFor(
      () => {
        expect(
          screen.getByText(/Health record created successfully!/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test("should show error message when required fields are missing (unhappy case)", async () => {
    render(
      <Provider store={store}>
        <CreateHealthRecord />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Create Health Record/i })
    );

    expect(screen.getByText(/Please fill in all fields./i)).toBeInTheDocument();
  });
});
