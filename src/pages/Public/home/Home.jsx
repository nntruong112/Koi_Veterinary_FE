import React, { useEffect } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
// import { useDispatch, userSelector, useSelector } from "react-redux";
// import { getAllUsers } from "../../../redux/apiRequest";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const user = userSelector((state) => state.auth.login?.currentUser);
  // const userList = useSelector((state) => state.users.users?.allUsers);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // // const userData = [];

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }

  //   if ((user?.accessToken, dispatch)) {
  //     getAllUsers(user?.accessToken, dispatch);
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <Header />
      {/* <div>
        {userList?.map((user) => {
          return <div> {user.username} </div>;
        })}
      </div> */}
      <Footer />
    </>
  );
};

export default Home;
