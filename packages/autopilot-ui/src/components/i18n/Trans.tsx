import React from "react";

import { TranslationPath } from "../../i18n";
import { useLocaleContext } from "./LocaleProvider";

interface TransProps {
  path: TranslationPath;
}

export const Trans: React.FC<TransProps> = ({ path }) => {
  const { gettext } = useLocaleContext();
  return <>{gettext(path)}</>;
};
