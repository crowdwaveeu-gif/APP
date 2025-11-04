import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import OTPModal from "../auth/OTPModal";
import StaticContentModal from "../modal/StaticContentModal";
import { StaticContentType } from "../../types/staticContent";

type Props = {
  register?: boolean;
};

const AuthForm = ({ register }: Props) => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [showStaticContent, setShowStaticContent] = useState<{
    isOpen: boolean;
    type: StaticContentType | null;
  }>({ isOpen: false, type: null });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await authService.initiateLogin(email, password);
      
      if (result.success) {
        // Show OTP modal
        setShowOTPModal(true);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await authService.verifyOTPAndLogin(email, password, otp);
      
      if (result.success) {
        // Navigate to dashboard on successful login
        navigate("/dashboard");
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
      throw err; // Propagate error to modal
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const result = await authService.initiateLogin(email, password);
    if (!result.success) {
      throw new Error(result.message);
    }
  };

  const handleCancelOTP = () => {
    setShowOTPModal(false);
    setError("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-4">
          <span className="input-group-text">
            <i className="fa-regular fa-user"></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder={register ? "Full Name" : "Email address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        {register && (
          <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
        )}
        <div className="input-group mb-4">
          <span className="input-group-text">
            <i className="fa-regular fa-lock"></i>
          </span>
          <input
            type={passwordVisible ? "text" : "password"}
            className="form-control rounded-end"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <a
            role="button"
            className="password-show"
            onClick={togglePasswordVisibility}
          >
            <i className="fa-duotone fa-eye"></i>
          </a>
        </div>
        
        {error && (
          <div className="alert alert-danger py-2 mb-3" role="alert">
            <i className="fa-solid fa-circle-exclamation me-2"></i>
            {error}
          </div>
        )}

        <div className={`d-flex ${register ? "justify-content-center" : "justify-content-end"} align-items-center mb-4`}>
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
                I agree to the{" "}
                <a 
                  href="#" 
                  className="text-white text-decoration-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowStaticContent({ isOpen: true, type: 'terms_of_service' });
                  }}
                >
                  Terms of Service
                </a>
                {" "}and{" "}
                <a 
                  href="#" 
                  className="text-white text-decoration-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowStaticContent({ isOpen: true, type: 'privacy_policy' });
                  }}
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          ) : (
            <Link to="/reset-password" className="text-white fs-14">
              Forgot Password?
            </Link>
          )}
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100 login-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {showOTPModal && (
        <OTPModal
          email={email}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          onCancel={handleCancelOTP}
          isLoading={isLoading}
        />
      )}
      
      {showStaticContent.isOpen && showStaticContent.type && (
        <StaticContentModal
          type={showStaticContent.type}
          isOpen={showStaticContent.isOpen}
          onClose={() => setShowStaticContent({ isOpen: false, type: null })}
        />
      )}
    </>
  );
};
export default AuthForm;
