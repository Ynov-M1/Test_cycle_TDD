export const errorMessages = {
    INVALID_FIRST_NAME: "Le prénom n'est pas valide",
    INVALID_LAST_NAME: "Le nom n'est pas valide",
    INVALID_EMAIL: "L'email n'est pas valide",
    INVALID_ZIP: "Le code postal doit contenir 5 chiffres",
    INVALID_CITY: "Le nom de la ville n'est pas valide",
    UNDERAGE: "Vous devez avoir au moins 18 ans",
    FUTURE_DATE: "La date de naissance ne peut pas être dans le futur",
    XSS_DETECTED: "Caractères interdits détectés"
};

export function getErrorMessage(key) {
    return errorMessages[key] || "Erreur inconnue";
}