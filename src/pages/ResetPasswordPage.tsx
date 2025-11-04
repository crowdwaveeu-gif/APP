import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthTopLogo from "../components/auth/AuthTopLogo";
import { useAppSelector } from "../redux/hooks";
import { authService } from "../services/authService";

const ResetPasswordPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await authService.initiatePasswordReset(email);
      
      if (result.success) {
        setSuccess(result.message);
        setStep('otp');
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    
    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await authService.verifyOTPAndResetPassword(email, otp, newPassword);
      
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || "Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    
    try {
      const result = await authService.initiatePasswordReset(email);
      if (result.success) {
        setSuccess("OTP resent successfully!");
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel">
        <div className="login-body">
          <div className="top d-flex justify-content-between align-items-center">
            <AuthTopLogo />
          </div>
          <div className="bottom">
            <h3 className="panel-title">Reset Password</h3>
            
            {step === 'email' ? (
              <form onSubmit={handleSendOTP}>
                <div className="input-group mb-4">
                  <span className="input-group-text">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                {error && (
                  <div className="alert alert-danger py-2 mb-3" role="alert">
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success py-2 mb-3" role="alert">
                    <i className="fa-solid fa-circle-check me-2"></i>
                    {success}
                  </div>
                )}
                
                <button 
                  className="btn btn-primary w-100 login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Sending OTP...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword}>
                <p className="text-white-50 mb-3">
                  Enter the OTP sent to <strong>{email}</strong>
                </p>
                
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    disabled={isLoading}
                    maxLength={6}
                  />
                </div>
                
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <a
                    className="input-group-text"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className={`fa-duotone ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </a>
                </div>
                
                <div className="input-group mb-4">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                {error && (
                  <div className="alert alert-danger py-2 mb-3" role="alert">
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success py-2 mb-3" role="alert">
                    <i className="fa-solid fa-circle-check me-2"></i>
                    {success}
                  </div>
                )}
                
                <button 
                  className="btn btn-primary w-100 login-btn mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Resetting Password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
                
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link text-white text-decoration-none"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                  >
                    Didn't receive OTP? Resend
                  </button>
                </div>
                
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link text-white text-decoration-none"
                    onClick={() => {
                      setStep('email');
                      setOTP("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setError("");
                      setSuccess("");
                    }}
                    disabled={isLoading}
                  >
                    Change Email
                  </button>
                </div>
              </form>
            )}
            
            <div className="other-option">
              <p className="mb-0">
                Remember the password? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ResetPasswordPage;
