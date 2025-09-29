import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { POST_MUTATION } from "../mutations/post";
import toast from "react-hot-toast";

interface PostFormInputs {
  content: string;
  postImageFile?: FileList;
}

// {
//   "data": {
//     "createPost": {
//       "content": "My second post by niya ",
//       "postImageFile": null,
//       "user": {
//         "firstName": "Vijay"
//       }
//     }
//   }
// }     //response format

const CreatePostModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormInputs>();

  const [createPost, { loading, error }] = useMutation<
    PostFormInputs,
    PostFormInputs
  >(POST_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      toast.success("Posted successfully");
    },
  });

  const onSubmit = (formData: PostFormInputs) => {
    // ✅ Extract first file manually
    const file: File | null = formData.postImageFile?.item(0) ?? null;

    createPost({
      variables: {
        content: formData.content,
        postImageFile: file,
      },
    });
  };
  return (
    <div className="bg-neutral-200 backdrop-blur-0 h-[60%] w-[90%] absolute top-0 right-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="content">What's Happening?</label>
        <textarea
          {...register("content", { required: "You need to write something" })}
          className="bg-gray-600"
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}

        <label htmlFor="postImageFile">Upload Image(optional)</label>
        <input type="file" {...register("postImageFile")} />

        <button disabled={loading}>
          {" "}
          {loading ? "Posting" : "Create post +"}{" "}
        </button>
        {/* error from server */}
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </form>
    </div>
  );
};

export default CreatePostModal;
