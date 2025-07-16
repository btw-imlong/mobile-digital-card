"use client";
import React from "react";
import { IUser } from "@/types/user-type";
import { CardItem } from "@/types/card-type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ModernCardFront = ({ me, card }: { me: IUser; card: CardItem }) => {
  return (
    <div className="w-[350px] h-[520px] rounded-2xl overflow-hidden shadow-xl text-white relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-pink-500 via-purple-600 to-blue-500">
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] bg-cover bg-no-repeat opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center px-5 py-6 justify-between">
        {/* Logo + Avatar */}
        <div className="w-full flex justify-between items-center">
          <div className="text-sm font-bold uppercase">YourLogo</div>
          <div className="w-10 h-10 bg-white rounded p-1" />
        </div>

        <div className="relative mt-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-pink-400 to-blue-400 p-1">
            <Avatar className="w-full h-full">
              <AvatarImage src={me?.data.avatar} alt="Avatar" />
              <AvatarFallback className="bg-white text-black">
                {me?.data.user_name?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Name + Role */}
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold text-white uppercase tracking-wide">
            {me?.data.full_name}
          </h1>
          <p className="bg-pink-200 text-pink-800 text-xs px-3 py-1 rounded-full font-semibold mt-1 inline-block">
            {card.job}
          </p>
        </div>

        {/* Details */}
        <div className="text-xs w-full mt-4 space-y-1 text-white">
          <DetailRow label="ID No" value={card.code || "000 000 00"} />
          <DetailRow label="DOB" value={card.dob || "01-01-1998"} />
          <DetailRow label="Email" value={me?.data.email} />
          <DetailRow label="Phone" value={card.phone} />
        </div>

        {/* Barcode */}
        <div className="w-full flex justify-center mt-4">
          <div className="w-40 h-10 bg-black" />
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between text-white/90 font-medium">
    <span>{label}:</span>
    <span>{value}</span>
  </div>
);

export default ModernCardFront;
