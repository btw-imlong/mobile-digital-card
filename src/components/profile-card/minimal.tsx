"use client";
import React from "react";

import { IUser } from "@/types/user-type";
import { CardItem } from "@/types/card-type";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Minimal = ({ me, card }: { me: IUser; card: CardItem; idx: number }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
      {/* Header with logo and QR */}
      <div className="flex justify-between items-center px-4 pt-4">
        {/* Replace this with your real logo */}
        <p className="text-lg font-bold text-[#444]">YourLogo</p>
        <div className="w-12 h-12 bg-gray-100 rounded p-1">
          {/* Replace with <Image /> if using real QR */}
          <div className="w-full h-full bg-gray-300 rounded" />
        </div>
      </div>

      {/* Avatar with wings-style background */}
      <div className="flex flex-col items-center mt-4 relative">
        <div className="relative z-10">
          <Avatar className="w-24 h-24 border-[5px] border-white shadow-md">
            <AvatarImage src={me?.data.avatar} alt="avatar" />
            <AvatarFallback className="bg-pink-400 text-white text-xl">
              {me?.data.user_name?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="w-40 h-8 bg-pink-500 rounded-full blur-sm opacity-70" />
        </div>
      </div>

      {/* Name and title */}
      <div className="text-center mt-2">
        <h1 className="text-lg font-bold text-gray-800">
          {me?.data.full_name}
        </h1>
        <p className="text-sm text-gray-500">{card.job}</p>
      </div>

      {/* Information row */}
      <div className="mt-4 px-6 text-sm text-gray-700 space-y-2 font-medium">
        <div className="flex justify-between">
          <span className="text-gray-500">CODE:</span>
          <span>{card.code || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">TEAM:</span>
          <span>{card.team || "Creative Team"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">PHONE:</span>
          <span>{card.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">DOB:</span>
          <span>{card.dob || "01/01/2019"}</span>
        </div>
      </div>

      {/* Bottom section (footer info) */}
      <div className="mt-4 bg-pink-500 text-white text-xs text-center px-4 py-3 space-y-1">
        <p className="font-semibold">{card.web_site?.toUpperCase()}</p>
        <p>{card.address}</p>
        <p>{card.phone}</p>
      </div>
    </div>
  );
};

export default Minimal;
