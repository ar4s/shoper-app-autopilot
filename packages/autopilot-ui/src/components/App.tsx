import React, { useState } from "react";

import { Translation } from "../i18n";
import { AppWrapper } from "./AppWrapper";
import { Banners } from "./Banners/Banners";
import { Tasks } from "./Tasks";
import { Trans } from "./i18n";

type Props = {
  translation: Translation;
  graphqlUrl: string;
  shopId: string;
};

const Content: React.FC<{ shopId: string }> = ({ shopId }) => {
  const [tab, setTab] = useState<"tasks" | "statuses" | "banners">("banners");
  return (
    <div className="ui__section-main">
      <aside className="col_lg-3 col_xs-12 ui__section-sidebar">
        <div className="ui__section-sidebar-box">
          <nav className="ui__section-sidebar-content">
            <ul className="sidemenu hidden-md-down">
              <li
                tabIndex={0}
                className="sidemenu__link"
                data-tab-for-current={tab === "tasks" ? "true" : "false"}
                data-tab-for-page="1.1"
                onClick={() => setTab("tasks")}
              >
                <span>
                  <Trans path="tabs.tasks" />
                </span>
              </li>
            </ul>
            <ul className="sidemenu hidden-md-down">
              <li
                tabIndex={1}
                className="sidemenu__link"
                data-tab-for-current={tab === "statuses" ? "true" : "false"}
                data-tab-for-page="1.2"
                onClick={() => setTab("statuses")}
              >
                <span>
                  <Trans path="tabs.statuses" />
                </span>
              </li>
            </ul>

            <ul className="sidemenu hidden-md-down">
              <li
                tabIndex={2}
                className="sidemenu__link"
                // data-tab-for-current={tab === "banners" ? "true" : "false"}
                // data-tab-for-page="1.3"
                onClick={() => setTab("banners")}
              >
                <a href="/">
                  <Trans path="tabs.banners" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="col_lg-9 ui__section-content">
        {tab === "tasks" && <Tasks />}
        {tab === "statuses" && <Tasks />}
        {/* {tab === "banners" && <Banners shopId={shopId} />} */}
      </div>
    </div>
  );
};

export const App: React.FC<Props> = ({ translation, graphqlUrl, shopId }) => {
  return (
    <AppWrapper
      translation={translation}
      graphqlUrl={graphqlUrl}
      shopId={shopId}
    >
      <Content shopId={shopId} />
    </AppWrapper>
  );
};
