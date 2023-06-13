import React from "react";

import { Trans } from "./i18n";

export const Header: React.FC = () => {
  return (
    <>
      <header className="ui__section-header">
        <div className="row sticky_hide hidden-xs-down">
          <div className="col_auto">
            <ul className="list list_inline breadcrumbs">
              <li>
                <Trans path="main.section" />
              </li>
              <li>
                <Trans path="main.subSection" />
              </li>
            </ul>
          </div>
        </div>
        <div className="ui__section-title-actions">
          <div className="col_grow">
            <h2 className="h3">
              <Trans path="main.name" />
            </h2>
          </div>
        </div>
      </header>
    </>
  );
};
