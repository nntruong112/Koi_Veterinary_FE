import { path } from "../utils/constant";
import React from "react";
import LoadLazy from "../components/LoadLazy";
import ProtectedRoutes from "./ProtectedRoutes";

// ADMIN
const Admin = React.lazy(() => import("../pages/Private/admin/Admin"));
const Dashboard = React.lazy(() =>
  import("../pages/Private/admin/dashboard/Dashboard")
);
const Users = React.lazy(() => import("../pages/Private/admin/users/Users"));
const Appointment = React.lazy(() =>
  import("../pages/Private/admin/appointment/Appointment")
);
const AddDoctors = React.lazy(() =>
  import("../pages/Private/admin/doctors/AddDoctors")
);
const Doctors = React.lazy(() =>
  import("../pages/Private/admin/doctors/Doctors")
);

// USER
const Member = React.lazy(() => import("../pages/Private/member/Member"));
const MyProfile = React.lazy(() =>
  import("../pages/Private/member/profile/MyProfile")
);
const MyFish = React.lazy(() => import("../pages/Private/member/fish/MyFish"));
const MyAppointment = React.lazy(() =>
  import("../pages/Private/member/myAppointment/MyAppointment")
);
const AddFish = React.lazy(() =>
  import("../pages/Private/member/fish/AddFish")
);

// BOOKING
const Booking = React.lazy(() => import("../pages/Public/booking/Booking"));

const PrivateRoutes = [
  {
    path: path.ADMIN,
    element: (
      <ProtectedRoutes allowedRoles="ADMIN">
        <LoadLazy children={<Admin />} />
      </ProtectedRoutes>
    ),

    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<Dashboard />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.USERS,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<Users />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.APPOINTMENT,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<Appointment />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.ADD_DOCTOR,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<AddDoctors />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.DOCTOR,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<Doctors />} />
          </ProtectedRoutes>
        ),
      },
    ],
  },

  // USER
  {
    path: path.MEMBER,
    element: (
      <ProtectedRoutes allowedRoles="USER">
        <LoadLazy children={<Member />} />
      </ProtectedRoutes>
    ),

    children: [
      {
        path: path.PROFILE,
        element: (
          <ProtectedRoutes allowedRoles="USER">
            <LoadLazy children={<MyProfile />} />
          </ProtectedRoutes>
        ),
      },

      {
        path: path.FISH,
        element: (
          <ProtectedRoutes allowedRoles="USER">
            <LoadLazy children={<MyFish />} />
          </ProtectedRoutes>
        ),
      },

      {
        path: path.MY_APPOINTMENT,
        element: (
          <ProtectedRoutes allowedRoles="USER">
            <LoadLazy children={<MyAppointment />} />
          </ProtectedRoutes>
        ),
      },

      {
        path: path.ADD_FISH,
        element: (
          <ProtectedRoutes allowedRoles="USER">
            <LoadLazy children={<AddFish />} />
          </ProtectedRoutes>
        ),
      },
    ],
  },

  {
    path: path.BOOKING,
    element: (
      <ProtectedRoutes allowedRoles="USER">
        <LoadLazy children={<Booking />} />
      </ProtectedRoutes>
    ),
  },
];

export default PrivateRoutes;
