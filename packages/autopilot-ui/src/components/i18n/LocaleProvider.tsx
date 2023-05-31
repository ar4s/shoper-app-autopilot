import React, { useContext } from "react";

import { Gettext, Language, Translation, gettextFactory } from "../../i18n";

interface ILocaleContext {
  gettext: Gettext;
}

const defaultState = {
  gettext: (msgid: string) => {
    return "TODO";
  },
};

export const LocaleContext = React.createContext<ILocaleContext>(defaultState);

export const useLocaleContext = () => useContext(LocaleContext);

interface LocaleProviderProps {
  translation: Translation;
  children: JSX.Element;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  translation,
  children,
}) => {
  const gettext = gettextFactory(translation);
  console.log("gettext", gettext("main.section"));

  return (
    <LocaleContext.Provider
      value={{
        gettext: gettextFactory(translation),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};
