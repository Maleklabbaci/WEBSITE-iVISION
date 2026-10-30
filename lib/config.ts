// ===== CONFIGURATION CENTRALISÉE =====
// Modifiez ici pour mettre à jour partout dans l'app

export const FORMSPARK_ID = "3hB9voxjF";

// ===== NUMÉROS DE CONTACT =====
// `wa` = format international sans « + » (liens WhatsApp), `tel` = format international avec « + »,
// `display` = format affiché sur le site.
export const PHONE_NUMBERS = [
  {
    id: "principal",
    display: "+213 542 58 69 04",
    tel: "+213542586904",
    wa: "213542586904",
  },
  {
    id: "secondaire",
    display: "+213 697 66 09 69",
    tel: "+213697660969",
    wa: "213697660969",
  },
] as const;

// Numéro principal : utilisé pour WhatsApp et tous les appels directs.
export const WHATSAPP_NUMBER = PHONE_NUMBERS[0].wa;
export const PHONE_NUMBER = PHONE_NUMBERS[0].tel;
export const PHONE_DISPLAY = PHONE_NUMBERS[0].display;

// Numéro secondaire (affiché en complément dans les blocs contact / pied de page).
export const WHATSAPP_NUMBER_ALT = PHONE_NUMBERS[1].wa;
export const PHONE_NUMBER_ALT = PHONE_NUMBERS[1].tel;
export const PHONE_DISPLAY_ALT = PHONE_NUMBERS[1].display;
