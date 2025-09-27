import { useForm } from "react-hook-form";
import { GET_USER_TOKEN_QUERY } from "../mutations/user";
import { useMutation, useQuery } from "@apollo/client/react";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();


  const [loginUser, { loading, error }] = useQuery<string, LoginFormInputs>(GET_USER_TOKEN_QUERY, {
    onCompleted: (data) => {
      const token: string = data; // depends on your mutation field name
      dispatch(setToken(token));
      localStorage.setItem("token", token);
    },
  });

  const onSubmit = (formData: LoginFormInputs) => {
    loginUser({ variables: formData });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded shadow"
    >
      <h2 className="text-xl mb-4">Login</h2>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: 6,
          })}
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </form>
  );
};
