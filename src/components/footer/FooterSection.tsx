type Props = {
  footerStyle?: string;
};
const FooterSection = ({ footerStyle }: Props) => {
  return (
    <footer className={`footer-area ${footerStyle ? footerStyle : ""}`}>
      <div className="copywrite-text px-4">
        <p>
          Copyright &copy; {new Date().getFullYear()} all rights reserved by{" "}
          <a href="#">CrowdWave</a>
        </p>
      </div>
    </footer>
  );
};
export default FooterSection;
