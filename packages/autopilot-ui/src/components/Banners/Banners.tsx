import React, { useState } from "react";

import { Trans } from "../i18n";
import { Add } from "./Add";

import { List } from "./List";

interface BannersProps {
  shopId: string;
}

export const Banners: React.FC<BannersProps> = ({ shopId }) => {
  const [view, setView] = useState<"add" | null>(null);

  return (
    <div className="ui__section-content-box">
      <div className="ui__section-title-actions">
        <div className="col_grow">
          <h2 className="h3">
            <Trans path="banners.views.list.title" />
          </h2>
        </div>
        <aside className="col_auto">
          <div className="row row_vcenter">
            <div className="col_auto hidden-sm-down">
              <ul className="list list_inline">
                <li>
                  <a className="link link_secondary" href="#">
                    <span className="icon icon-merge pointer mr-1"></span> Akcja
                    1
                  </a>
                </li>

                <li className="list-item_right-separator pr-2">
                  <a
                    className="link link_secondary"
                    href="#"
                    target="_blank"
                    rel="noopener"
                  >
                    <span className="icon icon-search mr-1"></span> Akcja 2
                  </a>
                </li>
              </ul>
            </div>

            <div className="col_auto hidden-xs-down">
              <div className="buttons">
                <a
                  href="#"
                  className="btn btn_outline btn_s"
                  onClick={() => setView("add")}
                >
                  <Trans path="banners.btn.add" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div>
        <List />
        {/* <EditImages
          id={"e493286d-ad70-4f18-b028-b46bf03da214"}
          onClose={() => {
            console.log("close");
          }}
        /> */}
        {view === "add" && <Add onClose={() => setView(null)} />}
      </div>
    </div>
  );
};
