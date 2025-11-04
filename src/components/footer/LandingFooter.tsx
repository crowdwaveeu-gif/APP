const LandingFooter = () => {
  return (
    <>
      <div className="mt-4"></div>
      <div className="container-fluid px-0 mt-auto">
        <footer className="footer-area">
          <div className="copywrite-text px-4">
            <p>
              Copyright &copy; {new Date().getFullYear()} all rights reserved by{" "}
              <a href="#">Webdesh</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
export default LandingFooter;
