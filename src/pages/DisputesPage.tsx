import { useState, useMemo, useEffect } from 'react';
import { DisputeData } from '../data/disputes';
import disputesService, { Dispute } from '../services/disputesService';
import conversationsService, { ChatMessage } from '../services/conversationsService';

const DisputesPage = () => {
  const [disputes, setDisputes] = useState<DisputeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDispute, setSelectedDispute] = useState<DisputeData | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDispute, setEditingDispute] = useState<DisputeData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'messages'>('details');
  const [reporterName, setReporterName] = useState<string>('');
  const [reportedName, setReportedName] = useState<string>('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Load disputes from Firebase on mount
  useEffect(() => {
    loadDisputes();
  }, []);

  const loadDisputes = async () => {
    setLoading(true);
    try {
      const firebaseDisputes = await disputesService.getAllDisputes();
      const formattedDisputes: DisputeData[] = firebaseDisputes.map(dispute => ({
        id: dispute.id,
        disputeId: dispute.disputeId || 'N/A',
        customer: (dispute as any).reporterName || dispute.customer || `User ${dispute.reporterId?.substring(0, 8)}...` || 'Unknown',
        order: dispute.bookingId || dispute.order || 'N/A',
        issue: (dispute as any).reasonDisplayText || dispute.issue || dispute.description?.substring(0, 50) || 'No description',
        description: dispute.description,
        status: mapFirebaseStatusToUI(dispute.status),
        priority: dispute.priority ? capitalizeFirst(dispute.priority) as DisputeData['priority'] : 'Medium',
        dateCreated: formatFirebaseDate(dispute.createdAt),
        lastUpdated: formatFirebaseDate(dispute.lastUpdated || dispute.createdAt),
        assignedTo: dispute.assignedTo || 'Unassigned',
        reporterId: dispute.reporterId,
        reportedUserId: dispute.reportedUserId,
        bookingId: dispute.bookingId,
        reporterName: (dispute as any).reporterName,
        reporterEmail: (dispute as any).reporterEmail,
        reportedUserName: (dispute as any).reportedUserName,
        reportedUserEmail: (dispute as any).reportedUserEmail,
        evidence: dispute.evidence || [],
        evidenceCount: (dispute as any).evidenceCount || dispute.evidence?.length || 0,
      }));
      setDisputes(formattedDisputes);
    } catch (error) {
      console.error('Error loading disputes:', error);
      alert('Failed to load disputes from Firebase.');
    } finally {
      setLoading(false);
    }
  };

  const mapFirebaseStatusToUI = (status: string): DisputeData['status'] => {
    const statusMap: Record<string, DisputeData['status']> = {
      'pending': 'Open',
      'underReview': 'In Progress',
      'resolved': 'Resolved',
      'dismissed': 'Closed',
      'escalated': 'Escalated',
    };
    return statusMap[status] || 'Open';
  };

  const mapUIStatusToFirebase = (status: DisputeData['status']): Dispute['status'] => {
    const statusMap: Record<DisputeData['status'], Dispute['status']> = {
      'Open': 'pending',
      'In Progress': 'underReview',
      'Resolved': 'resolved',
      'Closed': 'dismissed',
      'Escalated': 'escalated',
    };
    return statusMap[status] || 'pending';
  };

  const capitalizeFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatFirebaseDate = (timestamp: any): string => {
    if (!timestamp) return new Date().toISOString();
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toISOString();
    }
    return new Date(timestamp).toISOString();
  };

  const itemsPerPage = 10;

  // Filter and search logic
  const filteredDisputes = useMemo(() => {
    return disputes.filter(dispute => {
      const matchesSearch = dispute.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dispute.disputeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dispute.order.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dispute.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dispute.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || dispute.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || dispute.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [disputes, searchTerm, statusFilter, priorityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage);
  const paginatedDisputes = filteredDisputes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDispute = async (dispute: DisputeData) => {
    setSelectedDispute(dispute);
    setShowViewModal(true);
    setActiveTab('details');
    setChatMessages([]);
    setReporterName('');
    setReportedName('');
    
    // Fetch user details if not already present (for old disputes)
    if (dispute.reporterId && dispute.reportedUserId) {
      // Only fetch if names are missing
      if (!dispute.reporterName || !dispute.reportedUserName) {
        try {
          const [reporter, reported] = await Promise.all([
            conversationsService.getUserDetails(dispute.reporterId),
            conversationsService.getUserDetails(dispute.reportedUserId)
          ]);
          
          // Update the selected dispute with fetched names
          const updatedDispute = {
            ...dispute,
            reporterName: reporter?.name || 'Unknown User',
            reporterEmail: reporter?.email || 'N/A',
            reportedUserName: reported?.name || 'Unknown User',
            reportedUserEmail: reported?.email || 'N/A',
          };
          setSelectedDispute(updatedDispute);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
      
      // Load chat messages between the two users
      await loadChatMessages(dispute.reporterId, dispute.reportedUserId);
    }
  };

  const loadChatMessages = async (userId1: string, userId2: string) => {
    setLoadingMessages(true);
    try {
      // Fetch user names
      const [reporter, reported] = await Promise.all([
        conversationsService.getUserDetails(userId1),
        conversationsService.getUserDetails(userId2)
      ]);
      
      setReporterName(reporter?.name || 'Reporter');
      setReportedName(reported?.name || 'Reported User');
      
      // Fetch chat history
      const { messages } = await conversationsService.getChatHistoryBetweenUsers(userId1, userId2);
      setChatMessages(messages);
    } catch (error) {
      console.error('Error loading chat messages:', error);
      setChatMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleEditDispute = (dispute: DisputeData) => {
    setEditingDispute({ ...dispute });
    setShowEditModal(true);
  };

  const handleSaveDispute = async () => {
    if (editingDispute) {
      try {
        await disputesService.updateDispute(editingDispute.id, {
          status: mapUIStatusToFirebase(editingDispute.status),
          priority: editingDispute.priority.toLowerCase() as any,
          assignedTo: editingDispute.assignedTo,
          description: editingDispute.description,
        });
        alert('Dispute updated successfully!');
        setShowEditModal(false);
        setEditingDispute(null);
        loadDisputes(); // Reload data
      } catch (error) {
        console.error('Error saving dispute:', error);
        alert('Failed to save dispute');
      }
    }
  };

  const handleExportCSV = () => {
    const csv = [
      'Dispute ID,Customer,Order,Issue,Status,Priority,Date Created,Last Updated,Assigned To',
      ...filteredDisputes.map(dispute => 
        `${dispute.disputeId},${dispute.customer},${dispute.order},${dispute.issue},${dispute.status},${dispute.priority},${dispute.dateCreated},${dispute.lastUpdated},${dispute.assignedTo}`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'disputes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'badge bg-success';
      case 'In Progress':
        return 'badge bg-warning';
      case 'Open':
        return 'badge bg-primary';
      case 'Escalated':
        return 'badge bg-danger';
      case 'Closed':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'badge bg-danger';
      case 'High':
        return 'badge bg-warning';
      case 'Medium':
        return 'badge bg-info';
      case 'Low':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Disputes Management</h5>
              <div className="d-flex gap-2">
                <select 
                  className="form-select form-select-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Escalated">Escalated</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
                <select 
                  className="form-select form-select-sm"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="All">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
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
                    placeholder="Search disputes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Dispute ID</th>
                    <th>Customer</th>
                    <th>Order</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Date Created</th>
                    <th>Assigned To</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 mb-0">Loading disputes...</p>
                      </td>
                    </tr>
                  ) : paginatedDisputes.length > 0 ? (
                    paginatedDisputes.map((dispute) => (
                      <tr key={dispute.id}>
                        <td className="fw-medium">{dispute.disputeId}</td>
                        <td>{dispute.customer}</td>
                        <td className="font-monospace text-muted small">{dispute.order}</td>
                        <td>
                          <div className="text-truncate" style={{ maxWidth: '200px' }} title={dispute.issue}>
                            {dispute.issue}
                          </div>
                        </td>
                        <td>
                          <span className={getStatusBadgeClass(dispute.status)}>
                            {dispute.status}
                          </span>
                        </td>
                        <td>
                          <span className={getPriorityBadgeClass(dispute.priority)}>
                            {dispute.priority}
                          </span>
                        </td>
                        <td>{new Date(dispute.dateCreated).toLocaleDateString()}</td>
                        <td>{dispute.assignedTo}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleViewDispute(dispute)}
                              title="View Details"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleEditDispute(dispute)}
                              title="Edit Dispute"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-4">
                        No disputes found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredDisputes.length)} of {filteredDisputes.length} entries
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

      {/* View Dispute Modal */}
      {showViewModal && selectedDispute && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Dispute Details - {selectedDispute.disputeId}</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              
              {/* Tabs */}
              <ul className="nav nav-tabs px-3 pt-2" role="tablist">
                <li className="nav-item" role="presentation">
                  <button 
                    className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                    type="button"
                  >
                    <i className="fas fa-info-circle me-2"></i>
                    Dispute Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                    type="button"
                  >
                    <i className="fas fa-comments me-2"></i>
                    Communication Logs
                    {chatMessages.length > 0 && (
                      <span className="badge bg-primary ms-2">{chatMessages.length}</span>
                    )}
                  </button>
                </li>
              </ul>

              <div className="modal-body">
                {/* Details Tab */}
                {activeTab === 'details' && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Dispute ID</label>
                      <p className="form-control-plaintext">{selectedDispute.disputeId}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Booking ID</label>
                      <p className="form-control-plaintext font-monospace">{selectedDispute.order}</p>
                    </div>
                    
                    {/* Reporter Information */}
                    <div className="col-12">
                      <hr className="my-2" />
                      <h6 className="text-muted mb-3"><i className="fas fa-user me-2"></i>Reporter (Filed Dispute)</h6>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Reporter Name</label>
                      <p className="form-control-plaintext">{(selectedDispute as any).reporterName || selectedDispute.customer}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Reporter Email</label>
                      <p className="form-control-plaintext">{(selectedDispute as any).reporterEmail || 'N/A'}</p>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label fw-medium">Reporter ID</label>
                      <p className="form-control-plaintext font-monospace small text-muted">{selectedDispute.reporterId}</p>
                    </div>
                    
                    {/* Reported User Information */}
                    <div className="col-12">
                      <hr className="my-2" />
                      <h6 className="text-muted mb-3"><i className="fas fa-user-times me-2"></i>Reported User</h6>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Reported User Name</label>
                      <p className="form-control-plaintext">{(selectedDispute as any).reportedUserName || 'Unknown'}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Reported User Email</label>
                      <p className="form-control-plaintext">{(selectedDispute as any).reportedUserEmail || 'N/A'}</p>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label fw-medium">Reported User ID</label>
                      <p className="form-control-plaintext font-monospace small text-muted">{selectedDispute.reportedUserId}</p>
                    </div>
                    
                    {/* Dispute Details */}
                    <div className="col-12">
                      <hr className="my-2" />
                      <h6 className="text-muted mb-3"><i className="fas fa-exclamation-triangle me-2"></i>Dispute Details</h6>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Issue Type</label>
                      <p className="form-control-plaintext">{selectedDispute.issue}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Evidence Count</label>
                      <p className="form-control-plaintext">
                        {(selectedDispute as any).evidenceCount || 0} file(s)
                      </p>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-medium">Description</label>
                      <p className="form-control-plaintext bg-light p-3 rounded">{selectedDispute.description}</p>
                    </div>
                    
                    {/* Evidence Images */}
                    {(selectedDispute as any).evidence && (selectedDispute as any).evidence.length > 0 ? (
                      <div className="col-12">
                        <label className="form-label fw-medium">Evidence Attachments</label>
                        <div className="row g-2">
                          {(selectedDispute as any).evidence.map((imageData: string, index: number) => (
                            <div key={index} className="col-md-4 col-sm-6">
                              <div className="card">
                                <img 
                                  src={imageData} 
                                  alt={`Evidence ${index + 1}`}
                                  className="card-img-top"
                                  style={{ 
                                    height: '200px', 
                                    objectFit: 'cover',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => {
                                    setSelectedImage(imageData);
                                    setSelectedImageIndex(index);
                                    setShowImageModal(true);
                                  }}
                                  onError={(e) => {
                                    console.error('Image load error for evidence', index);
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+';
                                  }}
                                />
                                <div className="card-body text-center p-2">
                                  <small className="text-muted">Evidence {index + 1}</small>
                                  <br />
                                  <button 
                                    className="btn btn-sm btn-outline-primary mt-1"
                                    onClick={() => {
                                      setSelectedImage(imageData);
                                      setSelectedImageIndex(index);
                                      setShowImageModal(true);
                                    }}
                                  >
                                    <i className="fas fa-search-plus me-1"></i>
                                    View Full Size
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="col-12">
                        <label className="form-label fw-medium">Evidence Attachments</label>
                        <p className="text-muted">No evidence files attached</p>
                      </div>
                    )}
                    
                    {/* Status Information */}
                    <div className="col-12">
                      <hr className="my-2" />
                      <h6 className="text-muted mb-3"><i className="fas fa-tasks me-2"></i>Status & Assignment</h6>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Status</label>
                      <p className="form-control-plaintext">
                        <span className={getStatusBadgeClass(selectedDispute.status)}>
                          {selectedDispute.status}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Priority</label>
                      <p className="form-control-plaintext">
                        <span className={getPriorityBadgeClass(selectedDispute.priority)}>
                          {selectedDispute.priority}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Date Created</label>
                      <p className="form-control-plaintext">{new Date(selectedDispute.dateCreated).toLocaleDateString()}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Last Updated</label>
                      <p className="form-control-plaintext">{new Date(selectedDispute.lastUpdated).toLocaleDateString()}</p>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label fw-medium">Assigned To</label>
                      <p className="form-control-plaintext">{selectedDispute.assignedTo}</p>
                    </div>
                  </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                  <div>
                    {loadingMessages ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading messages...</span>
                        </div>
                        <p className="mt-2 mb-0">Loading communication logs...</p>
                      </div>
                    ) : chatMessages.length > 0 ? (
                      <div>
                        <div className="alert alert-info mb-3">
                          <i className="fas fa-info-circle me-2"></i>
                          <strong>Participants:</strong> {reporterName} and {reportedName}
                        </div>
                        <div 
                          className="border rounded p-3" 
                          style={{ 
                            maxHeight: '500px', 
                            overflowY: 'auto',
                            backgroundColor: '#f8f9fa'
                          }}
                        >
                          {chatMessages.map((message, index) => {
                            const isReporter = message.senderId === selectedDispute.reporterId;
                            return (
                              <div 
                                key={message.id || index}
                                className={`d-flex mb-3 ${isReporter ? 'justify-content-start' : 'justify-content-end'}`}
                              >
                                <div 
                                  className={`card ${isReporter ? 'border-primary' : 'border-secondary'}`}
                                  style={{ maxWidth: '70%' }}
                                >
                                  <div className="card-body p-2">
                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                      <strong className={`${isReporter ? 'text-primary' : 'text-secondary'}`}>
                                        {isReporter ? reporterName : reportedName}
                                      </strong>
                                      <small className="text-muted ms-2">
                                        {conversationsService.formatMessageTimestamp(message.timestamp)}
                                      </small>
                                    </div>
                                    <p className="mb-0" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                      {message.text}
                                    </p>
                                    {message.type === 'image' && (
                                      <span className="badge bg-info mt-1">
                                        <i className="fas fa-image me-1"></i>Image
                                      </span>
                                    )}
                                    {message.type === 'file' && (
                                      <span className="badge bg-warning mt-1">
                                        <i className="fas fa-file me-1"></i>File
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-3 text-muted text-center">
                          <small>Total messages: {chatMessages.length}</small>
                        </div>
                      </div>
                    ) : (
                      <div className="alert alert-warning text-center">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        No communication logs found between these users.
                        {!selectedDispute.reporterId || !selectedDispute.reportedUserId ? (
                          <p className="mb-0 mt-2">
                            <small>Missing user IDs in dispute record.</small>
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditDispute(selectedDispute);
                  }}
                >
                  Edit Dispute
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dispute Modal */}
      {showEditModal && editingDispute && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Dispute</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="disputeId" className="form-label">Dispute ID</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="disputeId"
                      value={editingDispute.disputeId}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="disputeCustomer" className="form-label">Customer</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="disputeCustomer"
                      value={editingDispute.customer}
                      onChange={(e) => setEditingDispute({...editingDispute, customer: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="disputeOrder" className="form-label">Order</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="disputeOrder"
                      value={editingDispute.order}
                      onChange={(e) => setEditingDispute({...editingDispute, order: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="disputeIssue" className="form-label">Issue</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="disputeIssue"
                      value={editingDispute.issue}
                      onChange={(e) => setEditingDispute({...editingDispute, issue: e.target.value})}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="disputeDescription" className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      id="disputeDescription"
                      rows={3}
                      value={editingDispute.description}
                      onChange={(e) => setEditingDispute({...editingDispute, description: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="disputeStatus" className="form-label">Status</label>
                    <select 
                      className="form-select" 
                      id="disputeStatus"
                      value={editingDispute.status}
                      onChange={(e) => setEditingDispute({...editingDispute, status: e.target.value as DisputeData['status']})}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Escalated">Escalated</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="disputePriority" className="form-label">Priority</label>
                    <select 
                      className="form-select" 
                      id="disputePriority"
                      value={editingDispute.priority}
                      onChange={(e) => setEditingDispute({...editingDispute, priority: e.target.value as DisputeData['priority']})}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="disputeAssignedTo" className="form-label">Assigned To</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="disputeAssignedTo"
                      value={editingDispute.assignedTo}
                      onChange={(e) => setEditingDispute({...editingDispute, assignedTo: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleSaveDispute}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Size Image Modal */}
      {showImageModal && (
        <div 
          className="modal show d-block" 
          tabIndex={-1} 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1060 }}
          onClick={() => setShowImageModal(false)}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title text-white">
                  Evidence {selectedImageIndex + 1}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowImageModal(false)}
                ></button>
              </div>
              <div className="modal-body d-flex align-items-center justify-content-center p-0">
                <img 
                  src={selectedImage} 
                  alt={`Evidence ${selectedImageIndex + 1}`}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '90vh',
                    objectFit: 'contain'
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <a 
                  href={selectedImage} 
                  download={`evidence-${selectedImageIndex + 1}.jpg`}
                  className="btn btn-light"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-download me-2"></i>
                  Download Image
                </a>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowImageModal(false)}
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

export default DisputesPage;
