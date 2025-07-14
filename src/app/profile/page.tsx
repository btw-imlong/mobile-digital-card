"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { userRequest } from "@/lib/api/user-api";
import { User, Mail } from "lucide-react";
import { CardItem } from "@/types/card-type";
import CorporateCard from "@/components/profile-card/cororate-card";

export default function Home() {
  const { PROFILE } = userRequest();
  const { data: me, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => PROFILE(),
  });

  if (isLoading) {
    return (
      <p className="text-center mt-12 text-gray-600">Loading profile...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="h-36 bg-gradient-to-r from-indigo-600 to-blue-500 relative">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-16">
              <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                <AvatarImage src={me?.data?.avatar} alt={me?.data?.full_name} />
                <AvatarFallback>{me?.data?.full_name}</AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="mt-4 text-center space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {me?.data?.full_name}
              </h2>

              <div className="flex justify-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>Username: {me?.data?.user_name}</span>
              </div>

              <div className="flex justify-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                <span>Email: {me?.data?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="mt-8 space-y-6">
          {me?.data?.idCard?.map((card: CardItem, idx: number) => (
            <div key={idx}>
              {card.card_type === "Corporate" && (
                <CorporateCard me={me} card={card} idx={idx} />
              )}
              {card.card_type === "Modern" && (
                <div className="p-4 bg-white rounded-xl shadow-sm border text-gray-700">
                  <p>Modern card coming soon...</p>
                </div>
              )}
              {card.card_type === "Minimal" && (
                <div className="p-4 bg-white rounded-xl shadow-sm border text-gray-700">
                  <p>Minimal card coming soon...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
