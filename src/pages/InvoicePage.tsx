import OrderStatus from "../components/utils/dropdowns/OrderStatus";
import PaymentStatus from "../components/utils/dropdowns/PaymentStatus";

const InvoicePage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <div className="panel-body invoice" id="invoiceBody">
            <div className="invoice-header mb-4">
              <div className="row g-3 justify-content-between align-items-end">
                <div className="col-xl-4 col-lg-5 col-sm-6">
                  <div className="shop-address">
                    <div className="logo mb-4">
                      <img
                        src="/logo.png"
                        alt="CrowdWave Logo"
                      />
                    </div>
                    <div className="part-txt">
                      <p className="mb-1">
                        House: 17, Road 07, Sector 04, Uttara, Dhaka-1230
                      </p>
                      <p className="mb-1">Email: info@zozba.com</p>
                      <p className="mb-1">Phone: 01792288555</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex gap-xl-4 gap-3 status-row">
                    <div className="w-50">
                      <div className="payment-status">
                        <label className="form-label">Payment Status:</label>
                        <PaymentStatus />
                      </div>
                    </div>
                    <div className="w-50">
                      <div className="Order-status">
                        <label className="form-label">Order Status:</label>
                        <OrderStatus />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="invoice-body">
              <div className="info-card-wrap mb-4">
                <div className="row g-4">
                  <div className="col-lg-4 col-sm-6">
                    <div className="info-card">
                      <h3>Customer Details:</h3>
                      <ul className="p-0">
                        <li>
                          <span>Name:</span> Shaikh Abu Bakkar
                        </li>
                        <li>
                          <span>Email:</span> iamdarda999@gmail.com
                        </li>
                        <li>
                          <span>Phone:</span> +880 1234 567890
                        </li>
                        <li>
                          <span>Address:</span> 90 Tejkunipara, Dhaka - 1202,
                          Bangladesh
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="info-card">
                      <h3>Shipping Address:</h3>
                      <ul className="p-0">
                        <li>
                          <span>Name:</span> Shaikh Abu Bakkar
                        </li>
                        <li>
                          <span>Email:</span> iamdarda999@gmail.com
                        </li>
                        <li>
                          <span>Phone:</span> +880 1234 567890
                        </li>
                        <li>
                          <span>Address:</span> 90 Tejkunipara, Dhaka - 1202,
                          Bangladesh
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="info-card">
                      <h3>Invoice Details:</h3>
                      <ul className="p-0">
                        <li>
                          <span>Invoice No.:</span> 22123101
                        </li>
                        <li>
                          <span>Oder Date:</span> 2022-12-26
                        </li>
                        <li>
                          <span>Total Amount:</span> 282.00
                        </li>
                        <li>
                          <span>Payment Type:</span> cash on delivery
                        </li>
                        <li>
                          <span>Payment Status:</span>{" "}
                          <span className="text-danger">Unpaid</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive mb-4">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Products</th>
                      <th>Qty.</th>
                      <th>Price</th>
                      <th>Shipping Cost</th>
                      <th>Tax</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>Sunnoti kamij with pagri and rumal</td>
                      <td>01</td>
                      <td>$99</td>
                      <td>$09</td>
                      <td>$00</td>
                      <td>$108</td>
                    </tr>
                    <tr>
                      <td>02</td>
                      <td>Sendel with pagri and rumal</td>
                      <td>02</td>
                      <td>$150</td>
                      <td>$10</td>
                      <td>$00</td>
                      <td>$160</td>
                    </tr>
                    <tr>
                      <td>03</td>
                      <td>Smartphone with headphobe</td>
                      <td>03</td>
                      <td>$03</td>
                      <td>$03</td>
                      <td>$00</td>
                      <td>$06</td>
                    </tr>
                    <tr>
                      <td>04</td>
                      <td>Shaikh Abu Bakkar with his mind</td>
                      <td>04</td>
                      <td>$04</td>
                      <td>$04</td>
                      <td>$00</td>
                      <td>$08</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="total-payment-area row justify-content-end mb-4">
                <div className="col-md-4 col-sm-6">
                  <ul>
                    <li className="d-flex justify-content-between">
                      Net Total:<span>282.00</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      Shipping Cost:<span>0</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      Vat:<span>0</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      Total:<span>282.00</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="invoice-note text-center mb-0">
                Please check your parcel carefully.
              </p>
            </div>
          </div>
          <div className="panel-body border-top">
            <div className="btn-box d-flex justify-content-end gap-2">
              <button className="btn btn-sm btn-primary" id="printInvoice">
                <i className="fa-light fa-print me-1"></i>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InvoicePage;
