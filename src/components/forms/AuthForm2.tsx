import { Link } from "react-router-dom";

type Props = {
  register?: boolean;
};
const AuthForm2 = ({ register }: Props) => {
  return (
    <form>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder={register ? "Username" : "Username or email address"}
        />
        <span className="input-group-text">
          <i className="fa-regular fa-user"></i>
        </span>
      </div>
      {register && (
        <div className="input-group mb-4">
          <input type="email" className="form-control" placeholder="Email" />
          <span className="input-group-text">
            <i className="fa-regular fa-envelope"></i>
          </span>
        </div>
      )}
      <div className="input-group mb-4">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
        <span className="input-group-text">
          <i className="fa-regular fa-lock"></i>
        </span>
      </div>
      {register && (
        <div className="input-group mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
          />
          <span className="input-group-text">
            <i className="fa-regular fa-lock"></i>
          </span>
        </div>
      )}
      <div
        className={`d-flex ${
          register ? "justify-content-center" : "justify-content-between"
        } align-items-center mb-4`}
      >
        {register ? (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="loginCheckbox"
            />
            <label
              className="form-check-label text-white"
              htmlFor="loginCheckbox"
            >
              I agree{" "}
              <a href="#" className="text-white text-decoration-underline">
                Terms & Policy
              </a>
            </label>
          </div>
        ) : (
          <>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="loginCheckbox"
              />
              <label
                className="form-check-label text-white"
                htmlFor="loginCheckbox"
              >
                Remember Me
              </label>
            </div>
            <Link to="/reset-password" className="text-white fs-14">
              Forgot Password?
            </Link>
          </>
        )}
      </div>
      <button className="btn btn-primary w-100 login-btn">Login</button>
    </form>
  );
};
export default AuthForm2;
