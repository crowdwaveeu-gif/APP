const BillingsTabPane = () => {
  return (
    <div className="table-responsive pt-4">
      <table className="table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Client</th>
            <th>Due Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#INV-0001</td>
            <td>Hazel Nutt</td>
            <td>9 Aug 2018</td>
            <td>$240</td>
            <td>
              <span className="badge bg-primary px-2">Partially Paid</span>
            </td>
          </tr>
          <tr>
            <td>#INV-0002</td>
            <td>Hazel Nutt</td>
            <td>9 Aug 2018</td>
            <td>$240</td>
            <td>
              <span className="badge bg-success px-2">Paid</span>
            </td>
          </tr>
          <tr>
            <td>#INV-0003</td>
            <td>Hazel Nutt</td>
            <td>9 Aug 2018</td>
            <td>$240</td>
            <td>
              <span className="badge bg-primary px-2">Partially Paid</span>
            </td>
          </tr>
          <tr>
            <td>#INV-0004</td>
            <td>Hazel Nutt</td>
            <td>9 Aug 2018</td>
            <td>$240</td>
            <td>
              <span className="badge bg-success px-2">Paid</span>
            </td>
          </tr>
          <tr>
            <td>#INV-0005</td>
            <td>Hazel Nutt</td>
            <td>9 Aug 2018</td>
            <td>$240</td>
            <td>
              <span className="badge bg-primary px-2">Partially Paid</span>
            </td>
          </tr>
          <tr>
            <td>#INV-0006</td>
            <td>Hazel Nutt</td>
            <td>9 Aug 2018</td>
            <td>$240</td>
            <td>
              <span className="badge bg-success px-2">Paid</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default BillingsTabPane;
