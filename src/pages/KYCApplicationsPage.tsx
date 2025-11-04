import { useEffect, useState } from "react";
import kycService, { KYCApplication, User } from "@/services/kycService";
import { Tooltip } from "react-tooltip";

const KYCApplicationsPage = () => {
  const [applications, setApplications] = useState<KYCApplication[]>([]);
  const [allApplications, setAllApplications] = useState<KYCApplication[]>([]);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);
  const [showRejectForm, setShowRejectForm] = useState<string | null>(null);
  const [viewDocument, setViewDocument] = useState<{ type: string; url: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load all KYC applications first (for counts)
      const allApps = await kycService.getAllKYCApplications();
      setAllApplications(allApps);
      
      // Filter applications based on current filter
      let apps: KYCApplication[];
      if (filter === "all") {
        apps = allApps;
      } else {
        apps = allApps.filter(app => app.status === filter);
      }
      setApplications(apps);

      // Load user data for each application
      const userMap = new Map<string, User>();
      for (const app of apps) {
        const user = await kycService.getUserById(app.userId);
        if (user) {
          userMap.set(app.userId, user);
        }
      }
      setUsers(userMap);
    } catch (error) {
      console.error("Error loading KYC data:", error);
      alert("Failed to load KYC applications");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    if (!confirm("Are you sure you want to approve this KYC application?")) return;
    
    try {
      await kycService.approveKYC(userId, "Admin"); // Replace with actual admin name
      alert("KYC application approved successfully!");
      loadData();
      setExpandedAppId(null);
    } catch (error) {
      console.error("Error approving KYC:", error);
      alert("Failed to approve KYC application");
    }
  };

  const handleReject = async (userId: string) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    
    try {
      await kycService.rejectKYC(userId, rejectionReason, "Admin");
      alert("KYC application rejected");
      setRejectionReason("");
      setShowRejectForm(null);
      setExpandedAppId(null);
      loadData();
    } catch (error) {
      console.error("Error rejecting KYC:", error);
      alert("Failed to reject KYC application");
    }
  };

  const handleToggleDetails = (userId: string) => {
    if (expandedAppId === userId) {
      setExpandedAppId(null);
      setShowRejectForm(null);
    } else {
      setExpandedAppId(userId);
      setShowRejectForm(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: "badge bg-warning",
      submitted: "badge bg-info",
      approved: "badge bg-success",
      rejected: "badge bg-danger"
    };
    return badges[status as keyof typeof badges] || "badge bg-secondary";
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const getStatusCount = (status: string): number => {
    if (status === "all") return allApplications.length;
    return allApplications.filter(app => app.status === status).length;
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
    <div className="row g-4">
      <Tooltip id="kyc-tooltip" />
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <div className="d-flex justify-content-between align-items-center w-100">
              <h5>KYC Applications</h5>
              <button className="btn btn-sm btn-primary" onClick={loadData}>
                <i className="ti ti-refresh me-1"></i>
                Refresh
              </button>
            </div>
          </div>
          
          <div className="panel-body">

            {/* Filter Tabs */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="btn-group btn-group-sm" role="group">
                  <button 
                    className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("all")}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    All ({getStatusCount("all")})
                  </button>
                  <button 
                    className={`btn ${filter === "pending" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("pending")}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Pending ({getStatusCount("pending")})
                  </button>
                  <button 
                    className={`btn ${filter === "submitted" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("submitted")}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Submitted ({getStatusCount("submitted")})
                  </button>
                  <button 
                    className={`btn ${filter === "approved" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("approved")}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Approved ({getStatusCount("approved")})
                  </button>
                  <button 
                    className={`btn ${filter === "rejected" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("rejected")}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Rejected ({getStatusCount("rejected")})
                  </button>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Document Type</th>
                    <th>Status</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        <div className="text-muted">
                          <i className="ti ti-file-off" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
                          <p className="mt-2">No KYC applications found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {applications.map((app) => {
                        const user = users.get(app.userId);
                        const isExpanded = expandedAppId === app.userId;
                        
                        return (
                          <>
                            <tr key={app.userId} className={isExpanded ? 'table-active' : ''}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="me-2">
                                    {(() => {
                                      const avatarUrl = user?.avatar || user?.photoUrl;
                                      const hasAvatar = avatarUrl && avatarUrl !== 'null' && avatarUrl.trim() !== '';
                                      
                                      return hasAvatar ? (
                                        <img 
                                          src={avatarUrl} 
                                          alt={user?.fullName}
                                          className="rounded-circle"
                                          style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            const parent = (e.target as HTMLImageElement).parentElement;
                                            if (parent) {
                                              parent.innerHTML = `<div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><span style="font-size: 16px;">${user?.fullName?.charAt(0) || "U"}</span></div>`;
                                            }
                                          }}
                                        />
                                      ) : (
                                        <div 
                                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                          style={{ width: "40px", height: "40px" }}
                                        >
                                          <span style={{ fontSize: "16px" }}>
                                            {user?.fullName?.charAt(0) || "U"}
                                          </span>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                  <div>
                                    <strong>{app.personalInfo.fullName}</strong>
                                    {user?.email && (
                                      <div className="text-muted small">{user.email}</div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td>{app.document.type}</td>
                              <td>
                                <span className={getStatusBadge(app.status)}>
                                  {app.status.toUpperCase()}
                                </span>
                              </td>
                              <td>
                                <small>{app.personalInfo.phone}</small>
                              </td>
                              <td>
                                <small>{app.personalInfo.address.city}, {app.personalInfo.address.country}</small>
                              </td>
                              <td>
                                <small>{new Date(app.audit.submittedAt).toLocaleDateString()}</small>
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button
                                    className={`btn ${isExpanded ? 'btn-info' : 'btn-outline-info'}`}
                                    onClick={() => handleToggleDetails(app.userId)}
                                    title="View Details"
                                  >
                                    <i className={`ti ${isExpanded ? 'ti-chevron-up' : 'ti-eye'}`}></i>
                                  </button>
                                  {(app.status === "pending" || app.status === "submitted") && (
                                    <>
                                      <button
                                        className="btn btn-outline-success"
                                        onClick={() => handleApprove(app.userId)}
                                        title="Approve"
                                        data-tooltip-id="kyc-tooltip"
                                        data-tooltip-content="Approve KYC"
                                      >
                                        <i className="ti ti-check"></i>
                                      </button>
                                      <button
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                          setExpandedAppId(app.userId);
                                          setShowRejectForm(app.userId);
                                        }}
                                        title="Reject"
                                        data-tooltip-id="kyc-tooltip"
                                        data-tooltip-content="Reject KYC"
                                      >
                                        <i className="ti ti-x"></i>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                            
                            {/* Inline Expanded Details Row */}
                            {isExpanded && (
                              <tr key={`${app.userId}-details`}>
                                <td colSpan={7} style={{ padding: 0, backgroundColor: '#f8f9fa' }}>
                                  <div className="p-4" style={{ 
                                    animation: 'slideDown 0.3s ease-out'
                                  }}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <h5 className="mb-0">
                                        <i className="ti ti-file-certificate me-2"></i>
                                        KYC Application Details
                                      </h5>
                                      <button 
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => setExpandedAppId(null)}
                                      >
                                        <i className="ti ti-x"></i> Close
                                      </button>
                                    </div>

                                    <div className="row">
                                      {/* Personal Information */}
                                      <div className="col-md-6 mb-4">
                                        <div className="card h-100">
                                          <div className="card-header">
                                            <h6 className="mb-0"><i className="ti ti-user me-2"></i>Personal Information</h6>
                                          </div>
                                          <div className="card-body">
                                            <table className="table table-sm table-borderless">
                                              <tbody>
                                                <tr>
                                                  <th style={{ width: '40%' }}>Full Name:</th>
                                                  <td>{app.personalInfo.fullName}</td>
                                                </tr>
                                                <tr>
                                                  <th>Date of Birth:</th>
                                                  <td>{new Date(app.personalInfo.dateOfBirth).toLocaleDateString()}</td>
                                                </tr>
                                                <tr>
                                                  <th>Gender:</th>
                                                  <td className="text-capitalize">{app.personalInfo.gender}</td>
                                                </tr>
                                                <tr>
                                                  <th>Email:</th>
                                                  <td>{app.personalInfo.email}</td>
                                                </tr>
                                                <tr>
                                                  <th>Phone:</th>
                                                  <td>{app.personalInfo.phone}</td>
                                                </tr>
                                                <tr>
                                                  <th>Address:</th>
                                                  <td>
                                                    {app.personalInfo.address.line1}<br/>
                                                    {app.personalInfo.address.city}, {app.personalInfo.address.postalCode}<br/>
                                                    {app.personalInfo.address.country}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Document Images */}
                                      <div className="col-md-6 mb-4">
                                        <div className="card h-100">
                                          <div className="card-header">
                                            <h6 className="mb-0"><i className="ti ti-file-text me-2"></i>Identity Documents</h6>
                                          </div>
                                          <div className="card-body">
                                            <p className="text-muted small mb-3">Document Type: <strong>{app.document.type}</strong></p>
                                            
                                            <div className="row g-2">
                                              <div className="col-12">
                                                <label className="form-label small text-muted">Selfie Photo</label>
                                                <div className="border rounded p-2 text-center" style={{ backgroundColor: '#fff' }}>
                                                  <img 
                                                    src={kycService.base64ToImageUrl(app.document.images.selfie)}
                                                    alt="Selfie"
                                                    className="img-fluid"
                                                    style={{ maxHeight: '150px', cursor: 'pointer' }}
                                                    onClick={() => setViewDocument({
                                                      type: 'Selfie Photo',
                                                      url: kycService.base64ToImageUrl(app.document.images.selfie)
                                                    })}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-6">
                                                <label className="form-label small text-muted">Front Side</label>
                                                <div className="border rounded p-2 text-center" style={{ backgroundColor: '#fff' }}>
                                                  <img 
                                                    src={kycService.base64ToImageUrl(app.document.images.front)}
                                                    alt="Front"
                                                    className="img-fluid"
                                                    style={{ maxHeight: '120px', cursor: 'pointer' }}
                                                    onClick={() => setViewDocument({
                                                      type: 'Front Side',
                                                      url: kycService.base64ToImageUrl(app.document.images.front)
                                                    })}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-6">
                                                <label className="form-label small text-muted">Back Side</label>
                                                <div className="border rounded p-2 text-center" style={{ backgroundColor: '#fff' }}>
                                                  <img 
                                                    src={kycService.base64ToImageUrl(app.document.images.back)}
                                                    alt="Back"
                                                    className="img-fluid"
                                                    style={{ maxHeight: '120px', cursor: 'pointer' }}
                                                    onClick={() => setViewDocument({
                                                      type: 'Back Side',
                                                      url: kycService.base64ToImageUrl(app.document.images.back)
                                                    })}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Rejection Reason */}
                                    {app.status === "rejected" && app.rejectionReason && (
                                      <div className="alert alert-danger">
                                        <strong>Rejection Reason:</strong> {app.rejectionReason}
                                      </div>
                                    )}

                                    {/* Show rejection form if needed */}
                                    {showRejectForm === app.userId && (
                                      <div className="mt-3 p-3 border rounded bg-white">
                                        <h6>Reject Application</h6>
                                        <div className="mb-3">
                                          <label className="form-label">Rejection Reason</label>
                                          <textarea 
                                            className="form-control"
                                            rows={3}
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            placeholder="Please provide a reason for rejection..."
                                          />
                                        </div>
                                        <div className="d-flex gap-2">
                                          <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleReject(app.userId)}
                                          >
                                            Confirm Rejection
                                          </button>
                                          <button 
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => {
                                              setShowRejectForm(null);
                                              setRejectionReason('');
                                            }}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    {/* Audit Trail */}
                                    <div className="mt-3">
                                      <h6><i className="ti ti-history me-2"></i>Audit Trail</h6>
                                      <div className="card">
                                        <div className="card-body">
                                          <table className="table table-sm table-borderless mb-0">
                                            <tbody>
                                              <tr>
                                                <th style={{ width: '30%' }}>Submitted:</th>
                                                <td>{formatDate(app.audit.submittedAt)}</td>
                                              </tr>
                                              {app.audit.reviewedAt && (
                                                <tr>
                                                  <th>Reviewed:</th>
                                                  <td>{formatDate(app.audit.reviewedAt)}</td>
                                                </tr>
                                              )}
                                              {app.audit.reviewedBy && (
                                                <tr>
                                                  <th>Reviewed By:</th>
                                                  <td>{app.audit.reviewedBy}</td>
                                                </tr>
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Image View Modal - Keep for viewing full-size images */}
      {viewDocument && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setViewDocument(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{viewDocument.type}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setViewDocument(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center bg-dark">
                <img 
                  src={viewDocument.url}
                  alt={viewDocument.type}
                  className="img-fluid"
                  style={{ maxHeight: "80vh" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 2000px;
          }
        }
      `}</style>
    </div>
  );
};

export default KYCApplicationsPage;
