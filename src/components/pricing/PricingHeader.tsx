interface Props {
  plans: {
    title: string;
    price: number;
  }[];
}
const PricingHeader = ({ plans }: Props) => {
  return (
    <>
      {plans.map((plan, index) => (
        <th key={index}>
          <div className="table-top">
            <h3>{plan.title}</h3>
            <h2 className="price">
              $<span className="amount">{plan.price}</span>{" "}
              <span className="type">Monthly</span>
            </h2>
            <p>For your essential business needs.</p>
            <a href="#" className="btn btn-primary">
              Select
            </a>
          </div>
        </th>
      ))}
    </>
  );
};
export default PricingHeader;
