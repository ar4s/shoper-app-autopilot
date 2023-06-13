import axios from "axios";
import { Formik } from "formik";
import React, { useMemo, useRef } from "react";
import useFileUpload from "react-use-file-upload";

import {
  BannerImage,
  GetBannerImagesDocument,
  useGetBannerImagesQuery,
  useUploadBannerImageMutation,
} from "../../graphql-operations";
import { groupBy, sizeOf } from "../../utils";
import { Loader } from "../Loader";
import { MessageBox } from "../MessageBox";
import { ModalContainer } from "../ModalContainer";
import { Trans, useLocaleContext } from "../i18n";

interface Props {
  id: string;
  onClose: VoidFunction;
}

const MEDIA_SERVER_URL = "http://localhost:3009";

const PreviewAndUploadImage: React.FC<{
  id: string;
  images: BannerImage[];
}> = ({ id, images }) => {
  const [uploadBannerImage, { loading }] = useUploadBannerImageMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { files, clearAllFiles, setFiles } = useFileUpload();

  const originalImage = images.filter((img) => img.isOriginal)[0] || null;

  const handleSubmit = () => {
    uploadBannerImage({
      variables: { id, image: files[0] },
      refetchQueries: [GetBannerImagesDocument],
    }).then(() => {
      clearAllFiles();
    });
  };

  if (loading) {
    return (
      <div className="flex">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <>
      {originalImage && (
        <div className="row row_hcenter">
          <div className="col-xs-12">
            <img
              height={250}
              src={`${MEDIA_SERVER_URL}/${originalImage.url}`}
            />
          </div>
        </div>
      )}
      {files.length === 0 && (
        <div className="row row_hcenter">
          <div className="col-xs-12">
            <span
              onClick={() => inputRef.current?.click()}
              className="btn btn_outline"
            >
              <Trans path="banners.views.editImages.btn.upload" />
            </span>
          </div>
        </div>
      )}
      {files.length === 1 && (
        <div className="row row_vcenter row_haround">
          <div className="col-xs-6">
            {files.map((file, index) => {
              return (
                <span>
                  {file.name} {sizeOf(file.size)}
                </span>
              );
            })}
          </div>
          <div className="col-xs-6">
            <span className="btn btn_outline" onClick={() => clearAllFiles()}>
              <Trans path="banners.views.editImages.btn.clear" />
            </span>
            <span className="btn btn_primary" onClick={() => handleSubmit()}>
              <Trans path="banners.views.editImages.btn.submit" />
            </span>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          setFiles(e);
          // inputRef.current.value = null;
        }}
      />
    </>
  );
};

export const GeneratedImages: React.FC<{ images: BannerImage[] }> = ({
  images,
}) => {
  const grouped = useMemo(
    () =>
      groupBy(
        images.filter((img) => !img.isOriginal),
        (img) => img.type,
      ),
    [images],
  );

  return (
    <>
      <ul className="list list_inline">
        {Object.entries(grouped).map(([group, values]) => {
          return (
            <div className="row">
              <div className="col-xs-12">
                <strong key={group}>{group}</strong>
                <ul className="list list_inline">
                  {values.map((image) => {
                    return (
                      <li key={image.id}>
                        <a href={`${MEDIA_SERVER_URL}/${image.url}`}>
                          {image.width}x{image.height}px{" "}
                          {sizeOf(image.totalBytes)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export const EditImages: React.FC<Props> = ({ id, onClose }) => {
  const { gettext } = useLocaleContext();
  const { data, loading } = useGetBannerImagesQuery({ variables: { id } });

  return (
    <ModalContainer
      raw={true}
      close={() => onClose()}
      title={`${gettext("banners.views.actions.editImages.title")} - ${data?.banner.name || ""
        }`}
      footerRenderer={() => {
        return <></>;
      }}
    >
      {loading ? (
        <Loader size="l" display="center"></Loader>
      ) : (
        <section className="modal-window__content">
          <MessageBox
            message={gettext("banners.views.editImages.hint.main")}
            fullWidth
          />
          {!data && loading && <Loader size="l" display="center"></Loader>}
          <PreviewAndUploadImage id={id} images={data?.banner.images || []} />
          {data?.banner?.images?.length !== 0 && (
            <div className="row">
              <section className="col_xs-12 ">
                <div className="row">
                  <h3>Wygenerowane obrazy</h3>
                </div>
                <MessageBox
                  message={gettext("banners.views.editImages.hint.generated")}
                  fullWidth
                />
                <GeneratedImages images={data?.banner?.images} />
              </section>
            </div>
          )}
        </section>
      )}
    </ModalContainer>
  );
};
