import BulkActions from "../utils/dropdowns/BulkActions";
import CategoryList from "../utils/dropdowns/CategoryList";
import EmployeeLength from "../utils/dropdowns/EmployeeLength";
import ProductStock from "../utils/dropdowns/ProductStock";
import ProductType from "../utils/dropdowns/ProductType";

const CustomizedTable = () => {
  return (
    <div className="col-12">
      <div className="">
        <div className="border-bottom pb-2 fw-bold text-dark mb-4 card-header">
          Customized Data Table
        </div>
        <div className="card-body">
          <div className="table-filter-option">
            <div className="row g-3">
              <div className="col-xl-9 col-md-8">
                <div className="row g-3">
                  <div className="col">
                    <form className="row g-2">
                      <div className="col">
                        <BulkActions />
                      </div>
                      <div className="col">
                        <button className="btn btn-sm btn-primary w-100 h-100">
                          Apply
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col">
                    <CategoryList />
                  </div>
                  <div className="col">
                    <ProductType />
                  </div>
                  <div className="col">
                    <ProductStock />
                  </div>
                  <div className="col">
                    <button className="btn btn-sm btn-primary h-100">
                      <i className="fa-light fa-filter"></i>
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 d-flex justify-content-between align-items-end">
                <div className="tableSearch" id="tableSearch"></div>
                <div id="productTableLength">
                  <EmployeeLength />
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table
              className="table table-dashed table-hover digi-dataTable all-product-table table-striped"
              id="allProductTable"
            >
              <thead>
                <tr>
                  <th className="no-sort">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="markAllProduct"
                      />
                    </div>
                  </th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Rating</th>
                  <th>Published</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td>
                    <div className="table-product-card">
                      <div className="part-img">
                        <img src="./img/bg-img/product-img-1.jpg" alt="Image" />
                      </div>
                      <div className="part-txt">
                        <span className="product-name">
                          A4TECH BH300 Bluetooth Wireless Headset
                        </span>
                        <span className="product-category">
                          Category: electronics/music
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>CSJ0158</td>
                  <td>12</td>
                  <td>$560</td>
                  <td>256</td>
                  <td>
                    <div className="rating">
                      <div className="star">
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star"></i>
                      </div>
                      <div className="rating-amount">(42)</div>
                    </div>
                  </td>
                  <td>12/24/2023 01:05 PM</td>
                  <td>
                    <div className="btn-box">
                      <button>
                        <i className="fa-light fa-eye"></i>
                      </button>
                      <button>
                        <i className="fa-light fa-pen"></i>
                      </button>
                      <button>
                        <i className="fa-light fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td>
                    <div className="table-product-card">
                      <div className="part-img">
                        <img src="./img/bg-img/product-img-4.jpg" alt="Image" />
                      </div>
                      <div className="part-txt">
                        <span className="product-name">Premium Blend Tea</span>
                        <span className="product-category">
                          Category: Drink/tea
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>CSJ0158</td>
                  <td>22</td>
                  <td>$160</td>
                  <td>756</td>
                  <td>
                    <div className="rating">
                      <div className="star">
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star"></i>
                      </div>
                      <div className="rating-amount">(380)</div>
                    </div>
                  </td>
                  <td>10/21/2022 01:05 PM</td>
                  <td>
                    <div className="btn-box">
                      <button>
                        <i className="fa-light fa-eye"></i>
                      </button>
                      <button>
                        <i className="fa-light fa-pen"></i>
                      </button>
                      <button>
                        <i className="fa-light fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td>
                    <div className="table-product-card">
                      <div className="part-img">
                        <img src="./img/bg-img/product-img-3.jpg" alt="Image" />
                      </div>
                      <div className="part-txt">
                        <span className="product-name">
                          Chris Adams Body Spray Classic Denim
                        </span>
                        <span className="product-category">
                          Category: Fashion/perfume
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>CSJ0158</td>
                  <td>12</td>
                  <td>$560</td>
                  <td>256</td>
                  <td>
                    <div className="rating">
                      <div className="star">
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star starred"></i>
                        <i className="fa-sharp fa-solid fa-star"></i>
                      </div>
                      <div className="rating-amount">(42)</div>
                    </div>
                  </td>
                  <td>12/24/2023 01:05 PM</td>
                  <td>
                    <div className="btn-box">
                      <button>
                        <i className="fa-light fa-eye"></i>
                      </button>
                      <button>
                        <i className="fa-light fa-pen"></i>
                      </button>
                      <button>
                        <i className="fa-light fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="table-bottom-control"></div>
        </div>
      </div>
    </div>
  );
};
export default CustomizedTable;
