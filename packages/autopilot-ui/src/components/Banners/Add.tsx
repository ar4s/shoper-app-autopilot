import { Formik } from "formik";
import React from "react";

import {
  GetBannersDocument,
  useCreateBannerMutation,
} from "../../graphql-operations";
import { ModalContainer } from "../ModalContainer";
import { useShop } from "../ShoperAppContext";
import { useLocaleContext } from "../i18n";
import { EditForm } from "./EditForm";

interface Props {
  onClose: VoidFunction;
}

export const Add: React.FC<Props> = ({ onClose }) => {
  const { gettext } = useLocaleContext();
  const { shopId, shoper } = useShop();
  const [createMutation, { loading }] = useCreateBannerMutation();

  return (
    <ModalContainer
      raw={true}
      close={() => onClose()}
      title={gettext("banners.btn.add")}
      footerRenderer={() => {
        return <></>;
      }}
    >
      <Formik
        initialValues={{
          name: "test name",
          alternativeText: "test alternativeText",
        }}
        onSubmit={(values, { setSubmitting }) => {
          createMutation({
            variables: {
              shopId,
              name: values.name,
              alternativeText: values.alternativeText,
            },
            refetchQueries: [GetBannersDocument],
          })
            .then((res) => {
              setSubmitting(false);
              onClose();
              shoper?.flashMessage({
                msg: gettext("banners.views.add.saveSuccess"),
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
          loading={loading}
          submitButtonLabel={gettext("banners.views.add.btn.submit")}
        />
      </Formik>
    </ModalContainer>
  );
};
