import { useForm } from "react-hook-form";
import { REGISTER_MUTATION } from "../mutations/user";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  register: {
    User: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export const Signup: React.FC = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const [registerUser, { loading, error }] = useMutation<
    RegisterResponse,
    SignupFormInputs
  >(REGISTER_MUTATION, {
    onCompleted: (data) => {
      console.log(data)
      toast.success("Signup success!")
      navigate("/login")
    },
  });

  const onSubmit = (formData: SignupFormInputs) => {
    registerUser({ variables: formData });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded shadow"
    >
      <h2 className="text-xl mb-4">Sign Up</h2>

      <div className="mb-3">
        <label>FirstName</label>
        <input
          {...register("firstName", { required: "firstName is required" })}
          className="w-full border p-2 rounded"
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label>LastName</label>
        <input
          {...register("lastName", { required: "lastName is required" })}
          className="w-full border p-2 rounded"
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
      </div>

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
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </form>
  );
};
