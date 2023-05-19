import { render, screen, within } from "@testing-library/react";
import { buildProducts } from "../fixtures/products";
import { ProductList } from "./ProductList";

describe(`${ProductList.name}`, () => {
  it("should render the product rows in correct order", () => {
    const products = buildProducts(3);

    render(<ProductList products={products} />);

    const rows = screen.getAllByRole("row");

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const row = rows[i + 1];

      within(row).getByText(product.name);
      within(row).getByText(product.price.toString());
      within(row).getByText(product.color);
      within(row).getByText(product.size);
    }
  });

  it("should render a message when there are no products", () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText("No products found!")).toBeInTheDocument();
  });
});
