import React, { useState } from "react";

import {
  GetBannersDocument,
  useRemoveBannerMutation,
} from "../../graphql-operations";
import { useShop } from "../ShoperAppContext";
import { Trans, useLocaleContext } from "../i18n";
import { Edit } from "./Edit";
import { EditImages } from "./EditImages";

interface ActionButtonProps {
  bannerId: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ bannerId }) => {
  const { shoper } = useShop();
  const { gettext } = useLocaleContext();
  const [edit, setEdit] = useState(false);
  const [editImages, setEditImages] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [removeBanner] = useRemoveBannerMutation();

  const toogleDropdown = () => {
    setDropdown((v) => !v);
  };

  return (
    <>
      {edit && <Edit id={bannerId} onClose={() => setEdit(false)} />}
      {editImages && (
        <EditImages id={bannerId} onClose={() => setEditImages(false)} />
      )}
      <div className="a-dropdown">
        <div
          tabIndex={0}
          role="button"
          className="a-dropdown__caret"
          onClick={toogleDropdown}
        >
          <span className="tooltip">
            <span className="icon icon-gear icon_link"></span>
            <span className="tooltip__container">Akcje</span>
          </span>
        </div>
        {dropdown && (
          <div
            className={`a-dropdown__content a-dropdown__caret-content a-dropdown__content_left`}
          >
            <div role="button" className="a-dropdown__back hidden-sm-up">
              <span className="icon icon-back a-dropdown__back-icon pr-2 size_xxxs"></span>{" "}
              <span className="a-dropdown__back-content">Wróć</span>
            </div>{" "}
            <ul className="a-select__list">
              <li>
                <div className="a-select__list-head">
                  <span className="head_line">
                    <Trans path="banners.views.actions.title" />
                  </span>
                </div>
              </li>

              <li>
                <a
                  href="#"
                  title={gettext("banners.views.actions.edit.title")}
                  className="a-select__list-item link"
                  onClick={() => {
                    toogleDropdown();
                    setEdit(true);
                  }}
                >
                  <span className="icon icon-edit size_xs mr-1"></span>
                  <Trans path="banners.views.actions.edit.button" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title={gettext("banners.views.actions.editImages.title")}
                  className="a-select__list-item link"
                  onClick={() => {
                    toogleDropdown();
                    setEditImages(true);
                  }}
                >
                  <span className="icon icon-img size_xs mr-1"></span>
                  <Trans path="banners.views.actions.editImages.button" />
                </a>
              </li>

              <li className="action-remove">
                <a
                  href="#"
                  className="a-select__list-item link js__confirm"
                  onClick={() => {
                    shoper?.confirm(
                      {
                        msg: gettext("banners.views.actions.remove.confirm"),
                        type: "question",
                      },
                      (ret) => {
                        if (ret.button === "ok") {
                          removeBanner({
                            variables: { bannerId },
                            refetchQueries: [GetBannersDocument],
                          }).then(() => {
                            shoper?.flashMessage({
                              msg: gettext(
                                "banners.views.actions.remove.success",
                              ),
                              type: "success",
                            });
                          });
                        }
                      },
                    );
                  }}
                >
                  <span className="icon icon-delete size_xs mr-1"></span>
                  <Trans path="banners.views.actions.remove.button" />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
