import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";
import userEvent from "@testing-library/user-event";

describe(`${Modal.name}`, () => {
  describe("when isVisible is true", () => {
    it("should render the modal", () => {
      render(<Modal isVisible={true} onDismiss={() => {}} title="" />);

      expect(screen.getByRole("dialog")).toHaveClass(
        "Modal_Container-div--visible"
      );
    });

    it('should render the title when "title" is provided', () => {
      const title = "Modal title";

      render(<Modal isVisible={true} onDismiss={() => {}} title={title} />);

      expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('should render the children when "children" is provided', () => {
      const children = "Modal children";

      render(
        <Modal isVisible={true} onDismiss={() => {}} title="">
          {children}
        </Modal>
      );

      expect(screen.getByText(children)).toBeInTheDocument();
    });

    it("should call onDismiss when close button is clicked", () => {
      const onDismiss = jest.fn();

      render(<Modal isVisible={true} onDismiss={onDismiss} title="" />);
      const button = screen.getByRole("button", { name: "close" });
      userEvent.click(button);

      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe("when isVisible is false", () => {
    it("should not render the modal", () => {
      render(<Modal isVisible={false} onDismiss={() => {}} title="" />);

      expect(screen.getByRole("dialog")).not.toHaveClass(
        "Modal_Container-div--visible"
      );
    });
  });
});
