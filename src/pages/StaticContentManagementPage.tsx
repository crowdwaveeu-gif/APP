import { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { StaticContentService } from '../services/staticContentService';
import { StaticContent, StaticContentType } from '../types/staticContent';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';

const StaticContentManagementPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [contents, setContents] = useState<StaticContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<StaticContent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'terms_of_service' as StaticContentType,
    title: '',
    content: '',
    isPublished: false,
  });

  const contentTypes = [
    { value: 'terms_of_service', label: 'Terms of Service' },
    { value: 'privacy_policy', label: 'Privacy Policy' },
    { value: 'faq', label: 'FAQs' },
  ];

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      setLoading(true);
      const data = await StaticContentService.getAllContent();
      setContents(data);
    } catch (error) {
      console.error('Error loading content:', error);
      toast.error('Failed to load static content');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (content?: StaticContent) => {
    if (content) {
      setEditingContent(content);
      setFormData({
        type: content.type,
        title: content.title,
        content: content.content,
        isPublished: content.isPublished,
      });
    } else {
      setEditingContent(null);
      setFormData({
        type: 'terms_of_service',
        title: '',
        content: '',
        isPublished: false,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContent(null);
    setFormData({
      type: 'terms_of_service',
      title: '',
      content: '',
      isPublished: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        toast.error('You must be logged in');
        return;
      }

      if (editingContent) {
        await StaticContentService.updateContent(
          editingContent.id,
          formData,
          user.uid
        );
        toast.success('Content updated successfully');
      } else {
        await StaticContentService.createContent(formData, user.uid);
        toast.success('Content created successfully');
      }

      handleCloseModal();
      loadContents();
    } catch (error: any) {
      console.error('Error saving content:', error);
      toast.error(error.message || 'Failed to save content');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    try {
      await StaticContentService.deleteContent(id);
      toast.success('Content deleted successfully');
      loadContents();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        toast.error('You must be logged in');
        return;
      }

      await StaticContentService.togglePublish(id, user.uid);
      loadContents();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      toast.error('Failed to toggle publish status');
    }
  };

  const getTypeBadge = (type: StaticContentType) => {
    const colors: Record<StaticContentType, string> = {
      terms_of_service: 'primary',
      privacy_policy: 'success',
      faq: 'info',
    };
    return colors[type] || 'secondary';
  };

  const getTypeLabel = (type: StaticContentType) => {
    return contentTypes.find((t) => t.value === type)?.label || type;
  };

  return (
    <div className={`main-content ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Static Content Management</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenModal()}
                >
                  <i className="fa fa-plus me-2"></i>
                  Add New Content
                </button>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : contents.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fa fa-file-text fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No static content available</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleOpenModal()}
                    >
                      Create First Content
                    </button>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Last Updated</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contents.map((content) => (
                          <tr key={content.id}>
                            <td>
                              <span className={`badge bg-${getTypeBadge(content.type)}`}>
                                {getTypeLabel(content.type)}
                              </span>
                            </td>
                            <td>{content.title}</td>
                            <td>
                              <span
                                className={`badge ${
                                  content.isPublished ? 'bg-success' : 'bg-warning'
                                }`}
                              >
                                {content.isPublished ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td>
                              {content.lastUpdated
                                ? new Date(content.lastUpdated).toLocaleDateString()
                                : 'N/A'}
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => handleOpenModal(content)}
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button
                                  className={`btn ${
                                    content.isPublished
                                      ? 'btn-outline-warning'
                                      : 'btn-outline-success'
                                  }`}
                                  onClick={() => handleTogglePublish(content.id)}
                                  title={content.isPublished ? 'Unpublish' : 'Publish'}
                                >
                                  <i
                                    className={`fa ${
                                      content.isPublished ? 'fa-eye-slash' : 'fa-eye'
                                    }`}
                                  ></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleDelete(content.id)}
                                  title="Delete"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingContent ? 'Edit Content' : 'Create New Content'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Content Type</label>
                    <select
                      className="form-select"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as StaticContentType })
                      }
                      disabled={!!editingContent}
                      required
                    >
                      {contentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {editingContent && (
                      <small className="text-muted">
                        Content type cannot be changed after creation
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="Enter title"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      rows={15}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      placeholder="Enter content (supports HTML)"
                      style={{ fontFamily: 'monospace', fontSize: '14px' }}
                    />
                    <small className="text-muted">
                      You can use HTML tags for formatting (e.g., &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;)
                    </small>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) =>
                        setFormData({ ...formData, isPublished: e.target.checked })
                      }
                    />
                    <label className="form-check-label" htmlFor="isPublished">
                      Publish immediately
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-save me-2"></i>
                    {editingContent ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticContentManagementPage;
