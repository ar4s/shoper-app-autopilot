import { Formik } from "formik";
import React from "react";

import {
  GetBannersDocument,
  useGetBannerQuery,
  useUpdateBannerMutation,
} from "../../graphql-operations";
import { Loader } from "../Loader";
import { ModalContainer } from "../ModalContainer";
import { useShop } from "../ShoperAppContext";
import { useLocaleContext } from "../i18n";
import { EditForm } from "./EditForm";

interface Props {
  id: string;
  onClose: VoidFunction;
}

export const Edit: React.FC<Props> = ({ id, onClose }) => {
  const { gettext } = useLocaleContext();
  const { shoper } = useShop();
  const { data, loading } = useGetBannerQuery({ variables: { id } });
  const [updateBanner, { loading: updateLoading }] = useUpdateBannerMutation();

  return (
    <ModalContainer
      raw={true}
      close={() => onClose()}
      title={gettext("banners.views.actions.edit.title")}
      footerRenderer={() => {
        return <></>;
      }}
    >
      <>
        {loading && <Loader size="l" display="center"></Loader>}
        {!data ? (
          <Loader size="l" display="center"></Loader>
        ) : (
          <Formik
            initialValues={{
              name: data.banner.name,
              alternativeText: data.banner.alternativeText,
            }}
            onSubmit={(values, { setSubmitting }) => {
              updateBanner({
                variables: { id, ...values },
                refetchQueries: [GetBannersDocument],
              })
                .then((res) => {
                  setSubmitting(false);
                  onClose();
                  shoper?.flashMessage({
                    msg: gettext("banners.views.edit.saveSuccess"),
                    type: "success",
                  });
                })
                .catch((err) => {
                  err.graphQLErrors.forEach((error) => {
                    console.error(error.message);
                    shoper?.flashMessage({ msg: error.message, type: "error" });
                  });
                });
            }}
          >
            <EditForm
              loading={updateLoading}
              submitButtonLabel={gettext("banners.views.edit.btn.submit")}
            />
          </Formik>
        )}
      </>
    </ModalContainer>
  );
};
