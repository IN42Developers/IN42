import { useTranslation as useI18NextTranslation } from 'react-i18next';
import { TranslationKeys } from '../types/languageTranslation';

type UseTypedTranslation = {
  t: (key: keyof TranslationKeys, options?: any) => string;
};

export const useTypedTranslation = (): UseTypedTranslation => {
  const { t } = useI18NextTranslation();
  return { t };
};