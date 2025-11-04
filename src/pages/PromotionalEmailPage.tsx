import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, query, where } from "firebase/firestore";
import { db, auth, functions } from "../services/firebase";
import { httpsCallable } from "firebase/functions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EmailCampaign {
  id?: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  targetAudience: string;
  status: 'draft' | 'sending' | 'completed';
  sentCount?: number;
  failedCount?: number;
  createdAt?: Date;
  completedAt?: Date;
}

// Predefined campaign templates
const campaignTemplates = {
  welcome: {
    subject: '🎉 Welcome to CrowdWave - Your Delivery Journey Starts Here!',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to CrowdWave!</h1>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Dear CrowdWave Member,</p>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Thank you for joining CrowdWave! We're excited to have you as part of our community connecting senders and travelers for seamless package delivery.</p>
          <p style="font-size: 16px; color: #333; line-height: 1.6;"><strong>What's Next?</strong></p>
          <ul style="font-size: 16px; color: #333; line-height: 1.8;">
            <li>Complete your profile to get started</li>
            <li>Browse available delivery opportunities</li>
            <li>Connect with verified travelers and senders</li>
            <li>Start earning or saving on deliveries</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://crowdwave.eu" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Get Started Now</a>
          </div>
          <p style="font-size: 14px; color: #666; line-height: 1.6;">Need help? Contact us at support@crowdwave.eu</p>
        </div>
      </div>
    `,
    textContent: 'Welcome to CrowdWave! Thank you for joining our community. Get started by completing your profile and exploring delivery opportunities.'
  },
  promotion: {
    subject: '🚀 Special Offer: Save 20% on Your Next Delivery!',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">🎁 Limited Time Offer!</h1>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #667eea; text-align: center;">Save 20% on Your Next Delivery</h2>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">We're rewarding our loyal CrowdWave community with an exclusive discount!</p>
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #856404;">Use code: <span style="color: #667eea;">CROWD20</span></p>
          </div>
          <p style="font-size: 16px; color: #333; line-height: 1.6;"><strong>Offer Details:</strong></p>
          <ul style="font-size: 16px; color: #333; line-height: 1.8;">
            <li>Valid for the next 7 days</li>
            <li>Applicable on all delivery services</li>
            <li>No minimum order required</li>
            <li>Can be combined with traveler rewards</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://crowdwave.eu" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Claim Your Discount</a>
          </div>
        </div>
      </div>
    `,
    textContent: 'Save 20% on your next delivery with code CROWD20. Valid for 7 days. Visit crowdwave.eu to claim your discount.'
  },
  update: {
    subject: '📢 New Features: Enhanced Tracking & Real-Time Updates',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">🎉 We've Upgraded!</h1>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Hi there,</p>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">We're excited to announce new features that make CrowdWave even better!</p>
          <h3 style="color: #667eea;">✨ What's New:</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 10px 0; font-size: 16px;"><strong>📍 Enhanced GPS Tracking</strong><br/>Track your packages in real-time with improved accuracy</p>
            <p style="margin: 10px 0; font-size: 16px;"><strong>💬 In-App Messaging</strong><br/>Communicate directly with travelers and senders</p>
            <p style="margin: 10px 0; font-size: 16px;"><strong>🔔 Smart Notifications</strong><br/>Get instant updates on delivery status changes</p>
            <p style="margin: 10px 0; font-size: 16px;"><strong>⭐ Rating System</strong><br/>Build trust with verified reviews and ratings</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://crowdwave.eu" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Explore New Features</a>
          </div>
        </div>
      </div>
    `,
    textContent: 'New features now available: Enhanced GPS tracking, in-app messaging, smart notifications, and rating system. Update your app to experience the improvements!'
  }
};

const PromotionalEmailPage = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [currentCampaign, setCurrentCampaign] = useState<EmailCampaign>({
    subject: '',
    htmlContent: '',
    textContent: '',
    targetAudience: 'all',
    status: 'draft'
  });

  // Rich text editor modules
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  useEffect(() => {
    // Monitor auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      if (user) {
        console.log('User authenticated:', user.email);
      } else {
        console.log('No user authenticated');
      }
    });

    fetchCampaigns();

    return () => unsubscribe();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const campaignsRef = collection(db, 'emailCampaigns');
      const snapshot = await getDocs(campaignsRef);
      const campaignsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convert Firestore Timestamp to Date if needed
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
          completedAt: data.completedAt?.toDate ? data.completedAt.toDate() : data.completedAt,
        };
      }) as EmailCampaign[];
      
      setCampaigns(campaignsData.sort((a, b) => {
        const timeA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
        const timeB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
        return timeB - timeA;
      }));
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      alert('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const saveCampaign = async () => {
    if (!currentCampaign.subject || !currentCampaign.htmlContent) {
      alert('Please fill in subject and content');
      return;
    }

    try {
      setLoading(true);
      
      const campaignData = {
        ...currentCampaign,
        createdAt: new Date(),
        status: 'draft' as const
      };

      if (currentCampaign.id) {
        // Update existing campaign
        await updateDoc(doc(db, 'emailCampaigns', currentCampaign.id), campaignData);
        alert('Campaign updated successfully!');
      } else {
        // Create new campaign
        await addDoc(collection(db, 'emailCampaigns'), campaignData);
        alert('Campaign saved as draft!');
      }

      setShowEditor(false);
      setCurrentCampaign({
        subject: '',
        htmlContent: '',
        textContent: '',
        targetAudience: 'all',
        status: 'draft'
      });
      fetchCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Failed to save campaign');
    } finally {
      setLoading(false);
    }
  };

  const sendCampaign = async (campaign: EmailCampaign) => {
    if (!campaign.id) return;

    // Check if user is authenticated
    if (!auth.currentUser) {
      alert('You must be logged in to send campaigns. Please refresh the page and log in again.');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to send this campaign to ${campaign.targetAudience} users?`
    );
    
    if (!confirmed) return;

    try {
      setSending(true);

      // Update campaign status to sending
      await updateDoc(doc(db, 'emailCampaigns', campaign.id), {
        status: 'sending'
      });

      // Fetch recipients based on target audience
      let recipients: string[] = [];
      
      if (campaign.targetAudience === 'all') {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        recipients = snapshot.docs
          .map(doc => doc.data().email)
          .filter(email => email);
      } else if (campaign.targetAudience === 'senders') {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', 'sender'));
        const snapshot = await getDocs(q);
        recipients = snapshot.docs
          .map(doc => doc.data().email)
          .filter(email => email);
      } else if (campaign.targetAudience === 'travelers') {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', 'traveler'));
        const snapshot = await getDocs(q);
        recipients = snapshot.docs
          .map(doc => doc.data().email)
          .filter(email => email);
      }

      if (recipients.length === 0) {
        alert('No recipients found for this audience');
        await updateDoc(doc(db, 'emailCampaigns', campaign.id), {
          status: 'draft'
        });
        return;
      }

      // Call Firebase Function to send emails
      const sendPromotionalEmail = httpsCallable(functions, 'sendPromotionalEmail');
      
      const result = await sendPromotionalEmail({
        recipients: recipients,
        subject: campaign.subject,
        htmlContent: campaign.htmlContent,
        textContent: campaign.textContent || 'Please view this email in HTML format',
        campaignId: campaign.id
      });

      const resultData = result.data as { sent: number; failed: number };
      
      alert(
        `Campaign sent!\nSuccessfully sent: ${resultData.sent}\nFailed: ${resultData.failed}`
      );
      
      fetchCampaigns();
    } catch (error: any) {
      console.error('Error sending campaign:', error);
      alert(`Failed to send campaign: ${error.message}`);
      
      // Revert status to draft on error
      if (campaign.id) {
        await updateDoc(doc(db, 'emailCampaigns', campaign.id), {
          status: 'draft'
        });
      }
    } finally {
      setSending(false);
    }
  };

  const editCampaign = (campaign: EmailCampaign) => {
    setCurrentCampaign(campaign);
    setShowEditor(true);
  };

  const newCampaign = () => {
    setCurrentCampaign({
      subject: '',
      htmlContent: '',
      textContent: '',
      targetAudience: 'all',
      status: 'draft'
    });
    setShowTemplates(true);
  };

  const useTemplate = (templateKey: keyof typeof campaignTemplates) => {
    const template = campaignTemplates[templateKey];
    setCurrentCampaign({
      ...currentCampaign,
      subject: template.subject,
      htmlContent: template.htmlContent,
      textContent: template.textContent
    });
    setShowTemplates(false);
    setShowEditor(true);
  };

  const startBlankCampaign = () => {
    setShowTemplates(false);
    setShowEditor(true);
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        {!isAuthenticated && (
          <div className="alert alert-warning mb-3" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            <strong>Authentication Required:</strong> You must be logged in to send promotional emails. 
            Please make sure you're signed in to the CRM system.
          </div>
        )}
        
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-envelope-paper me-2"></i>
              Promotional Email Campaigns
            </h5>
            <button 
              className="btn btn-primary"
              onClick={newCampaign}
              disabled={showEditor || showTemplates}
            >
              <i className="bi bi-plus-circle me-2"></i>
              New Campaign
            </button>
          </div>

          {showTemplates ? (
            <div className="card-body">
              <h6 className="mb-3">Choose a Template</h6>
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="card h-100 border-primary" style={{cursor: 'pointer'}} onClick={() => useTemplate('welcome')}>
                    <div className="card-body text-center">
                      <i className="bi bi-hand-wave" style={{fontSize: '48px', color: '#667eea'}}></i>
                      <h6 className="mt-3">Welcome Email</h6>
                      <p className="text-muted small">Greet new users joining CrowdWave</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-success" style={{cursor: 'pointer'}} onClick={() => useTemplate('promotion')}>
                    <div className="card-body text-center">
                      <i className="bi bi-gift" style={{fontSize: '48px', color: '#28a745'}}></i>
                      <h6 className="mt-3">Promotional Offer</h6>
                      <p className="text-muted small">Special discounts and offers</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-info" style={{cursor: 'pointer'}} onClick={() => useTemplate('update')}>
                    <div className="card-body text-center">
                      <i className="bi bi-megaphone" style={{fontSize: '48px', color: '#17a2b8'}}></i>
                      <h6 className="mt-3">Feature Update</h6>
                      <p className="text-muted small">Announce new features and improvements</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-secondary me-2" onClick={startBlankCampaign}>
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Start with Blank Template
                </button>
                <button className="btn btn-secondary" onClick={() => setShowTemplates(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : showEditor ? (
            <div className="card-body">
              <h6 className="mb-3">
                {currentCampaign.id ? 'Edit Campaign' : 'Create New Campaign'}
              </h6>
              
              <div className="mb-3">
                <label className="form-label">Campaign Subject</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentCampaign.subject}
                  onChange={(e) => setCurrentCampaign({
                    ...currentCampaign,
                    subject: e.target.value
                  })}
                  placeholder="Enter email subject..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Target Audience</label>
                <select
                  className="form-select"
                  value={currentCampaign.targetAudience}
                  onChange={(e) => setCurrentCampaign({
                    ...currentCampaign,
                    targetAudience: e.target.value
                  })}
                >
                  <option value="all">All Users</option>
                  <option value="senders">Senders Only</option>
                  <option value="travelers">Travelers Only</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Email Content (HTML)</label>
                <ReactQuill
                  theme="snow"
                  value={currentCampaign.htmlContent}
                  onChange={(content) => setCurrentCampaign({
                    ...currentCampaign,
                    htmlContent: content
                  })}
                  modules={modules}
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Plain Text Version (Optional)</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={currentCampaign.textContent}
                  onChange={(e) => setCurrentCampaign({
                    ...currentCampaign,
                    textContent: e.target.value
                  })}
                  placeholder="Plain text version for email clients that don't support HTML..."
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={saveCampaign}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i>
                      Save as Draft
                    </>
                  )}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditor(false);
                    setCurrentCampaign({
                      subject: '',
                      htmlContent: '',
                      textContent: '',
                      targetAudience: 'all',
                      status: 'draft'
                    });
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : campaigns.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-envelope-x display-1 text-muted"></i>
                  <p className="text-muted mt-3">No campaigns yet. Create your first campaign!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Target Audience</th>
                        <th>Status</th>
                        <th>Sent / Failed</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td>
                            <strong>{campaign.subject}</strong>
                          </td>
                          <td>
                            <span className="badge bg-info">
                              {campaign.targetAudience}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${
                              campaign.status === 'completed' ? 'bg-success' :
                              campaign.status === 'sending' ? 'bg-warning' :
                              'bg-secondary'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td>
                            {campaign.status === 'completed' ? (
                              <span>
                                <span className="text-success">{campaign.sentCount || 0}</span>
                                {' / '}
                                <span className="text-danger">{campaign.failedCount || 0}</span>
                              </span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            {campaign.createdAt ? 
                              new Date(campaign.createdAt).toLocaleDateString() 
                              : '-'
                            }
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {campaign.status === 'draft' && (
                                <>
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => editCampaign(campaign)}
                                    disabled={sending}
                                    title="Edit campaign"
                                  >
                                    <i className="bi bi-pencil me-1"></i>
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => sendCampaign(campaign)}
                                    disabled={sending}
                                    title="Send campaign"
                                  >
                                    {sending ? (
                                      <>
                                        <span className="spinner-border spinner-border-sm me-1"></span>
                                        Sending...
                                      </>
                                    ) : (
                                      <>
                                        <i className="bi bi-send me-1"></i>
                                        Send
                                      </>
                                    )}
                                  </button>
                                </>
                              )}
                              {campaign.status === 'completed' && (
                                <button
                                  className="btn btn-sm btn-info"
                                  onClick={() => editCampaign(campaign)}
                                  title="View campaign"
                                >
                                  <i className="bi bi-eye me-1"></i>
                                  View
                                </button>
                              )}
                              {campaign.status === 'sending' && (
                                <span className="badge bg-warning text-dark">
                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                  Sending in progress...
                                </span>
                              )}
                            </div>
                          </td>
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

      {/* Instructions Card */}
      <div className="col-12">
        <div className="card border-info">
          <div className="card-header bg-info text-white">
            <i className="bi bi-info-circle me-2"></i>
            How to Use Promotional Emails
          </div>
          <div className="card-body">
            <ol className="mb-0">
              <li>Click <strong>"New Campaign"</strong> to create a promotional email</li>
              <li>Write your subject line and email content using the rich text editor</li>
              <li>Select your target audience (All Users, Senders Only, or Travelers Only)</li>
              <li>Click <strong>"Save as Draft"</strong> to save your campaign</li>
              <li>Click the <strong>Send</strong> button when ready to send the campaign</li>
              <li>Monitor sent and failed counts after completion</li>
            </ol>
            <hr />
            <p className="mb-0 text-muted">
              <i className="bi bi-shield-check me-2"></i>
              <small>Only admin users can send promotional emails. All emails are sent from nauman@crowdwave.eu</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalEmailPage;
