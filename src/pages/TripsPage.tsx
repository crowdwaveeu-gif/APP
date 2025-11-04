import { useState, useMemo, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { getAllTravelTrips, TravelTripData, updateTravelTrip, deleteTravelTrip } from '../services/dataService';

const TripsPage = () => {
  const [trips, setTrips] = useState<TravelTripData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState<TravelTripData | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<TravelTripData>>({});
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch trips from Firebase
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const data = await getAllTravelTrips();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const itemsPerPage = 10;

  // Filter and search logic
  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const matchesSearch = trip.travelerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.departureLocation.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.departureLocation.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.arrivalLocation.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.arrivalLocation.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.transportMode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || trip.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [trips, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
  const paginatedTrips = filteredTrips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewTrip = (trip: TravelTripData) => {
    setSelectedTrip(trip);
    setShowViewModal(true);
  };

  const handleEditTrip = (trip: TravelTripData) => {
    setSelectedTrip(trip);
    const formData: Partial<TravelTripData> = {
      travelerName: trip.travelerName,
      status: trip.status,
      transportMode: trip.transportMode,
      availableSpace: trip.availableSpace,
      maxWeightKg: trip.maxWeightKg,
      departureDate: trip.departureDate,
      arrivalDate: trip.arrivalDate,
    };
    
    // Only include price if it exists
    if (trip.price !== undefined && trip.price !== null) {
      formData.price = trip.price;
    }
    
    setEditFormData(formData);
    setShowEditModal(true);
  };

  const handleUpdateTrip = async () => {
    if (!selectedTrip) return;
    
    setActionLoading(true);
    try {
      await updateTravelTrip(selectedTrip.id, editFormData);
      
      // Refresh trips list
      const updatedTrips = await getAllTravelTrips();
      setTrips(updatedTrips);
      
      setShowEditModal(false);
      setSelectedTrip(null);
      alert('Trip updated successfully!');
    } catch (error) {
      console.error('Error updating trip:', error);
      alert('Failed to update trip. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTrip = (trip: TravelTripData) => {
    setSelectedTrip(trip);
    setShowDeleteModal(true);
  };

  const confirmDeleteTrip = async () => {
    if (!selectedTrip) return;
    
    setActionLoading(true);
    try {
      await deleteTravelTrip(selectedTrip.id);
      
      // Refresh trips list
      const updatedTrips = await getAllTravelTrips();
      setTrips(updatedTrips);
      
      setShowDeleteModal(false);
      setSelectedTrip(null);
      alert('Trip deleted successfully!');
    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Failed to delete trip. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csv = [
      'Trip ID,Traveler,Traveler ID,Origin,Destination,Departure Date,Arrival Date,Transport Mode,Available Space,Max Weight (kg),Status,Created At',
      ...filteredTrips.map(trip => 
        `${trip.id},${trip.travelerName},${trip.travelerId},${trip.departureLocation.city || trip.departureLocation.country},${trip.arrivalLocation.city || trip.arrivalLocation.country},${trip.departureDate.toLocaleDateString()},${trip.arrivalDate.toLocaleDateString()},${trip.transportMode},${trip.availableSpace},${trip.maxWeightKg},${trip.status},${trip.createdAt.toLocaleDateString()}`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trips.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'active':
        return 'badge bg-success';
      case 'in progress':
      case 'ongoing':
        return 'badge bg-warning';
      case 'pending':
      case 'confirmed':
        return 'badge bg-info';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const getStatusText = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getTransportModeIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'flight':
        return '✈️';
      case 'train':
        return '🚂';
      case 'bus':
        return '🚌';
      case 'car':
        return '🚗';
      case 'motorcycle':
        return '🏍️';
      case 'ship':
        return '🚢';
      default:
        return '🚗';
    }
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Trips Management</h5>
              <div className="d-flex gap-2">
                <select 
                  className="form-select form-select-sm"
                  value={statusFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
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
                    placeholder="Search trips..."
                    value={searchTerm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading trips...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Trip ID</th>
                      <th>Traveler</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Departure Date</th>
                      <th>Transport Mode</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTrips.length > 0 ? (
                      paginatedTrips.map((trip) => (
                        <tr key={trip.id}>
                          <td className="fw-medium">{trip.id.substring(0, 12)}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {trip.travelerPhotoUrl && (
                                <img 
                                  src={trip.travelerPhotoUrl} 
                                  alt={trip.travelerName}
                                  className="rounded-circle me-2"
                                  style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                />
                              )}
                              <span>{trip.travelerName}</span>
                            </div>
                          </td>
                          <td>{trip.departureLocation.city || trip.departureLocation.country}</td>
                          <td>{trip.arrivalLocation.city || trip.arrivalLocation.country}</td>
                          <td>{trip.departureDate.toLocaleDateString()}</td>
                          <td>
                            <span>{getTransportModeIcon(trip.transportMode)} {trip.transportMode.charAt(0).toUpperCase() + trip.transportMode.slice(1)}</span>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleViewTrip(trip)}
                                title="View Details"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-warning"
                                onClick={() => handleEditTrip(trip)}
                                title="Edit Trip"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteTrip(trip)}
                                title="Delete Trip"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          No trips found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTrips.length)} of {filteredTrips.length} entries
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

      {/* Edit Trip Modal */}
      {showEditModal && selectedTrip && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Trip</h5>
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
                    <label className="form-label">Traveler Name</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={editFormData.travelerName || ''}
                      onChange={(e) => setEditFormData({...editFormData, travelerName: e.target.value})}
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
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Transport Mode</label>
                    <select 
                      className="form-select"
                      value={editFormData.transportMode || ''}
                      onChange={(e) => setEditFormData({...editFormData, transportMode: e.target.value as any})}
                    >
                      <option value="flight">Flight ✈️</option>
                      <option value="train">Train 🚂</option>
                      <option value="bus">Bus 🚌</option>
                      <option value="car">Car 🚗</option>
                      <option value="motorcycle">Motorcycle 🏍️</option>
                      <option value="ship">Ship 🚢</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Available Space (slots)</label>
                    <input 
                      type="number"
                      className="form-control"
                      value={editFormData.availableSpace || 0}
                      onChange={(e) => setEditFormData({...editFormData, availableSpace: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Max Weight (kg)</label>
                    <input 
                      type="number"
                      className="form-control"
                      value={editFormData.maxWeightKg || 0}
                      onChange={(e) => setEditFormData({...editFormData, maxWeightKg: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Price ($) <span className="text-muted small">(Optional)</span></label>
                    <input 
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={editFormData.price !== undefined ? editFormData.price : ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || value === null) {
                          // Remove price from form data if empty
                          const { price, ...rest } = editFormData;
                          setEditFormData(rest);
                        } else {
                          setEditFormData({...editFormData, price: parseFloat(value)});
                        }
                      }}
                      placeholder="Leave empty if not applicable"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Departure Date</label>
                    <input 
                      type="datetime-local"
                      className="form-control"
                      value={editFormData.departureDate ? new Date(editFormData.departureDate).toISOString().slice(0, 16) : ''}
                      onChange={(e) => setEditFormData({...editFormData, departureDate: new Date(e.target.value)})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Arrival Date</label>
                    <input 
                      type="datetime-local"
                      className="form-control"
                      value={editFormData.arrivalDate ? new Date(editFormData.arrivalDate).toISOString().slice(0, 16) : ''}
                      onChange={(e) => setEditFormData({...editFormData, arrivalDate: new Date(e.target.value)})}
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
                  onClick={handleUpdateTrip}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Updating...' : 'Update Trip'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTrip && (
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
                <p>Are you sure you want to delete this trip?</p>
                <div className="alert alert-warning">
                  <strong>Trip ID:</strong> {selectedTrip.id}<br />
                  <strong>Traveler:</strong> {selectedTrip.travelerName}<br />
                  <strong>Route:</strong> {selectedTrip.departureLocation.city || selectedTrip.departureLocation.country} → {selectedTrip.arrivalLocation.city || selectedTrip.arrivalLocation.country}
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
                  onClick={confirmDeleteTrip}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Deleting...' : 'Delete Trip'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Trip Modal */}
      {showViewModal && selectedTrip && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Trip Details</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex align-items-center mb-3">
                      {selectedTrip.travelerPhotoUrl && (
                        <img 
                          src={selectedTrip.travelerPhotoUrl} 
                          alt={selectedTrip.travelerName}
                          className="rounded-circle me-3"
                          style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                        />
                      )}
                      <div>
                        <h6 className="mb-0">{selectedTrip.travelerName}</h6>
                        <small className="text-muted">Traveler ID: {selectedTrip.travelerId}</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Trip ID</label>
                    <p className="form-control-plaintext">{selectedTrip.id}</p>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Status</label>
                    <p className="form-control-plaintext">
                      <span className={getStatusBadgeClass(selectedTrip.status)}>
                        {getStatusText(selectedTrip.status)}
                      </span>
                    </p>
                  </div>

                  <div className="col-12"><hr /></div>
                  <div className="col-12"><h6>Route Information</h6></div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Departure Location</label>
                    <p className="form-control-plaintext">
                      {selectedTrip.departureLocation.city && `${selectedTrip.departureLocation.city}, `}
                      {selectedTrip.departureLocation.country}
                      <br />
                      <small className="text-muted">{selectedTrip.departureLocation.address}</small>
                    </p>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Arrival Location</label>
                    <p className="form-control-plaintext">
                      {selectedTrip.arrivalLocation.city && `${selectedTrip.arrivalLocation.city}, `}
                      {selectedTrip.arrivalLocation.country}
                      <br />
                      <small className="text-muted">{selectedTrip.arrivalLocation.address}</small>
                    </p>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Departure Date</label>
                    <p className="form-control-plaintext">{selectedTrip.departureDate.toLocaleDateString()} {selectedTrip.departureDate.toLocaleTimeString()}</p>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Arrival Date</label>
                    <p className="form-control-plaintext">{selectedTrip.arrivalDate.toLocaleDateString()} {selectedTrip.arrivalDate.toLocaleTimeString()}</p>
                  </div>

                  <div className="col-12"><hr /></div>
                  <div className="col-12"><h6>Trip Details</h6></div>
                  
                  <div className="col-md-4">
                    <label className="form-label fw-medium">Transport Mode</label>
                    <p className="form-control-plaintext">
                      {getTransportModeIcon(selectedTrip.transportMode)} {selectedTrip.transportMode.charAt(0).toUpperCase() + selectedTrip.transportMode.slice(1)}
                    </p>
                  </div>
                  
                  <div className="col-md-4">
                    <label className="form-label fw-medium">Available Space</label>
                    <p className="form-control-plaintext">{selectedTrip.availableSpace} slots</p>
                  </div>
                  
                  <div className="col-md-4">
                    <label className="form-label fw-medium">Max Weight</label>
                    <p className="form-control-plaintext">{selectedTrip.maxWeightKg} kg</p>
                  </div>

                  {selectedTrip.price && (
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Price</label>
                      <p className="form-control-plaintext">${selectedTrip.price}</p>
                    </div>
                  )}
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Created At</label>
                    <p className="form-control-plaintext">{selectedTrip.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsPage;
