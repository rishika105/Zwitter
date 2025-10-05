import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { POST_MUTATION } from "../mutations/post";
import toast from "react-hot-toast";

interface PostFormInputs {
  content: string;
  postImageFile?: FileList;
}

const CreatePostModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormInputs>();

  const [createPost, { loading, error }] = useMutation(POST_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      toast.success("Posted successfully");
      reset();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create post");
    },
  });

  const onSubmit = async (formData: PostFormInputs) => {
    try {
      const variables: any = {
        content: formData.content,
      };

      // Only include postImageFile if a file was actually selected
      if (formData.postImageFile && formData.postImageFile.length > 0) {
        variables.postImageFile = formData.postImageFile[0];
      } else {
        // Don't include the variable at all if no file is selected
        // This prevents sending an empty object
        variables.postImageFile = null;
      }

      await createPost({
        variables,
      });
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="bg-neutral-200 backdrop-blur-0 h-[60%] w-[90%] absolute top-0 right-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          What's Happening?
        </label>
        <textarea
          {...register("content", { required: "You need to write something" })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          rows={4}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}

        <label
          htmlFor="postImageFile"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Upload Image (optional)
        </label>
        <input
          type="file"
          {...register("postImageFile")}
          accept="image/*"
          className="mt-1 block w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          {loading ? "Posting..." : "Create post +"}
        </button>

        {error && (
          <p className="text-red-500 mt-2 text-sm">
            {error.message || "An error occurred while creating the post"}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreatePostModal;