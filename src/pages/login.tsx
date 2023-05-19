import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLoginValues } from "../types/form";
import { LoginSchema } from "../schemas/loginSchema";

function Login() {
  const { signIn, signed } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/"); // Chame navigate() dentro do useEffect()
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginValues>({ resolver: yupResolver(LoginSchema) });

  const handleLogin = (data: FormLoginValues) => {
    signIn(data);
    navigate("/todo");
  };

  return (
    <div>
      <h1 className="mt-4 mb-5 fs-1 text-primary">Login</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="container  d-flex flex-column gap-4 justify-content-center align-items-center"
      >
        <div className="form-floating  w-50  ">
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
          <span className="text-danger ">{errors.password?.message}</span>
        </div>
        <button type="submit" className="btn  btn-primary btn-lg">
          SIGN IN
        </button>

        <p className="pt-2">
          Don't have an account?
          <Link to="/register" className="link ms-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
