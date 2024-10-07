// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store"; // Để mock Redux store
// import { BrowserRouter as Router } from "react-router-dom";
// import Navbar from "../components/Navbar"; // Đường dẫn đến Navbar component
// import { beforeEach, describe, expect, it, vi } from "vitest";

// const mockStore = configureStore([]);

// describe("Navbar", () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({
//       auth: {
//         data: {
//           token: "mockToken",
//         },
//       },
//       users: {
//         data: {
//           result: {
//             name: "vuongtran",
//           },
//         },
//       },
//     });
//   });

//   it("renders Navbar correctly with user logged in", () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <Navbar />
//         </Router>
//       </Provider>
//     );

//     // Kiểm tra hiển thị tên người dùng
//     expect(screen.getByText(/Hi, vuongtran/i)).toBeInTheDocument();

//     // Kiểm tra hiển thị các đường dẫn
//     expect(screen.getByText(/home/i)).toBeInTheDocument();
//     expect(screen.getByText(/about/i)).toBeInTheDocument();
//   });

//   it("logs out when Logout is clicked", () => {
//     const mockLogout = vi.fn();
//     store.dispatch = mockLogout; // Mock dispatch

//     render(
//       <Provider store={store}>
//         <Router>
//           <Navbar />
//         </Router>
//       </Provider>
//     );

//     // Mở dropdown
//     fireEvent.click(screen.getByText(/Hi, vuongtran/i));

//     // Nhấp vào Logout
//     fireEvent.click(screen.getByText(/logout/i));

//     // Kiểm tra xem dispatch có được gọi không
//     expect(mockLogout).toHaveBeenCalled(); // Kiểm tra xem logout action đã được gọi
//   });

//   it("renders login button when user is not logged in", () => {
//     store = mockStore({
//       auth: {
//         data: {
//           token: null,
//         },
//       },
//       users: {
//         data: {
//           result: null,
//         },
//       },
//     });

//     render(
//       <Provider store={store}>
//         <Router>
//           <Navbar />
//         </Router>
//       </Provider>
//     );

//     // Kiểm tra hiển thị nút LOGIN
//     expect(screen.getByText(/login/i)).toBeInTheDocument();
//   });
// });
