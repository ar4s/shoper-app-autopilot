import React, {
  Children,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { JsxElement } from "typescript";

interface Props {
  close: VoidFunction;
  title: string;
  children: ReactElement;
  footerRenderer?: () => ReactElement;
  raw?: boolean;
  size?: "small";
}

export const ModalContainer: React.FC<Props> = ({
  close,
  title,
  children,
  footerRenderer,
  raw,
  size,
}) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#app-modal");
    setMounted(true);
  }, []);

  if (!mounted || !ref.current) return null;

  const modalSize = size === "small" ? "modal-window_small" : "";

  return ReactDOM.createPortal(
    <>
      <div className="modal-window-wrapper modal-window-wrapper">
        <div className={`modal-window modal-window_visible ${modalSize}`}>
          <div className="modal-window__body">
            <header className="modal-window__header">
              <div className="modal-window__title">
                <h3>{title}</h3>
              </div>

              <div className="modal-window__header-actions">
                <span
                  onClick={close}
                  className="pointer icon icon-close"
                ></span>
              </div>
            </header>

            {raw ? (
              children
            ) : (
              <>
                <section className="modal-window__content">{children}</section>

                <footer className="modal-window__footer">
                  {footerRenderer ? (
                    footerRenderer()
                  ) : (
                    <div className="flex justify-end">
                      <span onClick={close} className="btn btn_bg btn_s">
                        OK
                      </span>
                    </div>
                  )}
                </footer>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="modal-window-mask modal-window-mask_visible"></div>
    </>,
    ref.current,
  );
};
