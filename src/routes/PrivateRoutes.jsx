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
const AddVet = React.lazy(() => import("../pages/Private/admin/vets/AddVets"));
const Vets = React.lazy(() => import("../pages/Private/admin/vets/Vets"));

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

// VET
const Vet = React.lazy(() => import("../pages/Private/vet/Vet"));
const VetProfile = React.lazy(() =>
  import("../pages/Private/vet/vetProfile/VetProfile")
);
const Schedule = React.lazy(() =>
  import("../pages/Private/vet/schedule/Schedule")
);

// STAFF
const Staff = React.lazy(() => import("../pages/Private/staff/Staff"));
const StaffProfile = React.lazy(() =>
  import("../pages/Private/staff/staffProfile/StaffProfile")
);
const BookingConfirm = React.lazy(() =>
  import("../pages/Private/staff/bookingConfirm/BookingConfirm")
);
const AllFeedback = React.lazy(() =>
  import("../pages/Private/staff/allFeedback/AllFeedback")
);

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
        path: path.ADD_VET,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<AddVet />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.VETS,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<Vets />} />
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
    path: path.VET,
    element: (
      <ProtectedRoutes allowedRoles="VET">
        <LoadLazy children={<Vet />} />
      </ProtectedRoutes>
    ),

    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes allowedRoles="VET">
            <LoadLazy children={<VetProfile />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.SCHEDULE,
        element: (
          <ProtectedRoutes allowedRoles="VET">
            <LoadLazy children={<Schedule />} />
          </ProtectedRoutes>
        ),
      },
    ],
  },

  {
    path: path.STAFF,
    element: (
      <ProtectedRoutes allowedRoles="STAFF">
        <LoadLazy children={<Staff />} />
      </ProtectedRoutes>
    ),

    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes allowedRoles="STAFF">
            <LoadLazy children={<StaffProfile />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.BOOKING_CONFIRM,
        element: (
          <ProtectedRoutes allowedRoles="STAFF">
            <LoadLazy children={<BookingConfirm />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.ALL_FEEDBACK,
        element: (
          <ProtectedRoutes allowedRoles="STAFF">
            <LoadLazy children={<AllFeedback />} />
          </ProtectedRoutes>
        ),
      },
    ],
  },
];

export default PrivateRoutes;
