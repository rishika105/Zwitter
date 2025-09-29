import { useForm } from "react-hook-form";
import { LOGIN_USER } from "../mutations/user";
import { useMutation } from "@apollo/client/react";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";
import toast from "react-hot-toast";
import { setUser } from "../slices/profileSlice";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  loginUser: {
    token: string;
    user: {
      id: string;
      firstName: string;
      email: string;
    };
  };
}

// {
//   "data": {
//     "loginUser": {
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXk",
//       "user": {
//         "firstName": "Vijay"
//       }
//     }
//   }
// }  //reponse format

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [loginUser, { loading, error }] = useMutation<
    LoginResponse,
    LoginFormInputs
  >(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.loginUser.token;
      const user = data.loginUser.user;
      toast.success("Login success!");

      dispatch(setToken(token));
      localStorage.setItem("Tweettoken", token);

      // If you want to store user
      dispatch(setUser(user));
      localStorage.setItem("TweetUser", JSON.stringify(user));
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
