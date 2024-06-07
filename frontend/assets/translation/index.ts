import { LanguageDict } from "../../src/types/languageTranslation";

import { ger } from "./ger";
import { en } from "./en";

export enum ELanguages {
    LANG_GER,
    LANGU_EN,
}

export const changeLanguage = (newLanguage:ELanguages) :LanguageDict => {
    switch (newLanguage) {
        case ELanguages.LANG_GER:
            return ger;
        case ELanguages.LANGU_EN:
                return en;
    }
}