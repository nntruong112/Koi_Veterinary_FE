import { path } from "../utils/constant";
import React from "react";
import LoadLazy from "../components/LoadLazy";
import NotFound from "../pages/Public/notFound/NotFound";
import FAQ_Q4 from "../pages/Public/features/FAQ_Q4";
import FAQ_Q3 from "../pages/Public/features/FAQ_Q3";
// import ProtectedResetPasswordRoutes from "./ProtectedResetPasswordRoutes";

const Home = React.lazy(() => import("../pages/Public/home/Home"));
const Login = React.lazy(() => import("../pages/Public/login/Login"));
const Register = React.lazy(() => import("../pages/Public/register/Register"));
const About = React.lazy(() => import("../pages/Public/about/About"));
const Testimonials = React.lazy(() =>
  import("../pages/Public/testimonials/Testimonials")
);
const Features = React.lazy(() => import("../pages/Public/features/Features"));
const Pricing = React.lazy(() => import("../pages/Public/pricing/Pricing"));
const Contact = React.lazy(() => import("../pages/Public/contact/Contact"));
const Work = React.lazy(() => import("../pages/Public/work/Work"));
const Team = React.lazy(() => import("../pages/Public/team/Team"));
const Booking = React.lazy(() => import("../pages/Public/booking/Booking"));
// const Info = React.lazy(() => import("../pages/Public/infovet/Info"));
const FAQ_Q1 = React.lazy(() => import("../pages/Public/features/FAQ_Q1"));
const FAQ_Q2 = React.lazy(() => import("../pages/Public/features/FAQ_Q2"));
const LoginRole = React.lazy(() =>
  import("../pages/Public/loginRole/LoginRole")
);

const AppointmentBooking = React.lazy(() =>
  import("../pages/Public/appointmentBooking/AppointmentBooking")
);

const ForgotPassword = React.lazy(() =>
  import("../pages/Public/forgotPassword/ForgotPassword")
);

const PublicRoutes = [
  { path: path.HOME, element: <LoadLazy children={<Home />} /> },
  { path: path.LOGIN, element: <LoadLazy children={<Login />} /> },
  { path: path.REGISTER, element: <LoadLazy children={<Register />} /> },
  { path: path.ABOUT, element: <LoadLazy children={<About />} /> },
  {
    path: path.TESTIMONIALS,
    element: <LoadLazy children={<Testimonials />} />,
  },
  { path: path.WORK, element: <LoadLazy children={<Work />} /> },
  { path: path.FEATURES, element: <LoadLazy children={<Features />} /> },
  { path: path.FAQ_Q1, element: <LoadLazy children={<FAQ_Q1 />} /> },
  { path: path.FAQ_Q2, element: <LoadLazy children={<FAQ_Q2 />} /> },
  { path: path.FAQ_Q3, element: <LoadLazy children={<FAQ_Q3 />} /> },
  { path: path.FAQ_Q4, element: <LoadLazy children={<FAQ_Q4 />} /> },

  { path: path.PRICING, element: <LoadLazy children={<Pricing />} /> },
  { path: path.TEAM, element: <LoadLazy children={<Team />} /> },
  {
    path: path.BOOKING,
    element: <LoadLazy children={<Booking />} />,
  },
  // { path: path.INFO, element: <LoadLazy children={<Info />} /> },
  {
    path: path.APPOINTMENT_BOOKING,
    element: <LoadLazy children={<AppointmentBooking />} />,
  },
  { path: path.CONTACT, element: <LoadLazy children={<Contact />} /> },

  { path: path.LOGIN_ROLE, element: <LoadLazy children={<LoginRole />} /> },

  // {
  //   path: path.FORGOT_PASSWORD,
  //   element: (
  //     <ProtectedResetPasswordRoutes>
  //       <LoadLazy children={<ForgotPassword />} />
  //     </ProtectedResetPasswordRoutes>
  //   ),
  // },

  {
    path: path.FORGOT_PASSWORD,
    element: <LoadLazy children={<ForgotPassword />} />,
  },

  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;
