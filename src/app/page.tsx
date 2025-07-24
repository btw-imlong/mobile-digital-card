"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequest } from "@/lib/api/user-api";

import { User, Mail } from "lucide-react";
import { CardItem } from "@/types/card-type";
import CorporateCard from "../components/profile-card/cororate-card";
import Link from "next/link";
import ModernCard from "@/components/profile-card/modern-card";
import Minimal from "@/components/profile-card/minimal";

export default function Home() {
  const queryClient = useQueryClient();

  const { PROFILE } = userRequest();
  const { data: me, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => PROFILE(),
  });

  // Mutation for deleting card

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="p-4 items-center justify-center">
          {/* Header */}
          <div className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-0 rounded-t-2xl">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-pink-500 relative rounded-t-2xl">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="relative px-6 pb-6">
              {/* Avatar */}
              <div className="flex justify-center -mt-14 mb-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={me?.data?.avatar} alt="@evilrabbit" />
                    <AvatarFallback>{me?.data?.full_name}</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* User info */}
              <div className="text-center space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {me?.data?.full_name}
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />@{me?.data?.user_name}
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />@{me?.data?.email}
                </div>
              </div>
            </div>
            <div>
              <Link href="/create-card">
                <button className="mt-4 w-full max-w-md mx-auto bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition">
                  Create New Card
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto p-4">
            <div className="grid grid-cols-1 gap-4">
              {me?.data?.idCard?.map((card: CardItem, idx: number) => (
                <div
                  key={card._id ?? idx}
                  className="relative border rounded p-4"
                >
                  {card.card_type === "Corporate" && (
                    <CorporateCard me={me} card={card} idx={idx} />
                  )}
                  {card.card_type === "Modern" && (
                    <ModernCard me={me} card={card} idx={idx} />
                  )}
                  {card.card_type === "Minimal" && (
                    <Minimal me={me} card={card} idx={idx} />
                  )}

                  {/* Delete Button */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
