import * as Updates from 'expo-updates';
import { I18nManager, Platform } from 'react-native';

export const toggleLanguage = async (currentLang: 'en' | 'ar') => {
  const isArabic = currentLang === 'ar';

  await I18nManager.forceRTL(isArabic);

  if (Platform.OS !== 'web') {
    await Updates.reloadAsync(); 
  } else {
    window.location.reload();    
  }
};
