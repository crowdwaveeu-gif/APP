import { useEffect, useState } from 'react';
import { StaticContentService } from '../../services/staticContentService';
import { StaticContentType } from '../../types/staticContent';

interface StaticContentModalProps {
  type: StaticContentType;
  isOpen: boolean;
  onClose: () => void;
}

const StaticContentModal: React.FC<StaticContentModalProps> = ({ type, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadContent();
    }
  }, [isOpen, type]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await StaticContentService.getContentByType(type);
      
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      } else {
        setError('Content not available at the moment.');
        setTitle(getDefaultTitle(type));
        setContent('This content has not been published yet.');
      }
    } catch (err) {
      console.error('Error loading static content:', err);
      setError('Failed to load content. Please try again later.');
      setTitle(getDefaultTitle(type));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultTitle = (type: StaticContentType): string => {
    const titles: Record<StaticContentType, string> = {
      terms_of_service: 'Terms of Service',
      privacy_policy: 'Privacy Policy',
      faq: 'Frequently Asked Questions',
    };
    return titles[type] || 'Information';
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-lg modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading content...</p>
              </div>
            ) : error ? (
              <div className="alert alert-warning" role="alert">
                <i className="fa fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            ) : (
              <div 
                className="static-content"
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                  lineHeight: '1.6',
                  fontSize: '14px',
                }}
              />
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticContentModal;
