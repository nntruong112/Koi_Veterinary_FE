import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../services/userService";

const ListAllUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">User Id</th>
            <th className="px-6 py-3">Last Name</th>
            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              First Name
            </th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Address</th>
            <th className="px-6 py-3">Gender</th>
            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Date Of Birth
            </th>
          </tr>
        </thead>
        {/* <tbody>
          {users &&
            users.map((user) => (
              <tr
                key={user.userId}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {user.userId}
                </td>
                <td className="px-6 py-4">{user.lastname}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {user.firstname}
                </td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {user.email}
                </td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {user.address}
                </td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {user.dateOfBirth}
                </td>
              </tr>
            ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default ListAllUser;
