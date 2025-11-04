const EmailTemplateFooter = () => {
  return (
    <div className="mail-footer">
      <div className="logo">
        <img src="/logo.png" alt="CrowdWave Logo" />
      </div>
      <div className="footer-social">
        <a href="#" title="Facebook" target="_blank">
          <img src="/img/bg-img/facebook.png" alt="facebook" />
        </a>
        <a href="#" title="Instagram" target="_blank">
          <img src="/img/bg-img/instagram.png" alt="instagram" />
        </a>
        <a href="#" title="Twitter" target="_blank">
          <img src="/img/bg-img/twitter.png" alt="twitter" />
        </a>
        <a href="#" title="Linkedin" target="_blank">
          <img src="/img/bg-img/linkedin.png" alt="linkedin" />
        </a>
      </div>
    </div>
  );
};
export default EmailTemplateFooter;
