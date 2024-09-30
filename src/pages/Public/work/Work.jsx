import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";

const Work = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // }

    if ((user?.accessToken, dispatch)) {
      getAllUsers(user?.accessToken, dispatch);
    }
  }, []);
  return (
    <main>
      <div>{`Your role: ${user?.admin ? `Admin` : `User`}`}</div>
      <div>
        {userList?.map((user) => {
          return (
            <div>
              <p>{user.username}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Work;
