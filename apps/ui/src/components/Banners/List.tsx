import React from "react";

import { useGetBannersQuery } from "../../graphql-operations";
import { DateTime } from "../DateTime";
import { Loader } from "../Loader";
import { useShop } from "../ShoperAppContext";
import { Trans } from "../i18n";
import { ActionButton } from "./ActionButton";

export const List: React.FC = ({}) => {
  const { shopId } = useShop();
  const { data, loading } = useGetBannersQuery({ variables: { shopId } });
  if (loading) {
    return <Loader size="xl" display="center" />;
  }
  return (
    <table className="table table_main table_zebra full_width">
      <thead className="thead_sticky">
        <tr>
          <th className="cell_header">
            <Trans path="banners.views.list.columns.name" />
          </th>
          <th className="cell_header">
            <Trans path="banners.views.list.columns.alternativeText" />
          </th>
          <th className="cell_header">
            <Trans path="banners.views.list.columns.imagesCount" />
          </th>
          <th className="cell_header">
            <Trans path="banners.views.list.columns.updated" />
          </th>
          <th className="cell_action">
            <Trans path="banners.views.list.columns.actions" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data
          ? data.banners.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.alternativeText}</td>
              <td>{u.images?.length}</td>
              <td>
                <DateTime datetime={u.updatedAt} />
              </td>
              <td className="cell_action align_right">
                <ActionButton bannerId={u.id} />
              </td>
            </tr>
          ))
          : null}
      </tbody>
    </table>
  );
};
