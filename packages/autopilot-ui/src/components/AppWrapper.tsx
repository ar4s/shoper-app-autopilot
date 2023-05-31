import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import React from "react";

import { Translation } from "../i18n";
import { Header } from "./Header";
import { ShoperAppProvider } from "./ShoperAppContext";
import { LocaleProvider } from "./i18n/LocaleProvider";

type Props = {
  translation: Translation;
  graphqlUrl: string;
  children: JSX.Element;
  shopId: string;
};

export const AppWrapper: React.FC<Props> = ({
  translation,
  children,
  graphqlUrl,
  shopId,
}) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: createUploadLink({
      uri: graphqlUrl,
    }),
  });

  return (
    <LocaleProvider translation={translation}>
      <ShoperAppProvider shopId={shopId}>
        <ApolloProvider client={client}>
          <div className="col_xs-12">
            <Header />
            {children}
          </div>
        </ApolloProvider>
      </ShoperAppProvider>
    </LocaleProvider>
  );
};
