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
    <section role="dialog" className={getModalClassName(isVisible)}>
      <header className="Modal-header">
        <span className="Modal-title">{title}</span>
        <button className="Modal-close" onClick={onDismiss}>
          {CLOSE_ICON_CHARACTER}
        </button>
      </header>
      <main className="Modal-main">{children}</main>
    </section>
  );
};

const getModalClassName = (isVisible: boolean) => {
  const baseClass = "Modal-section";

  if (isVisible) {
    return `${baseClass} Modal-section--visible`;
  }

  return baseClass;
};
