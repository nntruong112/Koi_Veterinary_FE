import { path } from "../utils/constant";
import React from "react";
import LoadLazy from "../components/LoadLazy";

const Admin = React.lazy(() => import("../pages/Private/admin/Admin"));
const Dashboard = React.lazy(() =>
  import("../pages/Private/admin/dashboard/Dashboard")
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
    ],
  },
];

export default PrivateRoutes;
