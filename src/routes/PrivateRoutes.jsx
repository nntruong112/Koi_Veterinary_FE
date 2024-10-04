import { path } from "../utils/constant";
import React from "react";
import LoadLazy from "../components/LoadLazy";

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
  import("../pages/Private/member/appointment/MyAppointment")
);
const AddFish = React.lazy(() =>
  import("../pages/Private/member/fish/AddFish")
);

const PrivateRoutes = [
  {
    path: path.ADMIN,
    element: <LoadLazy children={<Admin />} />,
    children: [
      {
        path: path.DASHBOARD,
        element: <LoadLazy children={<Dashboard />} />,
      },
      {
        path: path.USERS,
        element: <LoadLazy children={<Users />} />,
      },
      {
        path: path.APPOINTMENT,
        element: <LoadLazy children={<Appointment />} />,
      },
      {
        path: path.ADD_DOCTOR,
        element: <LoadLazy children={<AddDoctors />} />,
      },
      {
        path: path.DOCTOR,
        element: <LoadLazy children={<Doctors />} />,
      },
    ],
  },

  {
    path: path.MEMBER,
    element: <LoadLazy children={<Member />} />,
    children: [
      {
        path: path.PROFILE,
        element: <LoadLazy children={<MyProfile />} />,
      },

      {
        path: path.FISH,
        element: <LoadLazy children={<MyFish />} />,
      },

      {
        path: path.MY_APPOINTMENT,
        element: <LoadLazy children={<MyAppointment />} />,
      },

      {
        path: path.ADD_FISH,
        element: <LoadLazy children={<AddFish />} />,
      },
    ],
  },
];

export default PrivateRoutes;
