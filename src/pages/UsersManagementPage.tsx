import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import kycService, { User, KYCApplication, OTPCode } from "@/services/kycService";
import { Tooltip } from "react-tooltip";
import UserModal from "@/components/modal/UserModal";

const UsersManagementPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [kycApplications, setKycApplications] = useState<Map<string, KYCApplication>>(new Map());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [selectedUserOTPs, setSelectedUserOTPs] = useState<OTPCode[]>([]);
  const [loadingOTPs, setLoadingOTPs] = useState(false);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load all users
      const allUsers = await kycService.getAllUsers();
      setUsers(allUsers);

      // Load KYC applications
      const allKyc = await kycService.getAllKYCApplications();
      const kycMap = new Map<string, KYCApplication>();
      allKyc.forEach((kyc: KYCApplication) => {
        kycMap.set(kyc.userId, kyc);
      });
      setKycApplications(kycMap);
    } catch (error) {
      console.error("Error loading users:", error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOTPs = async (userId: string) => {
    if (expandedUserId === userId) {
      // Collapse if already expanded
      setExpandedUserId(null);
      setSelectedUserOTPs([]);
    } else {
      // Expand and load OTPs
      setExpandedUserId(userId);
      setLoadingOTPs(true);
      setSelectedUserOTPs([]);
      try {
        const otps = await kycService.getUserOTPs(userId);
        setSelectedUserOTPs(otps);
      } catch (error) {
        console.error("Error loading OTPs:", error);
        alert("Failed to load OTPs");
      } finally {
        setLoadingOTPs(false);
      }
    }
  };

  // Handle create user
  const handleCreateUser = () => {
    setModalMode("create");
    setSelectedUser(null);
    setShowModal(true);
  };

  // Handle edit user
  const handleEditUser = (user: User) => {
    setModalMode("edit");
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await kycService.deleteUser(userId);
      alert("User deleted successfully!");
      loadData();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  // Handle save user (create or update)
  const handleSaveUser = async (userData: Partial<User>) => {
    try {
      if (modalMode === "create") {
        await kycService.createUser(userData);
        alert("User created successfully!");
      } else if (selectedUser) {
        await kycService.updateUser(selectedUser.id, userData);
        alert("User updated successfully!");
      }
      loadData();
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };

  const filteredUsers = users.filter(user => {
    // Search filter
    const searchMatch = !searchTerm || 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Verification filter
    let verificationMatch = true;
    if (verificationFilter === "verified") {
      const kyc = kycApplications.get(user.id);
      verificationMatch = kyc?.status === "approved";
    } else if (verificationFilter === "unverified") {
      const kyc = kycApplications.get(user.id);
      verificationMatch = !kyc || kyc.status === "rejected";
    } else if (verificationFilter === "pending") {
      const kyc = kycApplications.get(user.id);
      verificationMatch = kyc?.status === "pending" || kyc?.status === "submitted";
    }
    
    return searchMatch && verificationMatch;
  });

  const getKycStatusBadge = (userId: string) => {
    const kyc = kycApplications.get(userId);
    if (!kyc) {
      return <span className="badge bg-secondary">Not Submitted</span>;
    }
    
    const badges = {
      pending: <span className="badge bg-warning">Pending</span>,
      submitted: <span className="badge bg-info">Submitted</span>,
      approved: <span className="badge bg-success">Approved</span>,
      rejected: <span className="badge bg-danger">Rejected</span>
    };
    
    return badges[kyc.status as keyof typeof badges] || <span className="badge bg-secondary">Unknown</span>;
  };

  const formatDate = (dateString: string | any, includeTime = false) => {
    if (!dateString) return "N/A";
    
    try {
      // Handle Firestore Timestamp objects
      if (dateString && typeof dateString === 'object' && 'seconds' in dateString) {
        const date = new Date(dateString.seconds * 1000);
        return includeTime ? date.toLocaleString() : date.toLocaleDateString();
      }
      
      // Handle string dates
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "N/A";
      }
      return includeTime ? date.toLocaleString() : date.toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Tooltip id="user-tooltip" />
      
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h4 className="mb-1"><i className="ti ti-user-star me-2"></i>Users Management</h4>
                  <p className="text-muted mb-0">Manage all users and their KYC verification status</p>
                </div>
                <div className="d-flex gap-2">
                  <button onClick={handleCreateUser} className="btn btn-sm btn-success">
                    <i className="ti ti-user-plus me-1"></i>Create User
                  </button>
                  <button onClick={loadData} className="btn btn-sm btn-primary">
                    <i className="ti ti-refresh me-1"></i>Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-sm rounded-circle bg-primary bg-soft text-primary">
                    <i className="ti ti-users" style={{ fontSize: "24px" }}></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-0">{users.length}</h5>
                  <p className="text-muted mb-0 small">Total Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-sm rounded-circle bg-success bg-soft text-success">
                    <i className="ti ti-circle-check" style={{ fontSize: "24px" }}></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-0">
                    {Array.from(kycApplications.values()).filter(k => k.status === "approved").length}
                  </h5>
                  <p className="text-muted mb-0 small">Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-sm rounded-circle bg-warning bg-soft text-warning">
                    <i className="ti ti-clock" style={{ fontSize: "24px" }}></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-0">
                    {Array.from(kycApplications.values()).filter(k => k.status === "pending" || k.status === "submitted").length}
                  </h5>
                  <p className="text-muted mb-0 small">Pending KYC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-sm rounded-circle bg-danger bg-soft text-danger">
                    <i className="ti ti-ban" style={{ fontSize: "24px" }}></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-0">
                    {users.filter(u => u.isBlocked).length}
                  </h5>
                  <p className="text-muted mb-0 small">Rejected Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small">Search</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small">KYC Verification</label>
                  <select 
                    className="form-select"
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="verified">Approved</option>
                    <option value="pending">Pending KYC</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>KYC Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          <i className="ti ti-users-off" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
                          <p className="text-muted mt-2 mb-0">No users found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <>
                          <tr key={user.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 me-3">
                                  {(() => {
                                    const avatarUrl = user.avatar || user.photoUrl;
                                    const hasAvatar = avatarUrl && avatarUrl !== 'null' && avatarUrl.trim() !== '';
                                    
                                    return hasAvatar ? (
                                      <img 
                                        src={avatarUrl}
                                        alt={user.fullName}
                                        className="rounded-circle"
                                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                        onError={(e) => {
                                          // Hide broken image and show fallback
                                          (e.target as HTMLImageElement).style.display = 'none';
                                          const parent = (e.target as HTMLImageElement).parentElement;
                                          if (parent) {
                                            parent.innerHTML = `<div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><span>${user.fullName?.charAt(0) || "U"}</span></div>`;
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div 
                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                        style={{ width: "40px", height: "40px" }}
                                      >
                                        <span>{user.fullName?.charAt(0) || "U"}</span>
                                      </div>
                                    );
                                  })()}
                                </div>
                                <div>
                                  <div className="fw-semibold">{user.fullName}</div>
                                  <small className="text-muted">{user.id}</small>
                                </div>
                              </div>
                            </td>
                            <td>{user.email}</td>
                            <td>
                              {user.city && user.country ? (
                                <small>{user.city}, {user.country}</small>
                              ) : (
                                <small className="text-muted">Not provided</small>
                              )}
                            </td>
                            <td>{getKycStatusBadge(user.id)}</td>
                            <td>
                              <small>{formatDate(user.createdAt)}</small>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => navigate(`/user-details/${user.id}`)}
                                  data-tooltip-id="user-tooltip"
                                  data-tooltip-content="View Details"
                                >
                                  <i className="ti ti-eye"></i>
                                </button>
                                <button 
                                  className={`btn btn-sm ${expandedUserId === user.id ? 'btn-info' : 'btn-outline-info'}`}
                                  onClick={() => handleToggleOTPs(user.id)}
                                  data-tooltip-id="user-tooltip"
                                  data-tooltip-content={expandedUserId === user.id ? "Hide OTPs" : "View OTPs"}
                                >
                                  <i className={`ti ${expandedUserId === user.id ? 'ti-chevron-up' : 'ti-mail'}`}></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-warning"
                                  onClick={() => handleEditUser(user)}
                                  data-tooltip-id="user-tooltip"
                                  data-tooltip-content="Edit User"
                                >
                                  <i className="ti ti-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteUser(user.id, user.fullName)}
                                  data-tooltip-id="user-tooltip"
                                  data-tooltip-content="Delete User"
                                >
                                  <i className="ti ti-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                          {expandedUserId === user.id && (
                            <tr>
                              <td colSpan={6} style={{ backgroundColor: '#f8f9fa', padding: 0 }}>
                                <div className="p-4" style={{ 
                                  animation: 'slideDown 0.3s ease-out',
                                  borderLeft: '4px solid #0d6efd'
                                }}>
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="mb-0">
                                      <i className="ti ti-mail me-2"></i>
                                      OTP Codes for {user.fullName}
                                    </h6>
                                    <button 
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => setExpandedUserId(null)}
                                    >
                                      <i className="ti ti-x"></i>
                                    </button>
                                  </div>
                                  
                                  {loadingOTPs ? (
                                    <div className="text-center py-4">
                                      <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                      </div>
                                    </div>
                                  ) : selectedUserOTPs.length === 0 ? (
                                    <div className="text-center py-4">
                                      <i className="ti ti-mail-off" style={{ fontSize: "2rem", opacity: 0.3 }}></i>
                                      <p className="text-muted mt-2 mb-0 small">No OTP codes found for this user</p>
                                    </div>
                                  ) : (
                                    <div className="table-responsive">
                                      <table className="table table-sm table-hover mb-0">
                                        <thead>
                                          <tr>
                                            <th>OTP Code</th>
                                            <th>Type</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Created</th>
                                            <th>Expires</th>
                                            <th>Used At</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {selectedUserOTPs.map((otp) => (
                                            <tr key={otp.id}>
                                              <td>
                                                <code className="fs-6 fw-bold text-primary">{otp.otp}</code>
                                              </td>
                                              <td>
                                                <span className="badge bg-info text-capitalize">
                                                  {otp.type.replace(/_/g, ' ')}
                                                </span>
                                              </td>
                                              <td><small>{otp.email}</small></td>
                                              <td>
                                                {otp.used ? (
                                                  <span className="badge bg-success">Used</span>
                                                ) : new Date(otp.expiresAt?.seconds * 1000) < new Date() ? (
                                                  <span className="badge bg-danger">Expired</span>
                                                ) : (
                                                  <span className="badge bg-warning">Active</span>
                                                )}
                                              </td>
                                              <td>
                                                <small>{formatDate(otp.createdAt, true)}</small>
                                              </td>
                                              <td>
                                                <small>{formatDate(otp.expiresAt, true)}</small>
                                              </td>
                                              <td>
                                                <small>{otp.usedAt ? formatDate(otp.usedAt, true) : '-'}</small>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <UserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveUser}
        user={selectedUser}
        mode={modalMode}
      />

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UsersManagementPage;
