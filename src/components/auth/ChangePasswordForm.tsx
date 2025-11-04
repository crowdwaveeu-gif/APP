import { useState } from "react";
import { authService } from "../../services/authService";
import { useAppSelector } from "../../redux/hooks";

const ChangePasswordForm = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      setError("Password must contain uppercase, lowercase, number, and special character");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.changePassword(currentPassword, newPassword);
      
      if (result.success) {
        setSuccess(result.message);
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`card ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="card-body">
        <h5 className="card-title mb-4">
          <i className="fa-solid fa-key me-2"></i>
          Change Password
        </h5>

        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-4">
            <label htmlFor="currentPassword" className="form-label">
              Current Password <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-regular fa-lock"></i>
              </span>
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <i className={`fa-duotone fa-${showCurrentPassword ? 'eye-slash' : 'eye'}`}></i>
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="form-label">
              New Password <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-regular fa-lock"></i>
              </span>
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <i className={`fa-duotone fa-${showNewPassword ? 'eye-slash' : 'eye'}`}></i>
              </button>
            </div>
            <small className="text-muted">
              Must be at least 8 characters with uppercase, lowercase, number, and special character
            </small>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-regular fa-lock"></i>
              </span>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fa-duotone fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="alert alert-success" role="alert">
              <i className="fa-solid fa-circle-check me-2"></i>
              {success}
            </div>
          )}

          {/* Submit Button */}
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Changing Password...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check me-2"></i>
                  Change Password
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setError("");
                setSuccess("");
              }}
              disabled={isLoading}
            >
              <i className="fa-solid fa-times me-2"></i>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
