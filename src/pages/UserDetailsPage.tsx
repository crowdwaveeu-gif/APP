import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import kycService, { 
  User, 
  KYCApplication, 
  Transaction, 
  PackageRequest, 
  Wallet, 
  TravelTrip, 
  Booking 
} from "@/services/kycService";
import { toast } from 'react-toastify';

const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [kycApplication, setKycApplication] = useState<KYCApplication | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [packageRequests, setPackageRequests] = useState<PackageRequest[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [travelTrips, setTravelTrips] = useState<TravelTrip[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (userId) {
      loadUserDetails();
    }
  }, [userId]);

  const loadUserDetails = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      
      // Load user details
      const allUsers = await kycService.getAllUsers();
      const foundUser = allUsers.find(u => u.id === userId);
      
      if (!foundUser) {
        toast.error("User not found");
        navigate("/users-management");
        return;
      }
      
      setUser(foundUser);

      // Load KYC application if exists
      const allKyc = await kycService.getAllKYCApplications();
      const userKyc = allKyc.find((kyc: KYCApplication) => kyc.userId === userId);
      if (userKyc) {
        setKycApplication(userKyc);
      }

      // Load all user-related data
      const [userTransactions, userPackages, userWallet, userTrips, userBookings] = await Promise.all([
        kycService.getUserTransactions(userId),
        kycService.getUserPackageRequests(userId),
        kycService.getUserWallet(userId),
        kycService.getUserTravelTrips(userId),
        kycService.getUserBookings(userId)
      ]);

      setTransactions(userTransactions);
      setPackageRequests(userPackages);
      setWallet(userWallet);
      setTravelTrips(userTrips);
      setBookings(userBookings);
    } catch (error) {
      console.error("Error loading user details:", error);
      toast.error("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async () => {
    if (!user) return;
    
    const action = user.isBlocked ? "unblock" : "block";
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;
    
    try {
      await kycService.toggleUserBlock(user.id, !user.isBlocked);
      toast.success(`User ${action}ed successfully!`);
      loadUserDetails();
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user`);
    }
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

  const getKycStatusBadge = () => {
    if (!kycApplication) {
      return <span className="badge bg-secondary">Not Submitted</span>;
    }
    
    const badges = {
      pending: <span className="badge bg-warning">Pending</span>,
      submitted: <span className="badge bg-info">Submitted</span>,
      approved: <span className="badge bg-success">Approved</span>,
      rejected: <span className="badge bg-danger">Rejected</span>
    };
    
    return badges[kycApplication.status as keyof typeof badges] || <span className="badge bg-secondary">Unknown</span>;
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

  if (!user) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <i className="ti ti-user-off" style={{ fontSize: "4rem", opacity: 0.3 }}></i>
          <h4 className="mt-3">User Not Found</h4>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/users-management")}>
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="mb-1 fw-bold">{packageRequests.length}</h3>
                  <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>Package Requests</p>
                </div>
                <div className="fs-1" style={{ fontSize: "3rem" }}>
                  📦
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="mb-1 fw-bold">{travelTrips.length}</h3>
                  <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>Travel Trips</p>
                </div>
                <div className="fs-1" style={{ fontSize: "3rem" }}>
                  ✈️
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="mb-1 fw-bold">{bookings.length}</h3>
                  <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>Bookings</p>
                </div>
                <div className="fs-1" style={{ fontSize: "3rem" }}>
                  📅
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="mb-1 fw-bold">${wallet?.balance.toFixed(2) || '0.00'}</h3>
                  <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>Wallet Balance</p>
                </div>
                <div className="fs-1" style={{ fontSize: "3rem" }}>
                  💰
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="row">
        {/* Left Column - Profile and Verification */}
        <div className="col-md-4 mb-4 d-flex flex-column">
          {/* Profile Card */}
          <div className="card shadow-sm mb-3">
            <div className="card-body text-center py-3">
              {(() => {
                const avatarUrl = user.avatar || user.photoUrl;
                const hasAvatar = avatarUrl && avatarUrl !== 'null' && avatarUrl.trim() !== '';
                
                return hasAvatar ? (
                  <img 
                    src={avatarUrl}
                    alt={user.fullName}
                    className="rounded-circle mb-2"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    onError={(e) => {
                      // Hide broken image and show fallback
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2" style="width: 120px; height: 120px; font-size: 48px;">${user.fullName?.charAt(0) || "U"}</div>`;
                      }
                    }}
                  />
                ) : (
                  <div 
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2"
                    style={{ width: "120px", height: "120px", fontSize: "48px" }}
                  >
                    {user.fullName?.charAt(0) || "U"}
                  </div>
                );
              })()}
              
              <h5 className="mb-1">{user.fullName}</h5>
              <p className="text-muted mb-2 small">{user.email}</p>
              
              <div className="mb-2">
                <span className="badge bg-secondary me-2">{user.role}</span>
                {user.isBlocked && (
                  <span className="badge bg-danger">Blocked</span>
                )}
              </div>

              <div className="d-grid gap-2">
                <button 
                  className={`btn btn-sm ${user.isBlocked ? 'btn-success' : 'btn-danger'}`}
                  onClick={handleToggleBlock}
                >
                  <i className={`ti ${user.isBlocked ? 'ti-lock-open' : 'ti-ban'} me-1`}></i>
                  {user.isBlocked ? "Unblock User" : "Block User"}
                </button>
                
                {kycApplication && (
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate("/kyc-applications")}
                  >
                    <i className="ti ti-file-text me-1"></i>View KYC Application
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Verification Status Card */}
          <div className="card shadow-sm flex-grow-1">
            <div className="card-header">
              <h5 className="mb-0"><i className="ti ti-shield-check me-2"></i>Verification Status</h5>
            </div>
            <div className="card-body">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <th style={{ width: "50%" }}>Email Verified:</th>
                    <td>
                      {user.verificationStatus?.emailVerified ? (
                        <span className="badge bg-success"><i className="ti ti-check me-1"></i>Verified</span>
                      ) : (
                        <span className="badge bg-secondary"><i className="ti ti-x me-1"></i>Not Verified</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Phone Verified:</th>
                    <td>
                      {user.verificationStatus?.phoneVerified ? (
                        <span className="badge bg-success"><i className="ti ti-check me-1"></i>Verified</span>
                      ) : (
                        <span className="badge bg-secondary"><i className="ti ti-x me-1"></i>Not Verified</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Identity Verified:</th>
                    <td>
                      {user.verificationStatus?.identityVerified ? (
                        <span className="badge bg-success"><i className="ti ti-check me-1"></i>Verified</span>
                      ) : (
                        <span className="badge bg-secondary"><i className="ti ti-x me-1"></i>Not Verified</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>KYC Status:</th>
                    <td>{getKycStatusBadge()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Personal Information and KYC Application */}
        <div className="col-md-8">
          {/* Personal Information */}
          <div className="card shadow-sm mb-4">
            <div className="card-header">
              <h5 className="mb-0"><i className="ti ti-info-circle me-2"></i>Personal Information</h5>
            </div>
            <div className="card-body">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <th style={{ width: "30%" }}>User ID:</th>
                    <td><code>{user.id}</code></td>
                  </tr>
                  <tr>
                    <th>Full Name:</th>
                    <td>{user.fullName || "Not provided"}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Phone Number:</th>
                    <td>{user.phoneNumber || "Not provided"}</td>
                  </tr>
                  <tr>
                    <th>City:</th>
                    <td>{user.city || "Not provided"}</td>
                  </tr>
                  <tr>
                    <th>Country:</th>
                    <td>{user.country || "Not provided"}</td>
                  </tr>
                  <tr>
                    <th>Joined:</th>
                    <td>{formatDate(user.createdAt, true)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* KYC Application Details */}
          {kycApplication && (
            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="ti ti-file-certificate me-2"></i>KYC Application</h5>
              </div>
              <div className="card-body">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th style={{ width: "30%" }}>User ID:</th>
                      <td><code>{kycApplication.userId}</code></td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td>{getKycStatusBadge()}</td>
                    </tr>
                    <tr>
                      <th>Submitted At:</th>
                      <td>{formatDate(kycApplication.audit?.submittedAt, true)}</td>
                    </tr>
                    <tr>
                      <th>Updated At:</th>
                      <td>{formatDate(kycApplication.audit?.updatedAt, true)}</td>
                    </tr>
                    {kycApplication.rejectionReason && (
                      <tr>
                        <th>Rejection Reason:</th>
                        <td className="text-danger">{kycApplication.rejectionReason}</td>
                      </tr>
                    )}
                    {kycApplication.audit?.reviewedBy && (
                      <tr>
                        <th>Reviewed By:</th>
                        <td>{kycApplication.audit.reviewedBy}</td>
                      </tr>
                    )}
                    {kycApplication.audit?.reviewedAt && (
                      <tr>
                        <th>Reviewed At:</th>
                        <td>{formatDate(kycApplication.audit.reviewedAt, true)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Data Tabs */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" role="tablist">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <i className="ti ti-layout-dashboard me-1"></i>Overview
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('transactions')}
                  >
                    <i className="ti ti-credit-card me-1"></i>Transactions
                    <span className="badge bg-primary ms-1">{transactions.length}</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'packages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('packages')}
                  >
                    <i className="ti ti-package me-1"></i>Packages
                    <span className="badge bg-primary ms-1">{packageRequests.length}</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'trips' ? 'active' : ''}`}
                    onClick={() => setActiveTab('trips')}
                  >
                    <i className="ti ti-plane me-1"></i>Travel Trips
                    <span className="badge bg-primary ms-1">{travelTrips.length}</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    <i className="ti ti-calendar-check me-1"></i>Bookings
                    <span className="badge bg-primary ms-1">{bookings.length}</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h5 className="mb-3">Activity Summary</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="alert alert-info">
                        <i className="ti ti-info-circle me-2"></i>
                        <strong>Total Activity:</strong> {transactions.length + packageRequests.length + travelTrips.length + bookings.length} items
                      </div>
                    </div>
                    {wallet && (
                      <div className="col-md-6">
                        <div className="alert alert-success">
                          <i className="ti ti-wallet me-2"></i>
                          <strong>Wallet Balance:</strong> ${wallet.balance.toFixed(2)} {wallet.currency}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div>
                  <h5 className="mb-3">Transactions History</h5>
                  {transactions.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="ti ti-credit-card-off" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
                      <p className="text-muted mt-2 mb-0">No transactions found</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td><code>{transaction.id}</code></td>
                              <td><span className="badge bg-info">{transaction.type}</span></td>
                              <td><strong>${transaction.amount?.toFixed(2) || '0.00'}</strong></td>
                              <td>
                                <span className={`badge ${transaction.status === 'completed' ? 'bg-success' : transaction.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                                  {transaction.status}
                                </span>
                              </td>
                              <td><small>{formatDate(transaction.createdAt, true)}</small></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Packages Tab */}
              {activeTab === 'packages' && (
                <div>
                  <h5 className="mb-3">Package Requests</h5>
                  {packageRequests.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="ti ti-package-off" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
                      <p className="text-muted mt-2 mb-0">No package requests found</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Offer</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packageRequests.map((pkg) => (
                            <tr key={pkg.id}>
                              <td><code className="small">{pkg.id.substring(0, 8)}...</code></td>
                              <td><small>{pkg.pickupLocation?.address?.substring(0, 30) || 'N/A'}...</small></td>
                              <td><small>{pkg.destinationLocation?.address?.substring(0, 30) || 'N/A'}...</small></td>
                              <td><strong>${pkg.finalPrice || pkg.compensationOffer}</strong></td>
                              <td>
                                <span className={`badge ${pkg.status === 'matched' ? 'bg-success' : pkg.status === 'pending' ? 'bg-warning' : 'bg-secondary'}`}>
                                  {pkg.status}
                                </span>
                              </td>
                              <td><small>{formatDate(pkg.createdAt, false)}</small></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Travel Trips Tab */}
              {activeTab === 'trips' && (
                <div>
                  <h5 className="mb-3">Travel Trips</h5>
                  {travelTrips.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="ti ti-plane-off" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
                      <p className="text-muted mt-2 mb-0">No travel trips found</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {travelTrips.map((trip) => (
                            <tr key={trip.id}>
                              <td><code className="small">{trip.id.substring(0, 8)}...</code></td>
                              <td><small>{trip.departureLocation?.city || 'N/A'}</small></td>
                              <td><small>{trip.arrivalLocation?.city || 'N/A'}</small></td>
                              <td><small>{formatDate(trip.departureDate, false)}</small></td>
                              <td><small>{formatDate(trip.arrivalDate, false)}</small></td>
                              <td>
                                <span className={`badge ${trip.status === 'active' ? 'bg-success' : trip.status === 'completed' ? 'bg-info' : 'bg-secondary'}`}>
                                  {trip.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  <h5 className="mb-3">Bookings</h5>
                  {bookings.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="ti ti-calendar-off" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
                      <p className="text-muted mt-2 mb-0">No bookings found</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Package ID</th>
                            <th>Role</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.id}>
                              <td><code className="small">{booking.id.substring(0, 8)}...</code></td>
                              <td><code className="small">{booking.packageId.substring(0, 8)}...</code></td>
                              <td>
                                <span className="badge bg-secondary">
                                  {booking.senderId === userId ? 'Sender' : 'Traveler'}
                                </span>
                              </td>
                              <td><strong>${booking.totalAmount?.toFixed(2) || '0.00'}</strong></td>
                              <td>
                                <span className={`badge ${booking.status === 'completed' ? 'bg-success' : booking.status === 'paymentCompleted' ? 'bg-info' : 'bg-warning'}`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td><small>{formatDate(booking.createdAt, true)}</small></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
