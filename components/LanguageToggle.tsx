import React from "react";
import { I18nManager, Platform, Pressable, Text } from "react-native";
import { useTranslation } from "react-i18next";
import * as Updates from "expo-updates";
import i18n from "../utils/i18n";

const LanguageToggle = () => {
  const toggleLanguage = async () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    await i18n.changeLanguage(newLang);

    if (Platform.OS !== "web") {
      I18nManager.forceRTL(newLang === "ar");
      Updates.reloadAsync();
    }
  };

  return (
    <Pressable
      onPress={toggleLanguage}
      style={{
        backgroundColor: "#0638ceff",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 10,
        marginTop: 10,
        alignSelf: "flex-end",
      }}
    >
      <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
        {i18n.language === "en" ? "AR" : "EN"}
      </Text>
    </Pressable>
  );
};

export default LanguageToggle;
