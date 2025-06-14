// src/components/common/ProductSection.tsx
import ContentState from "../common/ContentStateProps";
import ProductListLayout from "../../layouts/ProductListLayout";
import ProductList from "../common/ProductList";
import { Product } from "../../types/Product";

interface ProductSectionProps {
  isLoading: boolean;
  error?: string | null;
  products: Product[];
  ProductCardComponent: React.ComponentType<any>;
  cardProps?: Record<string, any>;
  layoutProps?: Record<string, any>;
}

//componente destinado a crear seccion grid de productos
const ProductSection = ({
  isLoading,
  error,
  products,
  ProductCardComponent,
  cardProps = {},
  layoutProps = {},
}: ProductSectionProps) => (
  <ContentState isLoading={isLoading} error={error}>
    <ProductListLayout {...layoutProps}>
      <ProductList
        products={products}
        ProductCardComponent={ProductCardComponent}
        cardProps={cardProps}
      />
    </ProductListLayout>
  </ContentState>
);

export default ProductSection;