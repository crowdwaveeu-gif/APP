import { useState, useEffect } from "react";
import { User } from "@/services/kycService";

interface UserModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (userData: Partial<User>) => Promise<void>;
  user?: User | null;
  mode: "create" | "edit";
}

const UserModal = ({ show, onClose, onSave, user, mode }: UserModalProps) => {
  const [formData, setFormData] = useState<Partial<User>>({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    country: "",
    address: "",
    dateOfBirth: "",
    role: "sender",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (show && user && mode === "edit") {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        city: user.city || "",
        country: user.country || "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || "",
        role: user.role || "sender",
        avatar: user.avatar || "",
      });
    } else if (show && mode === "create") {
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        city: "",
        country: "",
        address: "",
        dateOfBirth: "",
        role: "sender",
        avatar: "",
      });
    }
    setErrors({});
  }, [show, user, mode]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (mode === "create" && !formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (!show) return null;

  return (
    <>
      <div 
        className="modal fade show" 
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        onClick={onClose}
      >
        <div 
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{ marginTop: "80px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className={`ti ${mode === "create" ? "ti-user-plus" : "ti-edit"} me-2`}></i>
                {mode === "create" ? "Create New User" : "Edit User"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={loading}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      disabled={loading}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      disabled={loading || mode === "edit"}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                    {mode === "edit" && (
                      <small className="text-muted">Email cannot be changed</small>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      disabled={loading}
                    />
                  </div>

                  {/* Role - Only show in create mode */}
                  {mode === "create" && (
                    <div className="col-md-6">
                      <label className="form-label">
                        Role <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${errors.role ? "is-invalid" : ""}`}
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="sender">Sender</option>
                        <option value="traveler">Traveler</option>
                        <option value="admin">Admin</option>
                      </select>
                      {errors.role && (
                        <div className="invalid-feedback">{errors.role}</div>
                      )}
                    </div>
                  )}

                  {/* Date of Birth */}
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                      value={formData.dateOfBirth?.split('T')[0] || ""}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  {/* City */}
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      disabled={loading}
                    />
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter country"
                      disabled={loading}
                    />
                  </div>

                  {/* Address */}
                  <div className={mode === "create" ? "col-md-6" : "col-12"}>
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      disabled={loading}
                    />
                  </div>

                  {/* Avatar URL - Only show in create mode */}
                  {mode === "create" && (
                    <div className="col-12">
                      <label className="form-label">Avatar URL</label>
                      <input
                        type="url"
                        className="form-control"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        placeholder="Enter avatar image URL"
                        disabled={loading}
                      />
                      {formData.avatar && (
                        <div className="mt-2">
                          <img
                            src={formData.avatar}
                            alt="Avatar preview"
                            className="rounded-circle"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  <i className="ti ti-x me-1"></i>Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="ti ti-check me-1"></i>
                      {mode === "create" ? "Create User" : "Save Changes"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
