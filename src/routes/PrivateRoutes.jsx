import { path } from "../utils/constant";
import React from "react";
import LoadLazy from "../components/LoadLazy";
import ProtectedRoutes from "./ProtectedRoutes";
import { element } from "prop-types";

// ADMIN
const Admin = React.lazy(() => import("../pages/Private/admin/Admin"));
const Dashboard = React.lazy(() =>
  import("../pages/Private/admin/dashboard/Dashboard")
);
const Users = React.lazy(() => import("../pages/Private/admin/users/Users"));
const AddVet = React.lazy(() => import("../pages/Private/admin/vets/AddVets"));
const Vets = React.lazy(() => import("../pages/Private/admin/vets/Vets"));
const AppointmentList = React.lazy(() =>
  import("../pages/Private/admin/appointmentList/AppointmentList")
);
const AllSchedule = React.lazy(() =>
  import("../pages/Private/admin/allSchedule/AllSchedule")
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
const PaymentPage = React.lazy(() =>
  import("../pages/Private/member/myAppointment/paymentPage")
);
const HealthRecordPages = React.lazy(() =>
  import("../pages/Private/member/fish/HealthRecord")
);
const PaymentDetailsPage = React.lazy(() =>
  import("../pages/Private/member/myAppointment/PaymentDetails")
);
const AddFish = React.lazy(() =>
  import("../pages/Private/member/fish/AddFish")
);
const UpdateFish = React.lazy(() =>
  import("../pages/Private/member/fish/UpdateFish")
);
const Feedback = React.lazy(() =>
  import("../pages/Private/member/myAppointment/Feedback")
);

// VET
const Vet = React.lazy(() => import("../pages/Private/vet/Vet"));
const VetProfile = React.lazy(() =>
  import("../pages/Private/vet/vetProfile/VetProfile")
);
const Schedule = React.lazy(() =>
  import("../pages/Private/vet/schedule/Schedule")
);
const CreateHealthRecord = React.lazy(() =>
  import("../pages/Private/vet/healthRecord/CreatehealthRecord")
);
const ToDoAppointment = React.lazy(() =>
  import("../pages/Private/vet/toDoAppointment/ToDoAppointment")
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
const NewsList = React.lazy(() =>
  import("../pages/Private/staff/createNews/createNews")
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
      {
        path: path.ALL_APPOINTMENT,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<AppointmentList />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.ALL_SCHEDULE,
        element: (
          <ProtectedRoutes allowedRoles="ADMIN">
            <LoadLazy children={<AllSchedule />} />
          </ProtectedRoutes>
        ),
      },
      //
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

        children: [
          {
            path: path.UPDATE_FISH,
            element: (
              <ProtectedRoutes allowedRoles="USER">
                <LoadLazy children={<UpdateFish />} />
              </ProtectedRoutes>
            ),
          },
          {
            path: path.HEALTH_RECORD,
            element: (
              <ProtectedRoutes allowedRoles="USER">
                <LoadLazy children={<HealthRecordPages />} />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: path.PAYMENT_DETAILS,
        element: (
          <ProtectedRoutes allowedRoles="USER">
            <LoadLazy children={<PaymentDetailsPage />} />
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

        children: [
          {
            path: path.PAYMENT_PAGE,
            element: (
              <ProtectedRoutes allowedRoles="USER">
                <LoadLazy children={<PaymentPage />} />
              </ProtectedRoutes>
            ),
          },

          {
            path: path.FEEDBACK,
            element: (
              <ProtectedRoutes allowedRoles="USER">
                <LoadLazy children={<Feedback />} />
              </ProtectedRoutes>
            ),
          },
        ],
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

  //VET
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
      {
        path: path.CREATE_HEALTH_RECORD,
        element: (
          <ProtectedRoutes allowedRoles="VET">
            <LoadLazy children={<CreateHealthRecord />} />
          </ProtectedRoutes>
        ),
      },
      {
        path: path.DO_APPOINTMENT,
        element: (
          <ProtectedRoutes allowedRoles="VET">
            <LoadLazy children={<ToDoAppointment />} />
          </ProtectedRoutes>
        ),
      },
    ],
  },

  //STAFF
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
      {
        path: path.NEWS,
        element: (
          <ProtectedRoutes allowedRoles="STAFF">
            <LoadLazy children={<NewsList />} />
          </ProtectedRoutes>
        ),
      },
    ],
  },
];

export default PrivateRoutes;
