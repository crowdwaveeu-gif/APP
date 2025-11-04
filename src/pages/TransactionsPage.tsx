import { useState, useMemo, useEffect } from 'react';
import { getAllTransactions, TransactionData, updateTransaction, deleteTransaction } from '../services/dataService';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<TransactionData>>({});
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch transactions from Firebase
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const itemsPerPage = 10;

  // Filter and search logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const matchesSearch = txn.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           txn.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           txn.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           txn.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || txn.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesType = typeFilter === 'All' || txn.type.toLowerCase() === typeFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [transactions, searchTerm, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewTransaction = (txn: TransactionData) => {
    setSelectedTransaction(txn);
    setShowViewModal(true);
  };

  const handleEditTransaction = (txn: TransactionData) => {
    setSelectedTransaction(txn);
    const formData: Partial<TransactionData> = {
      status: txn.status,
      type: txn.type,
      amount: txn.amount,
      description: txn.description,
      paymentMethod: txn.paymentMethod
    };
    
    setEditFormData(formData);
    setShowEditModal(true);
  };

  const handleUpdateTransaction = async () => {
    if (!selectedTransaction) return;
    
    setActionLoading(true);
    try {
      await updateTransaction(selectedTransaction.id, editFormData);
      
      // Refresh transactions list
      const updatedTransactions = await getAllTransactions();
      setTransactions(updatedTransactions);
      
      setShowEditModal(false);
      setSelectedTransaction(null);
      alert('Transaction updated successfully!');
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Failed to update transaction. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTransaction = (txn: TransactionData) => {
    setSelectedTransaction(txn);
    setShowDeleteModal(true);
  };

  const confirmDeleteTransaction = async () => {
    if (!selectedTransaction) return;
    
    setActionLoading(true);
    try {
      await deleteTransaction(selectedTransaction.id);
      
      // Refresh transactions list
      const updatedTransactions = await getAllTransactions();
      setTransactions(updatedTransactions);
      
      setShowDeleteModal(false);
      setSelectedTransaction(null);
      alert('Transaction deleted successfully!');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csv = [
      'Transaction ID,User ID,User Name,User Email,Type,Amount,Currency,Status,Payment Method,Description,Related Booking,Related Package,Created At,Updated At',
      ...filteredTransactions.map(txn => 
        `${txn.id},${txn.userId},${txn.userName || 'N/A'},${txn.userEmail || 'N/A'},${txn.type},${txn.amount},${txn.currency || 'USD'},${txn.status},${txn.paymentMethod || 'N/A'},${txn.description || 'N/A'},${txn.relatedBookingId || 'N/A'},${txn.relatedPackageId || 'N/A'},${txn.createdAt.toLocaleDateString()},${txn.updatedAt?.toLocaleDateString() || 'N/A'}`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'failed':
      case 'cancelled':
        return 'badge bg-danger';
      case 'refunded':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'payment':
        return 'badge bg-primary';
      case 'refund':
        return 'badge bg-info';
      case 'deposit':
        return 'badge bg-success';
      case 'withdrawal':
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  };

  const getStatusText = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatAmount = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Transactions Management</h5>
              <div className="d-flex gap-2">
                <select 
                  className="form-select form-select-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="All">All Types</option>
                  <option value="payment">Payment</option>
                  <option value="refund">Refund</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                </select>
                <select 
                  className="form-select form-select-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
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
                    placeholder="Search transactions..."
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
                  <p className="mt-2 text-muted">Loading transactions...</p>
                </div>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>User</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Payment Method</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-4">
                          <div className="text-muted">
                            <i className="fas fa-inbox fa-3x mb-3"></i>
                            <p>No transactions found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedTransactions.map((txn) => (
                        <tr key={txn.id}>
                          <td>
                            <small className="text-muted">{txn.id.substring(0, 8)}...</small>
                          </td>
                          <td>
                            <div>
                              <strong>{txn.userName || 'Unknown'}</strong>
                              {txn.userEmail && (
                                <div className="text-muted small">{txn.userEmail}</div>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className={getTypeBadgeClass(txn.type)}>
                              {getStatusText(txn.type)}
                            </span>
                          </td>
                          <td>
                            <strong>{formatAmount(txn.amount, txn.currency)}</strong>
                          </td>
                          <td>
                            <span className={getStatusBadgeClass(txn.status)}>
                              {getStatusText(txn.status)}
                            </span>
                          </td>
                          <td>{txn.paymentMethod || 'N/A'}</td>
                          <td>
                            <small>{txn.createdAt.toLocaleDateString()}</small>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-info"
                                onClick={() => handleViewTransaction(txn)}
                                title="View Details"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleEditTransaction(txn)}
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteTransaction(txn)}
                                title="Delete"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedTransaction && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transaction Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Transaction ID</label>
                    <p className="form-control-plaintext">{selectedTransaction.id}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">User ID</label>
                    <p className="form-control-plaintext">{selectedTransaction.userId}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">User Name</label>
                    <p className="form-control-plaintext">{selectedTransaction.userName || 'N/A'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">User Email</label>
                    <p className="form-control-plaintext">{selectedTransaction.userEmail || 'N/A'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Type</label>
                    <p className="form-control-plaintext">
                      <span className={getTypeBadgeClass(selectedTransaction.type)}>
                        {getStatusText(selectedTransaction.type)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Amount</label>
                    <p className="form-control-plaintext">
                      {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Status</label>
                    <p className="form-control-plaintext">
                      <span className={getStatusBadgeClass(selectedTransaction.status)}>
                        {getStatusText(selectedTransaction.status)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Payment Method</label>
                    <p className="form-control-plaintext">{selectedTransaction.paymentMethod || 'N/A'}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">Description</label>
                    <p className="form-control-plaintext">{selectedTransaction.description || 'N/A'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Related Booking ID</label>
                    <p className="form-control-plaintext">{selectedTransaction.relatedBookingId || 'N/A'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Related Package ID</label>
                    <p className="form-control-plaintext">{selectedTransaction.relatedPackageId || 'N/A'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Created At</label>
                    <p className="form-control-plaintext">{selectedTransaction.createdAt.toLocaleString()}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Updated At</label>
                    <p className="form-control-plaintext">{selectedTransaction.updatedAt?.toLocaleString() || 'N/A'}</p>
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

      {/* Edit Modal */}
      {showEditModal && selectedTransaction && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Transaction</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    value={editFormData.type}
                    onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                  >
                    <option value="payment">Payment</option>
                    <option value="refund">Refund</option>
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editFormData.amount}
                    onChange={(e) => setEditFormData({ ...editFormData, amount: parseFloat(e.target.value) })}
                    step="0.01"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editFormData.paymentMethod || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, paymentMethod: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  />
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
                  onClick={handleUpdateTransaction}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Updating...
                    </>
                  ) : (
                    'Update Transaction'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTransaction && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this transaction?</p>
                <div className="alert alert-warning">
                  <strong>Transaction ID:</strong> {selectedTransaction.id}
                  <br />
                  <strong>Amount:</strong> {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
                  <br />
                  <strong>User:</strong> {selectedTransaction.userName || selectedTransaction.userId}
                </div>
                <p className="text-danger">This action cannot be undone.</p>
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
                  onClick={confirmDeleteTransaction}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Deleting...
                    </>
                  ) : (
                    'Delete Transaction'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
