import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const resources = {
  en: {
    login: "Login",
    signup: "Sign Up",
    home: "Home",
    favorites: "Favorites",
    profile: "Profile",
    welcome: "Welcome",
    toggle_language: "Change Language",
    guest: "Guest",
    logout: "Logout",
    email: "Email",
    password: "Password",
    dont_have_account: "Don't have an account",
    continue_as_guest: "Continue as Guest",
  },
  ar: {
    translation: {
      login: "تسجيل الدخول",
      signup: "سجل",
      home: "الصفحة الرئيسية",
      favorites: "المفضلة",
      profile: "الملف الشخصي",
      welcome: "أهلاً وسهلاً",
      toggle_language: "تغيير اللغة",
      guest: "زائر",
      logout: "تسجيل الخروج",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      dont_have_account: "ليس لديك حساب؟ سجل الآن",
      continue_as_guest: "المتابعة كضيف",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
