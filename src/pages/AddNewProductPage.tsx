import BreadcrumbSection from "../components/breadcrumb/BreadcrumbSection";
import ProductDataForm from "../components/forms/ProductDataForm";
import ProductsDescriptionTextbox from "../components/forms/ProductsDescriptionTextbox";
import ProductTitleForm from "../components/forms/ProductTitleForm";
import SeoDataForm from "../components/forms/SeoDataForm";
import ProductCategorySection from "../components/product/ProductCategorySection";
import ProductTagSection from "../components/product/ProductTagSection";
import PublishedProduct from "../components/product/PublishedProduct";

const AddNewProductPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add New Product" link="/all-product" />
      </div>

      <div className="col-xxl-9 col-lg-8">
        <ProductTitleForm />
        <ProductsDescriptionTextbox />

        <div className="panel mb-4">
          <ProductDataForm />
        </div>
        <SeoDataForm />
      </div>

      <div className="col-xxl-3 col-lg-4 add-product-sidebar">
        <div className="mb-4 w-100">
          <a href="#" className="btn btn-primary d-block">
            Preview Changed
          </a>
        </div>
        <PublishedProduct />
        <ProductCategorySection />
        <ProductTagSection />
      </div>
    </div>
  );
};
export default AddNewProductPage;
