"use client";

import React from "react";
import { Button } from "../ui/button";
import { Download, Globe, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { CardItem, IUser } from "@/types/user-type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";

const MinimalCard = ({
  me,
  card,
  idx,
}: {
  me: IUser;
  card: CardItem;
  idx: number;
}) => {
  const baseUrl = "http://192.168.12.61:3000"; // fixed IP for phone scanning

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg">
      <Card className="bg-white rounded-xl shadow-md border border-amber-300 relative">
        <Link href={`/update-card/${card.id}`}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 text-amber-600 hover:text-amber-800 transition"
            aria-label="Edit Card"
          >
            <Pencil className="w-5 h-5" />
          </Button>
        </Link>

        <CardContent className="p-6">
          {/* Header */}
          <div className="flex flex-col items-center border-b border-amber-300 pb-6 mb-6">
            <div className="relative w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center shadow-lg border-4 border-amber-500">
              <Avatar className="w-24 h-24 rounded-full border-4 border-white shadow-md">
                <AvatarImage src={me?.data?.avatar} alt={me?.data?.user_name} />
                <AvatarFallback className="text-3xl font-semibold bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                  {me?.data?.user_name}
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-3xl font-serif font-bold text-amber-900 tracking-wide">
              {me.data.full_name}
            </h1>
            <div className="mt-2 inline-block bg-amber-600 text-white text-xs font-semibold px-5 py-1 rounded-full uppercase tracking-wider shadow-md">
              {card.job}
            </div>
            <p className="mt-1 text-amber-700 font-serif text-sm">
              {card.company}
            </p>
          </div>

          {/* Bio */}
          <div className="text-center mb-8">
            <p className="text-amber-800 text-base italic font-serif leading-relaxed max-w-prose mx-auto">
              {card.bio}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-8">
            {[
              {
                icon: <Phone className="w-5 h-5 text-amber-600" />,
                label: "Telephone",
                value: card.phone,
              },
              {
                icon: <Mail className="w-5 h-5 text-amber-600" />,
                label: "Electronic Mail",
                value: me?.data.email,
              },
              {
                icon: <Globe className="w-5 h-5 text-amber-600" />,
                label: "Website",
                value: card.web_site,
              },
              {
                icon: <MapPin className="w-5 h-5 text-amber-600" />,
                label: "Address",
                value: card.address,
              },
            ].map(({ icon, label, value }, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-amber-50 rounded-lg px-4 py-2 shadow-sm border border-amber-200"
              >
                <div className="flex items-center gap-3 text-amber-900 font-semibold text-sm">
                  {icon}
                  <span>{label}</span>
                </div>
                <span className="text-amber-700 text-sm font-mono break-words max-w-[60%] text-right">
                  {value || "-"}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-5">
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
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif font-semibold shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Add to Address Book
            </Button>

            {/* Social Links */}
            <div className="grid gap-6">
              {card.socialLinks.map((res, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-amber-300 p-4 shadow-md"
                >
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-3 border-amber-600 text-amber-700 hover:bg-amber-50 font-serif font-medium"
                  >
                    <Avatar className="w-7 h-7 rounded-full">
                      <AvatarImage src={res.icon} alt={res.platform} />
                      <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {res.platform}
                      </AvatarFallback>
                    </Avatar>
                    {res.platform}
                  </Button>
                </div>
              ))}
            </div>

            {/* QR Code - only once here */}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default MinimalCard;
