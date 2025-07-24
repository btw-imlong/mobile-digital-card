import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";
import { CookieName } from "@/types/cookie-enum";

// interface AuthStore {
//   accessToken: string;
//   refreshToken: string;
//   setTokens: (accessToken: string, refreshToken: string) => void;
// }

// export const useAuthStore = create<AuthStore>()(
//   devtools((set) => ({
//     accessToken: null,
//     refreshToken: null,

//     //setToken after login or register
//     setTokens: (accessToken, refreshToken) => {
//       Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
//       Cookies.set(CookieName.REFRESH_TOKEN, refreshToken);
//       set(
//         {
//           accessToken,
//           refreshToken,
//         },
//         false,
//         "token"
//       );
//     },
//   }))
// );

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void; // ✅ Add logout type
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    accessToken: null,
    refreshToken: null,

    setTokens: (accessToken, refreshToken) => {
      Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
      Cookies.set(CookieName.REFRESH_TOKEN, refreshToken);
      set({ accessToken, refreshToken }, false, "token");
    },

    logout: () => {
      Cookies.remove(CookieName.ACCESS_TOKEN);
      Cookies.remove(CookieName.REFRESH_TOKEN);
      set({ accessToken: null, refreshToken: null }, false, "logout");
    },
  }))
);
