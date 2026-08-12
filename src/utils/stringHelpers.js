import i18n from 'i18next'; // Projenizdeki aktif i18n instance'ı

/**
 * Metni seçili aktif dile göre Türkçe/İngilizce uyumlu şekilde büyütür.
 * @param {string} text - Büyütülecek metin
 * @returns {string} - Doğru büyütülmüş metin
 */
export const toDynamicUpperCase = (text) => {
  if (!text) return "";
  
  // Aktif dili kontrol et (Varsayılan olarak Türkçe/İngilizce ayrımı yapar)
  const activeLang = i18n.language || 'tr'; 
  const locale = activeLang.startsWith('tr') ? 'tr-TR' : 'en-US';
  
  return text.toLocaleUpperCase(locale);
};