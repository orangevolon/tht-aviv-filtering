import { FC } from "react";
import { Modal } from "./Modal";

export interface FiltersModalProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const FiltersModal: FC<FiltersModalProps> = ({
  isVisible,
  onDismiss,
}) => {
  return (
    <Modal title="Filters" isVisible={isVisible} onDismiss={onDismiss}>
      Filters should go here
    </Modal>
  );
};
