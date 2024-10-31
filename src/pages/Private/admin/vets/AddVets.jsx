import React, { useState } from "react";
import { validateEmail } from "../../../../utils/validateData";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  createSpecialty,
  createStaffAccount,
  createVetAccount,
} from "../../../../services/adminService";
import { toast } from "react-toastify";
import TextInput from "../../../../components/Private/member/inputForm.jsx/TextInput";
import { unwrapResult } from "@reduxjs/toolkit";

const AddVets = () => {
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState("");

  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [specialty, setSpecialty] = useState({
    category: "",
    fishSpecialtyName: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    lastname: "",
    firstname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass);

  const validateData = (name, value) => {
    const newErrors = { ...errors };
    let valid = true;

    switch (name) {
      case "lastname":
        if (!value) {
          newErrors.lastname = "Last name must be not blank";
          valid = false;
        } else {
          newErrors.lastname = "";
        }
        break;

      case "firstname":
        if (!value) {
          newErrors.firstname = "First name must be not blank";
          valid = false;
        } else {
          newErrors.firstname = "";
        }
        break;

      case "username":
        if (!value) {
          newErrors.username = "Username must be not blank";
          valid = false;
        } else if (value.length < 5) {
          newErrors.username = "Username must be at least 5 characters";
          valid = false;
        } else {
          newErrors.username = "";
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password must be not blank";
          valid = false;
        } else if (value.length < 7) {
          newErrors.password = "Password must be at least 7 characters";
          valid = false;
        } else {
          newErrors.password = "";
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Confirm password must be not blank";
          valid = false;
        } else if (value !== user.password) {
          newErrors.confirmPassword = "Password is incorrect";
          valid = false;
        } else {
          newErrors.confirmPassword = "";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    validateData(name, value);
  };

  const handleSpecialtyChange = (e) => {
    const { name, value } = e.target;
    setSpecialty((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const lastnameValid = validateData("lastname", user.lastname);
    const firstnameValid = validateData("firstname", user.firstname);
    const usernameValid = validateData("username", user.username);
    const passwordValid = validateData("password", user.password);
    const confirmPasswordValid = validateData(
      "confirmPassword",
      user.confirmPassword
    );

    if (
      lastnameValid &&
      firstnameValid &&
      usernameValid &&
      passwordValid &&
      confirmPasswordValid
    ) {
      setIsLoading(true);

      try {
        if (accountType === "vet") {
          const createSpecialtyAction = await dispatch(
            createSpecialty(specialty)
          );
          const createSpecialtyResult = unwrapResult(createSpecialtyAction);

          await dispatch(
            createVetAccount({
              ...user,
              fishSpecialtyId:
                createSpecialtyResult.result.fishSpecialtyId || "",
            })
          );

          toast.success("Create vet account successfully");
        } else if (accountType === "staff") {
          await dispatch(createStaffAccount(user));

          toast.success("Create staff account successfully");
        }

        setUser({
          lastname: "",
          firstname: "",
          username: "",
          password: "",
          confirmPassword: "",
        });

        setSpecialty({ category: "", fishSpecialtyName: "", description: "" });

        setErrors({});
      } catch (error) {
        console.log("Error: ", error);

        toast.error("Failed while processing!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-5 flex">
      <form
        className="flex flex-col bg-white px-6 w-full min-h-screen border border-gray-200 rounded-xl shadow-xl"
        onSubmit={handleRegister}
      >
        <div className="flex flex-col items-center justify-center gap-3 pt-8">
          <b className="text-4xl font-bold">Create Account</b>
          <span className="font-normal text-gray-500">
            Please fill in form.
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-3">
            Create account for
          </label>
          <select
            name="accountFor"
            onChange={(e) => setAccountType(e.target.value)}
            value={accountType}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select create for
            </option>

            <option value="vet">Create for vet</option>
            <option value="staff">Create for staff</option>
          </select>
        </div>

        {/* Specialty Information */}
        {accountType === "vet" && (
          <div>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                type="text"
                name="category"
                label="Category"
                onChange={handleSpecialtyChange}
                value={specialty.category}
                className="bg-[#eee] rounded-xl px-5 py-2 w-full border"
                placeholder="Enter category"
              />

              <TextInput
                type="text"
                name="fishSpecialtyName"
                label="Specialty Name"
                onChange={handleSpecialtyChange}
                value={specialty.fishSpecialtyName}
                className="bg-[#eee] rounded-xl px-5 py-2 w-full border"
                placeholder="Enter specialty name"
              />
            </div>

            <label
              className="block text-lg font-medium mb-3"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={handleSpecialtyChange}
              value={specialty.description}
              className="bg-white rounded-xl px-5 py-2 w-full border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter description"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <TextInput
              type="text"
              name="lastname"
              label="Last Name"
              onChange={handleChange}
              value={user.lastname}
              placeholder="Enter last name"
              className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                errors.lastname ? "border-red-500" : "border-none"
              } focus:border-red-500`}
            />

            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname}</p>
            )}
          </div>

          <div>
            <TextInput
              type="text"
              name="firstname"
              label="First Name"
              onChange={handleChange}
              value={user.firstname}
              placeholder="Enter first name"
              className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                errors.firstname ? "border-red-500" : "border-none"
              } focus:border-red-500`}
            />

            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname}</p>
            )}
          </div>
        </div>

        <TextInput
          type="text"
          name="username"
          label="Username"
          onChange={handleChange}
          value={user.username}
          placeholder="Enter username"
          className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
            errors.username ? "border-red-500" : "border-none"
          } focus:border-red-500`}
        />

        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}

        <div className="relative">
          <TextInput
            type={showPass ? "text" : "password"}
            name="password"
            label="Password"
            onChange={handleChange}
            value={user.password}
            placeholder="Enter password"
            className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
              errors.password ? "border-red-500" : "border-none"
            } focus:border-red-500`}
          />
          <span
            onClick={toggleShowPass}
            className="absolute right-4 top-14 cursor-pointer"
          >
            {showPass ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <div className="relative">
          <TextInput
            type={showConfirmPass ? "text" : "password"}
            name="confirmPassword"
            label="Confirm Password"
            onChange={handleChange}
            value={user.confirmPassword}
            placeholder="Enter password again"
            className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
              errors.confirmPassword ? "border-red-500" : "border-none"
            } focus:border-red-500`}
          />
          <span
            onClick={toggleShowConfirmPass}
            className="absolute right-4 top-14 cursor-pointer"
          >
            {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="bg-primary rounded-full px-8 py-3 mt-10 mb-4 w-full text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader size={20} color={"#ffffff"} loading={isLoading} />
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddVets;
