"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/api/user-api";
import { createUserCard } from "@/lib/api/card-api";
import { IUser } from "@/types/user-type";

export default function ProfilePage() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<IUser>({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });

  const {
    mutate: handleCreateCard,
    isPending,
    isSuccess,
    isError: isCreateError,
  } = useMutation({
    mutationFn: createUserCard,
    onSuccess: () => {
      alert("Card created successfully!");
    },
    onError: () => {
      alert("Failed to create card.");
    },
  });

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  if (isError || !user)
    return <p className="text-center mt-8 text-red-500">User not found.</p>;

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-700 p-6 text-white text-center relative">
        <div className="absolute top-4 right-4">
          <button className="bg-white text-blue-600 px-4 py-1 rounded-lg font-semibold shadow hover:bg-gray-100">
            Logout
          </button>
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="relative w-28 h-28">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-full h-full rounded-full border-4 border-white shadow"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold">{user.full_name}</h1>
          <p className="text-sm">{user.job_title}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Profile Information</h2>
          <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">Full Name</p>
            <p className="text-gray-900">{user.full_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Username</p>
            <p className="text-gray-900">{user.user_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Create Card */}
      <div className="max-w-xl mx-auto m-8 py-2 bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl">
            +
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Create Your Digital ID Card
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Generate a secure digital ID card with your verified information.
        </p>
        <button
          disabled={isPending}
          className={`${
            isPending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-6 py-2 rounded-md`}
          onClick={() => handleCreateCard()}
        >
          {isPending ? "Creating..." : "Create Card"}
        </button>
      </div>
    </div>
  );
}
