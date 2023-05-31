export type Language = "en" | "pl_PL";

export type Translation = {
  main: {
    section: string;
    subSection: string;
    name: string;
  };
  tabs: {
    tasks: string;
    statuses: string;
    banners: string;
  };
  banners: {
    btn: {
      add: string;
    };
    views: {
      actions: {
        title: string;
        remove: {
          button: string;
          confirm: string;
          success: string;
        };
        edit: {
          button: string;
          title: string;
        };
        editImages: {
          button: string;
          title: string;
        };
      };
      list: {
        title: string;
        columns: {
          name: string;
          alternativeText: string;
          imagesCount: string;
          enabled: string;
          actions: string;
          updated: string;
        };
      };
      edit: {
        saveSuccess: string;
        btn: {
          submit: string;
        };
      };
      editImages: {
        hint: {
          main: string;
          generated: string;
        };
        btn: {
          upload: string;
          clear: string;
          submit: string;
        };
        header: {
          generated: string;
        };
      };
      add: {
        saveSuccess: string;
        btn: { submit: string };
        fields: {
          name: {
            label: string;
            placeholder: string;
          };
          alternativeText: {
            label: string;
            placeholder: string;
          };
        };
      };
    };
  };
};

const translations: Record<Language, Translation> = {
  en: {
    main: {
      section: "Add-ons",
      subSection: "My apps",
      name: "AutoPilot",
    },
    tabs: {
      tasks: "Tasks",
      statuses: "Statuses",
      banners: "Banners",
    },
    banners: {
      btn: {
        add: "Add banner",
      },
      views: {
        actions: {
          title: "Actions",
          remove: {
            button: "Remove",
            confirm: "Are you sure you want to remove this banner?",
            success: "Banner has been removed",
          },
          edit: {
            button: "Edit",
            title: "Basic banner edition",
          },
          editImages: {
            button: "Edit image",
            title: "Image edition",
          },
        },
        list: {
          title: "Banners list",
          columns: {
            name: "Name",
            alternativeText: "Alternative text",
            enabled: "Enabled",
            actions: "Actions",
            imagesCount: "Images count",
            updated: "Updated",
          },
        },
        edit: {
          saveSuccess: "Banner has been updated",
          btn: { submit: "Save" },
        },
        editImages: {
          hint: {
            main: "You can upload up to 5 imagesThe original image will not be displayed directly. It will be automatically scaled, so it is recommended to add a banner with a minimum width of 1920px.",
            generated:
              "Generated images that will be displayed in the banner. The size of the displayed image depends on the size of the browser window, and the format (JPEG, WEBP) depends on the browser's capabilities.",
          },
          btn: {
            upload: "Select file to upload",
            clear: "Clear",
            submit: "Save",
          },
          header: {
            generated: "Generated images",
          },
        },
        add: {
          saveSuccess: "Banner has been added",
          btn: { submit: "Add" },
          fields: {
            name: {
              label: "Name",
              placeholder: "Name",
            },
            alternativeText: {
              label: "Alternative text",
              placeholder: "Alternative text",
            },
          },
        },
      },
    },
  },
  pl_PL: {
    main: {
      section: "Dodatki i integracje",
      subSection: "Moje aplikacje",
      name: "AutoPilot",
    },
    tabs: {
      tasks: "Zadania",
      statuses: "Statusy",
      banners: "Banery",
    },
    banners: {
      btn: {
        add: "Dodaj baner",
      },
      views: {
        actions: {
          title: "Akcje",
          remove: {
            button: "Usuń",
            confirm: "Czy na pewno chcesz usunąć ten baner?",
            success: "Baner został usunięty",
          },
          edit: {
            button: "Edytuj",
            title: "Podstawowa edycja banera",
          },
          editImages: {
            button: "Edytuj obraz",
            title: "Edycja obrazu",
          },
        },
        list: {
          title: "Lista banerów",
          columns: {
            name: "Nazwa",
            alternativeText: "Tekst alternatywny",
            enabled: "Włączony",
            actions: "Akcje",
            imagesCount: "Liczba obrazów",
            updated: "Zaktualizowany",
          },
        },
        edit: {
          saveSuccess: "Baner został zaktualizowany",
          btn: { submit: "Zapisz" },
        },
        editImages: {
          header: {
            generated: "Obrazy wygenerowane",
          },
          hint: {
            main: "Oryginalny obraz nie będzie prentowany bezpośrednio. Zostanie on automatycznie przeskalowany dlatego zaleca się dodanie banera w szerokości minimum 1920px.",
            generated:
              "Obrazy wygenerowane, które będą wyświetlane w banerze. Wielkość wyświetlanego obrazu zależy od wielkości okna przeglądarki a format (JPEG, WEBP) od możliwości przeglądarki.",
          },
          btn: {
            upload: "Wybierz obraz z dysku",
            clear: "Wyczyść",
            submit: "Zapisz",
          },
        },
        add: {
          saveSuccess: "Baner został dodany",
          btn: { submit: "Dodaj" },
          fields: {
            name: {
              label: "Nazwa",
              placeholder: "Nazwa",
            },
            alternativeText: {
              label: "Tekst alternatywny",
              placeholder: "np. promocja z rabatem 10%",
            },
          },
        },
      },
    },
  },
};

type PathInto<T extends Record<string, any>> = keyof {
  [K in keyof T as T[K] extends string
  ? K
  : T[K] extends Record<string, any>
  ? `${K & string}.${PathInto<T[K]> & string}`
  : never]: any;
};

function get(
  object: Record<string, unknown>,
  path: Array<string>,
  index = 0,
): string {
  const key = path[index];
  if (key === undefined) {
    return "";
  }
  const result = object[key];
  if (result === undefined) {
    return "";
  }
  if (typeof result === "string") {
    return result;
  }
  return get(Object(result), path, index + 1);
}

export const getTranslation = (language: Language) => {
  return translations[language] || translations.en;
};
export type TranslationPath = PathInto<Translation>;
export type Gettext = (key: TranslationPath) => string;
export const gettextFactory =
  (translation: Translation) =>
    (key: PathInto<Translation>): string => {
      return get(translation, key.split("."));
    };
