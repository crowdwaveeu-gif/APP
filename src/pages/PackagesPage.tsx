import { useState, useMemo, useEffect } from 'react';
import { getAllPackageRequests, PackageRequestData, updatePackageRequest, deletePackageRequest } from '../services/dataService';

const PackagesPage = () => {
  // Helper function to round weight to avoid floating point precision issues
  const roundWeight = (weight: number): number => {
    return Math.round(weight * 10) / 10;
  };
  const [packages, setPackages] = useState<PackageRequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageRequestData | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<PackageRequestData>>({});
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch packages from Firebase
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const data = await getAllPackageRequests();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const itemsPerPage = 10;

  // Filter and search logic
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesSearch = pkg.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.pickupLocation.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.pickupLocation.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.destinationLocation.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.destinationLocation.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || 
                           pkg.status === statusFilter || 
                           pkg.deliveryStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [packages, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewPackage = (pkg: PackageRequestData) => {
    setSelectedPackage(pkg);
    setShowViewModal(true);
  };

  const handleEditPackage = (pkg: PackageRequestData) => {
    setSelectedPackage(pkg);
    const formData: Partial<PackageRequestData> = {
      senderName: pkg.senderName,
      receiverName: pkg.receiverName,
      receiverPhone: pkg.receiverPhone,
      status: pkg.status,
      compensationOffer: pkg.compensationOffer,
      packageDetails: { ...pkg.packageDetails },
      preferredTransportModes: [...pkg.preferredTransportModes]
    };
    
    // Only include preferredDeliveryDate if it exists
    if (pkg.preferredDeliveryDate) {
      formData.preferredDeliveryDate = pkg.preferredDeliveryDate;
    }
    
    setEditFormData(formData);
    setShowEditModal(true);
  };

  const handleUpdatePackage = async () => {
    if (!selectedPackage) return;
    
    setActionLoading(true);
    try {
      await updatePackageRequest(selectedPackage.id, editFormData);
      
      // Refresh packages list
      const updatedPackages = await getAllPackageRequests();
      setPackages(updatedPackages);
      
      setShowEditModal(false);
      setSelectedPackage(null);
      alert('Package updated successfully!');
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Failed to update package. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePackage = (pkg: PackageRequestData) => {
    setSelectedPackage(pkg);
    setShowDeleteModal(true);
  };

  const confirmDeletePackage = async () => {
    if (!selectedPackage) return;
    
    setActionLoading(true);
    try {
      await deletePackageRequest(selectedPackage.id);
      
      // Refresh packages list
      const updatedPackages = await getAllPackageRequests();
      setPackages(updatedPackages);
      
      setShowDeleteModal(false);
      setSelectedPackage(null);
      alert('Package deleted successfully!');
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csv = [
      'Package ID,Tracking ID,Sender,Recipient,Origin,Destination,Weight (kg),Status,Delivery Status,Date Created,Preferred Delivery',
      ...filteredPackages.map(pkg => 
        `${pkg.id},${pkg.trackingId},${pkg.senderName},${pkg.receiverName},${pkg.pickupLocation.city || pkg.pickupLocation.country},${pkg.destinationLocation.city || pkg.destinationLocation.country},${roundWeight(pkg.packageDetails.weightKg)},${pkg.status},${pkg.deliveryStatus || 'N/A'},${pkg.createdAt.toLocaleDateString()},${pkg.preferredDeliveryDate?.toLocaleDateString() || 'N/A'}`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packages.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadgeClass = (status: string, deliveryStatus?: string) => {
    // Prioritize delivery status if available
    const effectiveStatus = deliveryStatus || status;
    
    switch (effectiveStatus.toLowerCase()) {
      case 'delivered':
        return 'badge bg-success';
      case 'in_transit':
      case 'picked_up':
        return 'badge bg-warning';
      case 'pending':
        return 'badge bg-warning';
      case 'confirmed':
        return 'badge bg-primary';
      case 'matched':
        return 'badge bg-primary';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const getStatusText = (status: string, deliveryStatus?: string) => {
    const effectiveStatus = deliveryStatus || status;
    return effectiveStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Packages Management</h5>
              <div className="d-flex gap-2">
                <select 
                  className="form-select form-select-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Returned">Returned</option>
                </select>
                <button className="btn btn-sm btn-primary" onClick={handleExportCSV}>
                  <i className="fas fa-download me-1"></i>
                  Export CSV
                </button>
              </div>
            </div>
          </div>
          
          <div className="panel-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="search-box position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading packages...</p>
                </div>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Tracking ID</th>
                      <th>Sender</th>
                      <th>Recipient</th>
                      <th>Origin → Destination</th>
                      <th>Weight</th>
                      <th>Status</th>
                      <th>Transport</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPackages.length > 0 ? (
                      paginatedPackages.map((pkg) => (
                        <tr key={pkg.id}>
                          <td className="font-monospace text-muted small">{pkg.trackingId}</td>
                          <td>{pkg.senderName}</td>
                          <td>{pkg.receiverName}</td>
                          <td>
                            <div className="small">
                              <div><strong>{pkg.pickupLocation.city || pkg.pickupLocation.country}</strong></div>
                              <div className="text-muted">→ {pkg.destinationLocation.city || pkg.destinationLocation.country}</div>
                            </div>
                          </td>
                          <td>{roundWeight(pkg.packageDetails.weightKg)} kg</td>
                          <td>
                            <span className={getStatusBadgeClass(pkg.status, pkg.deliveryStatus)}>
                              {getStatusText(pkg.status, pkg.deliveryStatus)}
                            </span>
                          </td>
                          <td>
                            {pkg.preferredTransportModes.length > 0 
                              ? pkg.preferredTransportModes[0].charAt(0).toUpperCase() + pkg.preferredTransportModes[0].slice(1)
                              : 'N/A'}
                          </td>
                          <td>{pkg.createdAt.toLocaleDateString()}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleViewPackage(pkg)}
                              title="View Details"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleEditPackage(pkg)}
                              title="Edit Package"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeletePackage(pkg)}
                              title="Delete Package"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-4">
                        No packages found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPackages.length)} of {filteredPackages.length} entries
                </div>
                <div className="d-flex gap-1">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Package Modal */}
      {showViewModal && selectedPackage && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Package Details</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Document ID (Firestore)</label>
                    <p className="form-control-plaintext font-monospace small">{selectedPackage.id}</p>
                  </div>
                  {selectedPackage.internalId && selectedPackage.internalId !== selectedPackage.id && (
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Internal ID</label>
                      <p className="form-control-plaintext font-monospace small text-muted">{selectedPackage.internalId}</p>
                    </div>
                  )}
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Tracking ID</label>
                    <p className="form-control-plaintext font-monospace">{selectedPackage.trackingId}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Sender</label>
                    <p className="form-control-plaintext">{selectedPackage.senderName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Recipient</label>
                    <p className="form-control-plaintext">{selectedPackage.receiverName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Recipient Phone</label>
                    <p className="form-control-plaintext">{selectedPackage.receiverPhone}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Pickup Location</label>
                    <p className="form-control-plaintext">{selectedPackage.pickupLocation.city || selectedPackage.pickupLocation.country}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Destination</label>
                    <p className="form-control-plaintext">{selectedPackage.destinationLocation.city || selectedPackage.destinationLocation.country}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Weight</label>
                    <p className="form-control-plaintext">{roundWeight(selectedPackage.packageDetails.weightKg)} kg</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Size</label>
                    <p className="form-control-plaintext">{selectedPackage.packageDetails.size}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Package Type</label>
                    <p className="form-control-plaintext">{selectedPackage.packageDetails.type}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Transport Mode</label>
                    <p className="form-control-plaintext">{selectedPackage.preferredTransportModes.join(', ')}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Created Date</label>
                    <p className="form-control-plaintext">{selectedPackage.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Preferred Delivery</label>
                    <p className="form-control-plaintext">{selectedPackage.preferredDeliveryDate?.toLocaleDateString() || 'Not specified'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Status</label>
                    <p className="form-control-plaintext">
                      <span className={getStatusBadgeClass(selectedPackage.status, selectedPackage.deliveryStatus)}>
                        {getStatusText(selectedPackage.status, selectedPackage.deliveryStatus)}
                      </span>
                    </p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Package Description</label>
                    <p className="form-control-plaintext">{selectedPackage.packageDetails.description}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {showEditModal && selectedPackage && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Package</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                  disabled={actionLoading}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Sender Name</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={editFormData.senderName || ''}
                      onChange={(e) => setEditFormData({...editFormData, senderName: e.target.value})}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Recipient Name</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={editFormData.receiverName || ''}
                      onChange={(e) => setEditFormData({...editFormData, receiverName: e.target.value})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Recipient Phone</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={editFormData.receiverPhone || ''}
                      onChange={(e) => setEditFormData({...editFormData, receiverPhone: e.target.value})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select"
                      value={editFormData.status || ''}
                      onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="matched">Matched</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Package Weight (kg)</label>
                    <input 
                      type="number"
                      step="0.1"
                      className="form-control"
                      value={editFormData.packageDetails?.weightKg || 0}
                      onChange={(e) => setEditFormData({
                        ...editFormData, 
                        packageDetails: {
                          ...editFormData.packageDetails!,
                          weightKg: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Package Size</label>
                    <select 
                      className="form-select"
                      value={editFormData.packageDetails?.size || ''}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        packageDetails: {
                          ...editFormData.packageDetails!,
                          size: e.target.value
                        }
                      })}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Package Type</label>
                    <select 
                      className="form-select"
                      value={editFormData.packageDetails?.type || ''}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        packageDetails: {
                          ...editFormData.packageDetails!,
                          type: e.target.value
                        }
                      })}
                    >
                      <option value="electronics">Electronics</option>
                      <option value="documents">Documents</option>
                      <option value="clothing">Clothing</option>
                      <option value="food">Food</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Compensation Offer ($)</label>
                    <input 
                      type="number"
                      className="form-control"
                      value={editFormData.compensationOffer || 0}
                      onChange={(e) => setEditFormData({...editFormData, compensationOffer: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Preferred Delivery Date <span className="text-muted small">(Optional)</span></label>
                    <input 
                      type="datetime-local"
                      className="form-control"
                      value={editFormData.preferredDeliveryDate ? new Date(editFormData.preferredDeliveryDate).toISOString().slice(0, 16) : ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || value === null) {
                          // Remove preferredDeliveryDate from form data if empty
                          const { preferredDeliveryDate, ...rest } = editFormData;
                          setEditFormData(rest);
                        } else {
                          setEditFormData({...editFormData, preferredDeliveryDate: new Date(value)});
                        }
                      }}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Package Description</label>
                    <textarea 
                      className="form-control"
                      rows={3}
                      value={editFormData.packageDetails?.description || ''}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        packageDetails: {
                          ...editFormData.packageDetails!,
                          description: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleUpdatePackage}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Updating...' : 'Update Package'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPackage && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={actionLoading}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this package?</p>
                <div className="alert alert-warning">
                  <strong>Package ID:</strong> {selectedPackage.id}<br />
                  <strong>Tracking ID:</strong> {selectedPackage.trackingId}<br />
                  <strong>Sender:</strong> {selectedPackage.senderName}<br />
                  <strong>Recipient:</strong> {selectedPackage.receiverName}<br />
                  <strong>Route:</strong> {selectedPackage.pickupLocation.city || selectedPackage.pickupLocation.country} → {selectedPackage.destinationLocation.city || selectedPackage.destinationLocation.country}
                </div>
                <p className="text-danger mb-0"><strong>Warning:</strong> This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={confirmDeletePackage}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Deleting...' : 'Delete Package'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;
