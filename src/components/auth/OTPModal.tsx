import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";

interface OTPModalProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const OTPModal = ({ email, onVerify, onResend, onCancel, isLoading = false }: OTPModalProps) => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [otp, setOTP] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isResending, setIsResending] = useState<boolean>(false);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    if (value.length <= 6) {
      setOTP(value);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      await onVerify(otp);
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");
    setOTP("");
    
    try {
      await onResend();
    } catch (err: any) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${darkMode ? "dark-theme" : "light-theme"}`}>
          <div className="modal-header border-bottom">
            <h5 className="modal-title">
              <i className="fa-solid fa-shield-check me-2"></i>
              Verify OTP
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              disabled={isLoading}
            ></button>
          </div>
          <div className="modal-body">
            <p className="text-muted mb-4">
              We've sent a 6-digit verification code to <strong>{email}</strong>
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="otp-input" className="form-label">
                  Enter OTP Code
                </label>
                <input
                  id="otp-input"
                  type="text"
                  className="form-control form-control-lg text-center"
                  placeholder="000000"
                  value={otp}
                  onChange={handleOTPChange}
                  maxLength={6}
                  disabled={isLoading}
                  autoFocus
                  style={{ 
                    letterSpacing: '0.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}
                />
                {error && (
                  <div className="text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation me-1"></i>
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check me-2"></i>
                    Verify OTP
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-muted mb-2">Didn't receive the code?</p>
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={handleResend}
                  disabled={isLoading || isResending}
                >
                  {isResending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Resending...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-rotate me-2"></i>
                      Resend OTP
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
