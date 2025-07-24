import { Download, Globe, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardItem, IUser } from "@/types/user-type";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";

const ModernCard = ({
  me,
  card,
  idx,
}: {
  me: IUser;
  card: CardItem;
  idx: number;
}) => {
  const baseUrl = "http://192.168.12.61:3000";
  return (
    <div className="mt-12 max-w-md mx-auto p-4">
      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-7 rounded-t-3xl overflow-hidden">
            {/* Decorative Glowing Circles */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full translate-y-14 -translate-x-14 blur-2xl"></div>

            <div className="relative z-10 flex flex-col items-center">
              <Link href={`/update-card/${card.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-5 right-5 border-white text-white hover:bg-white/20 bg-white/10 transition"
                >
                  Edit
                </Button>
              </Link>

              <Avatar className="w-28 h-28 border-4 border-white shadow-lg rounded-full">
                <AvatarImage src={me?.data?.avatar} alt={me?.data?.user_name} />
                <AvatarFallback className="text-3xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {me?.data?.user_name}
                </AvatarFallback>
              </Avatar>

              <h1 className="mt-4 text-3xl font-bold text-white tracking-wide">
                {me?.data?.full_name}
              </h1>
              <p className="text-cyan-200 font-semibold text-lg mt-1">
                {card.job}
              </p>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-7 space-y-6 bg-slate-800 rounded-b-3xl">
            {/* Company */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wide">
                {card.company || "N/A"}
              </span>
            </div>

            {/* Bio */}
            <p className="text-slate-300 text-base leading-relaxed font-serif">
              {card.bio || "No bio provided."}
            </p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-white">
              {[
                {
                  icon: <Phone className="w-4 h-4 text-cyan-400" />,
                  label: "Phone",
                  value: card.phone || "-",
                },
                {
                  icon: <Mail className="w-4 h-4 text-cyan-400" />,
                  label: "Email",
                  value: me?.data?.email || "-",
                },
                {
                  icon: <Globe className="w-4 h-4 text-cyan-400" />,
                  label: "Website",
                  value: card.web_site || "-",
                },
                {
                  icon: <MapPin className="w-4 h-4 text-cyan-400" />,
                  label: "Location",
                  value: card.address || "-",
                },
              ].map(({ icon, label, value }, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-xs font-medium text-cyan-300">
                      {label}
                    </span>
                  </div>
                  <p className="font-mono text-sm break-words">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <Button
                onClick={async () => {
                  const toBase64 = async (url: string) => {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new Promise<string>((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        resolve(reader.result?.toString().split(",")[1] || "");
                      reader.onerror = reject;
                      reader.readAsDataURL(blob);
                    });
                  };

                  const avatarBase64 = me?.data.avatar
                    ? await toBase64(me?.data.avatar)
                    : "";

                  const vcard = [
                    "BEGIN:VCARD",
                    "VERSION:3.0",
                    `FN:${me?.data.full_name}`,
                    `N:${me?.data.full_name};;;;`,
                    `ORG:${card.company}`,
                    `TITLE:${card.job}`,
                    `TEL;TYPE=WORK,VOICE:${card.phone}`,
                    `EMAIL;TYPE=PREF,INTERNET:${me?.data.email}`,
                    avatarBase64
                      ? `PHOTO;ENCODING=b;TYPE=JPEG:${avatarBase64}`
                      : "",
                    `URL:${card.web_site}`,
                    `ADR;TYPE=WORK:;;${card.address};;;;`,
                    `NOTE:${card.bio}`,
                    "END:VCARD",
                  ]
                    .filter(Boolean)
                    .join("\r\n");

                  const blob = new Blob([vcard], {
                    type: "text/vcard;charset=utf-8",
                  });

                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `${(
                    me?.data.full_name ?? "Unnamed_User"
                  ).replace(" ", "_")}_${idx + 1}.vcf`;

                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                }}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-md transition"
              >
                <Download className="w-5 h-5 mr-2" />
                Save Contact
              </Button>

              {card.socialLinks.map((res, idx: number) => (
                <div key={idx} className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent transition"
                  >
                    <Avatar className="w-6 h-6 rounded-full">
                      <AvatarImage src={res.icon} alt={res.platform} />
                      <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {res.platform}
                      </AvatarFallback>
                    </Avatar>
                    {res.platform}
                  </Button>
                  <div className="mt-6 flex flex-col items-center p-4 bg-amber-600 rounded-lg shadow-lg max-w-xs mx-auto">
                    <p className="text-white font-semibold mb-3 text-lg">
                      Scan My Card
                    </p>
                    <QRCodeCanvas
                      value={`${baseUrl}/${me?.data.user_name}`}
                      size={130}
                      bgColor="transparent"
                      fgColor="#fff"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default ModernCard;
