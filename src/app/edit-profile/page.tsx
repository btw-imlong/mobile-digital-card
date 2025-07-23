// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRef, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Pencil, Trash2 } from "lucide-react";

// const profileSchema = z.object({
//   fullName: z.string().min(2, "Full name is required"),
//   username: z.string().min(2, "Username is required"),
//   email: z.string().email("Invalid email"),
// });

// type ProfileFormValues = z.infer<typeof profileSchema>;

// export default function EditProfile() {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const DEFAULT_AVATAR = "https://www.w3schools.com/howto/img_avatar.png";
//   const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       fullName: "John Doe",
//       username: "johndoe",
//       email: "john@example.com",
//     },
//   });

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setAvatarUrl(url);
//     }
//   };

//   const handleDeleteAvatar = () => {
//     setAvatarUrl(DEFAULT_AVATAR);
//   };

//   const onSubmit = (data: ProfileFormValues) => {
//     console.log("Updated profile:", data);
//   };

//   return (
//     <div className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl">
//       <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
//         Edit Profile
//       </h1>

//       {/* Avatar section */}
//       <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden shadow-lg mb-8">
//         <Avatar className="w-28 h-28">
//           <AvatarImage src={avatarUrl} alt="User Avatar" />
//           <AvatarFallback>JD</AvatarFallback>
//         </Avatar>

//         {/* Delete icon top-right */}
//         <button
//           type="button"
//           onClick={handleDeleteAvatar}
//           className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
//           aria-label="Delete Avatar"
//         >
//           <Trash2 className="w-5 h-5 text-red-600" />
//         </button>

//         {/* Change icon bottom-right */}
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
//           aria-label="Change Avatar"
//         >
//           <Pencil className="w-5 h-5 text-gray-700" />
//         </button>

//         {/* Hidden file input */}
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleAvatarChange}
//           className="hidden"
//         />
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="flex flex-col">
//           <label
//             htmlFor="fullName"
//             className="mb-1 text-sm font-medium text-gray-600"
//           >
//             Full Name
//           </label>
//           <Input
//             id="fullName"
//             placeholder="John Doe"
//             {...register("fullName")}
//             className={`border ${
//               errors.fullName ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.fullName && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.fullName.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label
//             htmlFor="username"
//             className="mb-1 text-sm font-medium text-gray-600"
//           >
//             Username
//           </label>
//           <Input
//             id="username"
//             placeholder="johndoe"
//             {...register("username")}
//             className={`border ${
//               errors.username ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.username && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.username.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label
//             htmlFor="email"
//             className="mb-1 text-sm font-medium text-gray-600"
//           >
//             Email
//           </label>
//           <Input
//             id="email"
//             placeholder="john@example.com"
//             {...register("email")}
//             className={`border ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.email && (
//             <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
//           )}
//         </div>

//         <Button
//           type="submit"
//           className="w-full py-3 font-semibold text-lg transition hover:bg-blue-600"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Saving..." : "Save Changes"}
//         </Button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Trash2 } from "lucide-react";
import { userRequest } from "@/lib/api/user-api";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const DEFAULT_AVATAR = "https://www.w3schools.com/howto/img_avatar.png";
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  // const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  // const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { UPDATE_USER } = userRequest();

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: UPDATE_USER,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "John Doe",
      username: "johndoe",
      email: "john@example.com",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const previewUrl = URL.createObjectURL(file);
  //     setAvatarUrl(previewUrl); // preview
  //     setAvatarFile(file); // store file for upload
  //   }
  // };

  const handleDeleteAvatar = () => {
    setAvatarUrl(DEFAULT_AVATAR);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateUser({
        full_name: data.fullName,
        user_name: data.username,
        email: data.email,
        avatar: avatarUrl,
      });

      router.push("/");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  // const onSubmit = async (data: ProfileFormValues) => {
  //   try {
  //     let uploadedAvatarUrl = avatarUrl;

  //     // Upload avatar file if selected
  //     if (avatarFile) {
  //       const formData = new FormData();
  //       formData.append("file", avatarFile);

  //       const uploadRes = await uploadImage(formData);
  //       uploadedAvatarUrl = uploadRes.data.url; // adjust this line to match your backend response structure
  //     }

  //     // Update profile with avatar URL
  //     await updateUser({
  //       full_name: data.fullName,
  //       user_name: data.username,
  //       email: data.email,
  //       avatar: uploadedAvatarUrl,
  //     });

  //     router.push("/profile");
  //   } catch (error) {
  //     console.error("Update failed", error);
  //     alert("Failed to update profile. Please try again.");
  //   }
  // };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Edit Profile
      </h1>

      {/* Avatar section */}
      <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden shadow-lg mb-8">
        <Avatar className="w-28 h-28">
          <AvatarImage src={avatarUrl} alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        {/* Delete icon top-right */}
        <button
          type="button"
          onClick={handleDeleteAvatar}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          aria-label="Delete Avatar"
        >
          <Trash2 className="w-5 h-5 text-red-600" />
        </button>

        {/* Change icon bottom-right */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          aria-label="Change Avatar"
        >
          <Pencil className="w-5 h-5 text-gray-700" />
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          className="hidden"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col">
          <label
            htmlFor="fullName"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            placeholder="John Doe"
            {...register("fullName")}
            className={`border ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <Input
            id="username"
            placeholder="johndoe"
            {...register("username")}
            className={`border ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <Input
            id="email"
            placeholder="john@example.com"
            {...register("email")}
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3 font-semibold text-lg transition hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
async function uploadImage(
  formData: FormData
): Promise<{ data: { url: string } }> {
  // Replace the URL below with your actual image upload endpoint
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  // Adjust the response parsing as per your backend API
  const data = await response.json();
  return { data };
}
