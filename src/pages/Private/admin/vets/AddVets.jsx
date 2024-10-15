import React, { useState } from "react";
import { validateEmail } from "../../../../utils/validateData";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createVetAccount } from "../../../../services/adminService";
import { toast } from "react-toastify";

const AddVets = () => {
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    lastname: "",
    firstname: "",
    email: "",
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
          newErrors.lastname = "Name must be not blank";
          valid = false;
        } else {
          newErrors.lastname = "";
        }
        break;
      case "firstname":
        if (!value) {
          newErrors.firstname = "Name must be not blank";
          valid = false;
        } else {
          newErrors.firstname = "";
        }
        break;
      case "email":
        if (!value) {
          newErrors.email = "Email must be not blank";
          valid = false;
        } else if (!validateEmail(value)) {
          newErrors.email = "Email is incorrect format";
          valid = false;
        } else {
          newErrors.email = "";
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

  const handleRegister = async (e) => {
    e.preventDefault();

    const lastnameValid = validateData("lastname", user.lastname);
    const firstnameValid = validateData("firstname", user.firstname);
    const emailValid = validateData("email", user.email);
    const usernameValid = validateData("username", user.username);
    const passwordValid = validateData("password", user.password);
    const confirmPasswordValid = validateData(
      "confirmPassword",
      user.confirmPassword
    );

    if (
      lastnameValid &&
      firstnameValid &&
      emailValid &&
      usernameValid &&
      passwordValid &&
      confirmPasswordValid
    ) {
      setIsLoading(true);

      try {
        await dispatch(createVetAccount(user));
        setUser({
          lastname: "",
          firstname: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        toast.success("Create vet account successfully");
      } catch (error) {
        const responseError = error?.response?.data;
        toast.error(responseError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-6 bg-white px-8 py-4 w-full h-screen mb-10"
      onSubmit={handleRegister}
    >
      <div className="flex flex-col items-center justify-center gap-3 pt-8">
        <b className="text-4xl font-bold">Create Vet Account</b>
        <span className="font-normal text-gray-500">Please fill in form.</span>
      </div>

      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
          errors.lastname ? "border-red-500" : "border-none"
        } focus:border-red-500`}
        onChange={handleChange}
        value={user.lastname}
      />
      {errors.lastname && (
        <p className="text-red-500 text-sm">{errors.lastname}</p>
      )}

      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
          errors.firstname ? "border-red-500" : "border-none"
        } focus:border-red-500`}
        onChange={handleChange}
        value={user.firstname}
      />
      {errors.firstname && (
        <p className="text-red-500 text-sm">{errors.firstname}</p>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
          errors.email ? "border-red-500" : "border-none"
        } focus:border-red-500`}
        onChange={handleChange}
        value={user.email}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="text"
        name="username"
        placeholder="Username"
        className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
          errors.username ? "border-red-500" : "border-none"
        } focus:border-red-500`}
        onChange={handleChange}
        value={user.username}
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username}</p>
      )}

      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
            errors.password ? "border-red-500" : "border-none"
          } focus:border-red-500`}
        />
        <span
          onClick={toggleShowPass}
          className="absolute right-3 top-3 cursor-pointer"
        >
          {showPass ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      <div className="relative">
        <input
          type={showConfirmPass ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.confirmPassword}
          className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
            errors.confirmPassword ? "border-red-500" : "border-none"
          } focus:border-red-500`}
        />
        <span
          onClick={toggleShowConfirmPass}
          className="absolute right-3 top-3 cursor-pointer"
        >
          {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )}

      <button
        type="submit"
        className="bg-primary rounded-full px-8 py-3 mt-3 w-full text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <ClipLoader size={20} color={"#ffffff"} loading={isLoading} />
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
};

export default AddVets;
