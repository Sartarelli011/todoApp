import React, { useState } from "react";
import { userRegister } from "../services/userApi";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../schemas/registerSchema";
import { FormRegisterValues } from "../types/form";
function Cadastro() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterValues>({ resolver: yupResolver(registerSchema) });

  const handleRegister = (data: FormRegisterValues) => {
    userRegister(data);
    navigate("/login");
  };

  return (
    <div>
      <h1 className="mt-4 mb-5 fs-1 text-primary">Register</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="container  d-flex flex-column gap-3 justify-content-center align-items-center"
      >
        <div className="form-floating  w-50">
          <input
            type="text"
            className="form-control text-start"
            placeholder="Your Name"
            {...register("name", { required: true })}
          />
          <label className="text-start" htmlFor="floatingInput">
            Your Name
          </label>
          <span className="text-danger">{errors.name?.message}</span>
        </div>
        <div className="form-floating  w-50">
          <input
            type="email"
            className="form-control text-start"
            placeholder="Email Address"
            {...register("email", { required: true })}
          />
          <label className="text-start" htmlFor="floatingInput">
            Email address
          </label>
          <span className="text-danger">{errors.email?.message}</span>
        </div>
        <div className="form-floating w-50">
          <input
            type="password"
            className="form-control text-start"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <label className="text-start" htmlFor="floatingPassword">
            Password
          </label>
          <span className="text-danger">{errors.password?.message}</span>
        </div>
        <div className="form-floating w-50">
          <input
            type="password"
            className="form-control text-start"
            placeholder="Confirm your password"
            {...register("confirmPassword", { required: true })}
          />
          <label className="text-start" htmlFor="floatingPassword">
            Confirm your password
          </label>
          <span className="text-danger">{errors.confirmPassword?.message}</span>
        </div>
        <div className="form-check d-flex justify-content-center mb-2 mt-1"></div>
        <button type="submit" className="btn  btn-primary btn-lg">
          REGISTER
        </button>
        <p className="pt-2 ">
          already have an account?
          <Link to="/" className="link ms-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
