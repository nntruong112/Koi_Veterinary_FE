import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { unwrapResult } from "@reduxjs/toolkit";
import { getUserByRole } from "../../../../services/adminService";

const ListAllUser = () => {
  const dispatch = useDispatch();
  const userList =
    useSelector((state) => state.admin.data?.users?.result) || [];

  useEffect(() => {
    const userListAction = dispatch(getUserByRole());

    unwrapResult(userListAction);
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto rounded-2xl p-5">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-scroll shadow-lg rounded-2xl table-fixed">
        <thead className="text-sm text-gray-700 uppercase dark:text-gray-400 border-b bg-gray-200">
          <tr>
            <th className="px-3 py-3 rounded-tl-2xl">Last Name</th>
            <th className="px-3 py-3">First Name</th>
            <th className="px-3 py-3">Username</th>
            <th className="px-3 py-3 w-64">Email</th>
            <th className="px-3 py-3 w-56">Address</th>
            <th className="px-3 py-3">Phone</th>
            <th className="px-3 py-3">Gender</th>
            <th className="px-3 py-3 rounded-tr-2xl">Birthday</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr
              key={user.userId}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="px-3 py-4 whitespace-normal">{user.lastname}</td>
              <td className="px-3 py-4 whitespace-normal">{user.firstname}</td>
              <td className="px-3 py-4 whitespace-normal">{user.username}</td>
              <td className="px-3 py-4 whitespace-normal break-words">
                {user.email}
              </td>
              <td className="px-3 py-4 whitespace-normal break-words">
                {user.address}
              </td>
              <td className="px-3 py-4 whitespace-normal">{user.phone}</td>
              <td className="px-3 py-4 whitespace-normal">{user.gender}</td>
              <td className="px-3 py-4 whitespace-normal">
                {user.dateOfBirth}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAllUser;
