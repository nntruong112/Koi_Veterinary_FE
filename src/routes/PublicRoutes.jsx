import { path } from "../utils/constant";
import React from "react";
import LoadLazy from "../components/LoadLazy";
import NotFound from "../pages/Public/notFound/NotFound";

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
  { path: path.PRICING, element: <LoadLazy children={<Pricing />} /> },
  { path: path.CONTACT, element: <LoadLazy children={<Contact />} /> },
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;
