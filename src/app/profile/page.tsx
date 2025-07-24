"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Mail, User, Edit3 } from "lucide-react";
import { userRequest } from "@/lib/api/user-api";
import { Skeleton } from "@/components/ui/skeleton";

import { CardItem } from "@/types/user-type";
import ModernCard from "@/components/profile-card/cororate-card";
import MinimalCard from "@/components/profile-card/minimal";
import CorporateCard from "@/components/profile-card/modern-card";
import Link from "next/link";

export default function Component() {
  const { GET_ME } = userRequest();
  const {
    data: me,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => GET_ME(),
  });
  console.log(me);
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  } else if (isError) {
    return "error";
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-4 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto overflow-hidden shadow-xl border-0">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={me?.data?.avatar} alt="Sarah Johnson" />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {me?.data?.user_name}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-4">
              {/* Full Name */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {me?.data.full_name}
                </h1>
                <Badge variant="secondary" className="text-xs font-medium">
                  Premium Member
                </Badge>
              </div>

              {/* Username */}
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  @{me?.data?.user_name}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{me?.data?.email}</span>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-6 py-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">127</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Posts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">2.4K</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">891</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Following
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 space-x-1 gap-3">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Link href="/create-card">
                  <Button className="w-full" variant="outline" size="icon">
                    Create Card
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Show Name Card  */}
      <div className="w-full max-w-md mx-auto p-4">
        <div className="grid grid-cols-1 gap-6">
          {me?.data?.idCard?.map((card: CardItem, idx: number) => {
            return (
              <div key={idx}>
                {card.card_type === "Minimal" && (
                  <div>
                    <MinimalCard me={me} card={card} idx={idx} />
                  </div>
                )}
                {card.card_type === "Modern" && (
                  <div>
                    <ModernCard me={me} card={card} idx={idx} />
                  </div>
                )}
                {card.card_type === "Corporate" && (
                  <div>
                    <CorporateCard me={me} card={card} idx={idx} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
