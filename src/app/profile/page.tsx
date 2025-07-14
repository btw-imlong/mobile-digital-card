"use client";

import {
  Mail,
  Phone,
  MessageCircle,
  Video,
  Facebook,
  Instagram,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui or similar

export default function BusinessContactCard() {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-3xl shadow-xl mt-10">
      {/* Profile Photo */}
      <div className="flex justify-center mb-4">
        <Image
          src="/avatar.jpg" // replace with dynamic avatar src
          alt="Profile Photo"
          width={100}
          height={100}
          className="rounded-full border-2 border-gray-300"
        />
      </div>

      {/* Name and Title */}
      <div className="text-center space-y-1 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">John Smith</h1>
        <p className="text-sm text-gray-600">Sr. Software Developer</p>
        <p className="text-sm text-gray-500">Teamwork.com</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6 text-center text-sm">
        <div className="flex flex-col items-center text-blue-600">
          <MessageCircle className="w-6 h-6" />
          <span>Message</span>
        </div>
        <div className="flex flex-col items-center text-green-600">
          <Phone className="w-6 h-6" />
          <span>Call</span>
        </div>
        <div className="flex flex-col items-center text-purple-600">
          <Video className="w-6 h-6" />
          <span>Video</span>
        </div>
        <div className="flex flex-col items-center text-red-600">
          <Mail className="w-6 h-6" />
          <span>Mail</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 text-sm text-gray-800 mb-6">
        <div>
          <p className="text-gray-500">Call me</p>
          <a href="tel:+012345678" className="text-blue-600 hover:underline">
            +01 1234 5678
          </a>
        </div>

        <div>
          <p className="text-gray-500">Enquiry on</p>
          <a
            href="mailto:john.smith@teamwork.com"
            className="text-blue-600 hover:underline"
          >
            john.smith@teamwork.com
          </a>
        </div>

        <div>
          <p className="text-gray-500">Facebook</p>
          <Link
            href="https://www.facebook.com/teamwork/"
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            https://www.facebook.com/teamwork/
          </Link>
        </div>

        <div>
          <p className="text-gray-500">Instagram</p>
          <Link
            href="https://www.instagram.com/teamwork/"
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            https://www.instagram.com/teamwork/
          </Link>
        </div>
      </div>

      {/* Edit Profile Button */}
      <Button
        className="w-full"
        variant="default"
        onClick={() => console.log("Go to edit profile")}
      >
        <Pencil className="mr-2 h-4 w-4" />
        Edit Profile
      </Button>
    </div>
  );
}
