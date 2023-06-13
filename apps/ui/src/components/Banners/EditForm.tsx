import { Field, Form } from "formik";
import React from "react";

import { Loader } from "../Loader";
import { Trans, useLocaleContext } from "../i18n";

interface EditFormProps {
  loading: boolean;
  submitButtonLabel: string;
}

export const EditForm: React.FC<EditFormProps> = ({ loading, submitButtonLabel }) => {
  const { gettext } = useLocaleContext();

  return (
    <>
      <Form>
        <section className="modal-window__content">
          <span className="ui__form-legend ui__form-legend_sticky">
            Podstawowe informacje
          </span>
          <div className="row row_hcenter">
            <div className="col_auto">
              <div className="form_block">
                <div className="controls">
                  <div className="controls__label">
                    <label className="label label_required" htmlFor="name">
                      {gettext("banners.views.add.fields.name.label")}
                    </label>
                  </div>
                  <div className="controls__content">
                    <div className="controls__element">
                      <Field
                        className="control"
                        id="name"
                        name="name"
                        required
                        placeholder={gettext(
                          "banners.views.add.fields.name.placeholder",
                        )}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form_block">
                <div className="controls controls__inline">
                  <div className="controls__label">
                    <label className="label label_required" htmlFor="name">
                      {gettext("banners.views.add.fields.size.label")}
                    </label>
                  </div>
                  <div className="controls__content controls__content_vcenter">
                    <div className="controls__element controls__element_quarter">
                      <Field
                        className="control"
                        id="width"
                        name="width"
                        required
                        placeholder={gettext(
                          "banners.views.add.fields.width.placeholder",
                        )}
                        type="text"
                      />

                    </div>

                    <div className="controls__label">
                      <label className="label">x</label>
                    </div>

                    <div className="controls__element controls__element_quarter">
                      <Field
                        className="control"
                        id="height"
                        name="height"
                        required
                        placeholder={gettext(
                          "banners.views.add.fields.height.placeholder",
                        )}
                        type="text"
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className="form_block">
                <div className="controls">
                  <div className="controls__label">
                    <label
                      className="label label_required"
                      htmlFor="alternativeText"
                    >
                      {gettext(
                        "banners.views.add.fields.alternativeText.label",
                      )}
                    </label>
                  </div>
                  <div className="controls__content">
                    <div className="controls__element">
                      <Field
                        className="control"
                        id="alternativeText"
                        name="alternativeText"
                        required
                        placeholder={gettext(
                          "banners.views.add.fields.alternativeText.placeholder",
                        )}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-window__footer">
          {loading && <Loader size="s" display="center" />}
          <button
            type="submit"
            disabled={loading}
            className="btn btn_bg btn_s ml-2"
          >
            {submitButtonLabel}
          </button>
        </footer>
      </Form>
    </>
  );
};
