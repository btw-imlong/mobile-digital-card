// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { userRequest } from "@/lib/api/user-api";
// import { authRequest } from "@/lib/api/auth-api";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import UpdateUserDialog from "@/components/profile-card/update-user-diglog";

// import { Plus, Pencil, LogOut } from "lucide-react";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { CardItem } from "@/types/card-type";
// import CorporateCard from "@/components/profile-card/cororate-card";
// import ModernCard from "@/components/profile-card/modern-card";
// import MinimalCard from "@/components/profile-card/minimal-card";
// import { IUser, UserData } from "@/types/user-type";

// export default function ProfilePage() {
//   const { PROFILE, UPDATE_USER } = userRequest();
//   // const { AUTH_LOGOUT } = authRequest();
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const [openDialog, setOpenDialog] = useState(false);
//   const [cards, setCards] = useState<CardItem[]>([]);

//   // Fetch current user data with cards
//   const { data: me, isLoading } = useQuery<IUser>({
//     queryKey: ["me"],
//     queryFn: PROFILE,
//   });

//   // Update local cards state when user data changes
//   useEffect(() => {
//     if (me?.data?.idCard) {
//       setCards(me.data.idCard);
//     }
//   }, [me]);

//   // Logout handler
//   const handleLogout = async () => {
//     try {
//       // await AUTH_LOGOUT();
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   // Remove card from local state and refetch user profile query (cache) after delete
//   const handleRemoveCard = (deletedCardId: string) => {
//     setCards((prev) => prev.filter((card) => card.id !== deletedCardId));
//     queryClient.invalidateQueries({ queryKey: ["me"] });
//   };

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-10 px-4 sm:px-6">
//       <div className="w-full max-w-sm mx-auto bg-white/80 shadow-lg backdrop-blur rounded-3xl overflow-hidden mb-8 border border-pink-200">
//         {/* Header */}
//         <div className="relative h-36 bg-gradient-to-r from-pink-300 to-purple-400 rounded-t-3xl">
//           <img
//             src=" "
//             alt=""
//             className="h-full w-full object-cover rounded-t-3xl"
//           />
//           <div className="absolute inset-0 bg-black/10 rounded-t-3xl" />
//           <Button
//             variant="ghost"
//             onClick={handleLogout}
//             className="absolute top-3 right-3 border border-white/40  text-white hover:bg-red-100"
//           >
//             <LogOut className="w-5 h-5" />
//           </Button>
//         </div>

//         {/* Avatar and Profile Info */}
//         <div className="px-6 pb-6 -mt-12 relative text-center max-w-md mx-auto">
//           <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-md">
//             <AvatarImage src={me?.data?.avatar} alt="@user" />
//             <AvatarFallback className="bg-pink-500 text-white font-bold text-lg">
//               {me?.data?.full_name?.charAt(0) || ""}
//             </AvatarFallback>
//           </Avatar>

//           <h2 className="mt-3 text-2xl font-semibold text-gray-900">
//             {me?.data?.full_name}
//           </h2>
//           <p className="text-sm text-gray-600">{me?.data?.email}</p>

//           <div className="mt-6 flex flex-col-12 sm:flex-row justify-center gap-4 max-w-xs mx-auto">
//             <Link href="/update-user-diglog.tsx" passHref>
//               <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center w-40 sm:w-auto px-6 py-2 rounded-lg shadow-md transition">
//                 <Pencil className="w-5 h-5 mr-2" />
//                 Edit Profile
//               </Button>
//             </Link>

//             <Link href="/create-card" passHref>
//               <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center w-40 sm:w-auto px-6 py-2 rounded-lg shadow-md transition">
//                 <Plus className="w-5 h-5 mr-2" />
//                 Create Card
//               </Button>
//             </Link>
//           </div>

//           {/* UpdateUserDialog */}
//           {me?.data && (
//             <UpdateUserDialog
//               open={openDialog}
//               setOpen={setOpenDialog}
//               user={me.data}
//               onSave={() => {
//                 queryClient.invalidateQueries({ queryKey: ["me"] });
//                 setOpenDialog(false);
//               }}
//             />
//           )}
//         </div>
//       </div>

//       {/* Cards List */}
//       <div className="w-full max-w-3xl mx-auto space-y-6">
//         {cards.length === 0 ? (
//           <div className="text-center text-gray-500">
//             No cards found. Create one!
//           </div>
//         ) : (
//           cards.map((card: CardItem, idx: number) => (
//             <div
//               key={card.id}
//               className="hover:scale-[1.01] transition-transform duration-300"
//             >
//               {card.card_type === "Corporate" && (
//                 <CorporateCard
//                   me={me!}
//                   card={card}
//                   idx={idx}
//                   onDeleteSuccess={() => handleRemoveCard(card.id)}
//                 />
//               )}
//               {card.card_type === "Modern" && (
//                 <ModernCard
//                   me={me!}
//                   card={card}
//                   idx={idx}
//                   onDeleteSuccess={() => handleRemoveCard(card.id)}
//                 />
//               )}
//               {card.card_type === "Minimal" && (
//                 <MinimalCard
//                   me={me!}
//                   card={card}
//                   idx={idx}
//                   onDeleteSuccess={() => handleRemoveCard(card.id)}
//                 />
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequest } from "@/lib/api/user-api";
import { deleteCard } from "@/lib/api/card-api";
import { User, Mail, LogOut } from "lucide-react";
import { CardItem } from "@/types/card-type";
import Link from "next/link";
import ModernCard from "@/components/profile-card/modern-card";
import Minimal from "@/components/profile-card/minimal";
import CorporateCard from "@/components/profile-card/cororate-card";
import { useRouter } from "next/navigation";

export default function Home() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { PROFILE } = userRequest();
  const { data: me, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => PROFILE(),
  });

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: (cardId: string) => deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <div className="min-h-screen">
      <div className="p-4 items-center justify-center">
        {/* Header */}
        <div className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-0 rounded-t-2xl">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-pink-500 relative rounded-t-2xl">
            <div className="absolute inset-0 bg-black/10 rounded-t-2xl" />

            {/* Logout icon */}
            <button
              onClick={handleLogout}
              className="absolute top-3 right-3 text-white p-2 rounded-full hover:bg-white/20 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-14 mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={me?.data?.avatar} alt="@user" />
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

          {/* Edit & Create buttons */}
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4 px-4 pb-6">
            <Link href="/edit-profile">
              <button className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-600 transition">
                Edit Profile
              </button>
            </Link>
            <Link href="/create-card">
              <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition">
                Create New Card
              </button>
            </Link>
          </div>
        </div>

        {/* Card list */}
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
                {/* <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this card?"
                      )
                    ) {
                      handleDelete(card._id);
                    }
                  }}
                  disabled={isDeleting}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
