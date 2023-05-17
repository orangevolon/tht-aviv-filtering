import { FC, PropsWithChildren } from "react";

export interface ModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  title?: string;
}

const CLOSE_ICON_CHARACTER = "╳";

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  title,
  isVisible,
  onDismiss,
  children,
}) => {
  return (
    <div className={getModalClassName(isVisible)}>
      <div className="Modal_Backdrop-div" onClick={onDismiss} />
      <section role="dialog" className="Modal-section">
        <header className="Modal-header">
          <span className="Modal-title">{title}</span>
          <button className="Modal-close" onClick={onDismiss}>
            {CLOSE_ICON_CHARACTER}
          </button>
        </header>
        <main className="Modal-main">{children}</main>
      </section>
    </div>
  );
};

const getModalClassName = (isVisible: boolean) => {
  const baseClass = "Modal_Container-div";

  if (isVisible) {
    return `${baseClass} Modal_Container-div--visible`;
  }

  return baseClass;
};
