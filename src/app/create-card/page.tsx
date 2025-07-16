/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useState } from "react";
import axiosInstance from "@/lib/api/request";

export default function CreateCardPage() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      gender: "male",
      nationality: "CAMBODIAN",
      dob: "",
      address: "",
      phone: "",
      card_type: "Corporate",
      social: [{ platform: "", icon: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "social",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axiosInstance.post("/card/create-card", data);
      router.push("/");
    } catch (error) {
      console.error("Card creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Create Your ID Card
        </h1>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            {...register("gender")}
            className="w-full p-2 border rounded-md"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label className="block mb-1 font-medium">Nationality</label>
          <input
            type="text"
            {...register("nationality")}
            className="w-full p-2 border rounded-md"
            placeholder="e.g., CAMBODIAN"
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            {...register("dob")}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            {...register("address")}
            className="w-full p-2 border rounded-md"
            placeholder="e.g., Cambodia, Phnom Penh"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full p-2 border rounded-md"
            placeholder="e.g., 086280018"
          />
        </div>

        {/* Card Type */}
        <div>
          <label className="block mb-1 font-medium">Card Type</label>
          <select
            {...register("card_type")}
            className="w-full p-2 border rounded-md"
          >
            <option value="Corporate">Corporate</option>
            <option value="Modern">Modern</option>
            <option value="Minimal">Minimal</option>
          </select>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold">Social Links</label>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-2 border p-4 rounded-md bg-gray-50"
            >
              <input
                type="text"
                placeholder="Platform (e.g., Facebook)"
                {...register(`social.${index}.platform`)}
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Icon URL"
                {...register(`social.${index}.icon`)}
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Profile URL"
                {...register(`social.${index}.url`)}
                className="p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 col-span-1 mt-1 underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ platform: "", icon: "", url: "" })}
            className="text-blue-600 underline"
          >
            + Add Social Link
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Card"}
        </button>
      </form>
    </div>
  );
}
