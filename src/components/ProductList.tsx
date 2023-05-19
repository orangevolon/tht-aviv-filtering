import { FC } from "react";
import { Product } from "../types";

const ProductListItem = ({ product }: { product: Product }) => (
  <tr className="Products_List-tr">
    <td className="Products_List-td">{product.name}</td>
    <td className="Products_List-td">{product.color}</td>
    <td className="Products_List-td">{product.size}</td>
    <td className="Products_List-td">{product.price}</td>
  </tr>
);

export interface ProductListProps {
  products: Product[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  const getTableBody = () => {
    if (!products.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={4}>No products found!</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </tbody>
    );
  };

  return (
    <table className="Products_List-table">
      <thead>
        <tr>
          <th className="Products_List-th">Name</th>
          <th className="Products_List-th">Color</th>
          <th className="Products_List-th">Size</th>
          <th className="Products_List-th">Price</th>
        </tr>
      </thead>
      {getTableBody()}
    </table>
  );
};
