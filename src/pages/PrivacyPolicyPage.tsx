const PrivacyPolicyPage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">
              <i className="bi bi-shield-check me-2"></i>
              Privacy Policy
            </h4>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <p className="text-muted">
                <strong>Last Updated:</strong> November 4, 2025
              </p>
            </div>

            <section className="mb-4">
              <h5 className="text-primary mb-3">1. Introduction</h5>
              <p>
                Welcome to CrowdWave ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform that connects package senders with travelers for delivery services.
              </p>
              <p>
                By using CrowdWave, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">2. Information We Collect</h5>
              
              <h6 className="mt-3">2.1 Personal Information</h6>
              <p>We collect information that you provide directly to us, including:</p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, phone number, date of birth</li>
                <li><strong>Profile Information:</strong> Profile picture, bio, preferences</li>
                <li><strong>Verification Information:</strong> Government-issued ID, address verification documents</li>
                <li><strong>Payment Information:</strong> Bank account details, payment card information (processed securely through Stripe)</li>
                <li><strong>Delivery Information:</strong> Package details, pickup and delivery addresses, tracking preferences</li>
              </ul>

              <h6 className="mt-3">2.2 Automatically Collected Information</h6>
              <ul>
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Location Data:</strong> GPS coordinates when using our app (with your permission)</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
                <li><strong>Communication Data:</strong> Messages sent through our in-app chat system</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">3. How We Use Your Information</h5>
              <p>We use the collected information for various purposes:</p>
              <ul>
                <li>To provide and maintain our service</li>
                <li>To facilitate package delivery connections between senders and travelers</li>
                <li>To process payments and prevent fraud</li>
                <li>To verify user identity and ensure platform security</li>
                <li>To send notifications about your deliveries, bookings, and account activity</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To improve our service through analytics and user feedback</li>
                <li>To comply with legal obligations and enforce our terms</li>
                <li>To send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">4. Information Sharing and Disclosure</h5>
              
              <h6 className="mt-3">4.1 With Other Users</h6>
              <p>
                When you accept a delivery or offer to transport a package, certain information is shared with the other party:
              </p>
              <ul>
                <li>Name and profile picture</li>
                <li>User ratings and reviews</li>
                <li>Relevant contact information for coordination</li>
                <li>Real-time location during active deliveries (if enabled)</li>
              </ul>

              <h6 className="mt-3">4.2 With Service Providers</h6>
              <p>We share information with trusted third-party service providers:</p>
              <ul>
                <li><strong>Payment Processing:</strong> Stripe for secure payment transactions</li>
                <li><strong>Cloud Storage:</strong> Firebase for data storage and authentication</li>
                <li><strong>Analytics:</strong> Google Analytics for platform improvement</li>
                <li><strong>Communication:</strong> Email service providers for notifications</li>
                <li><strong>Identity Verification:</strong> KYC service providers for user verification</li>
              </ul>

              <h6 className="mt-3">4.3 Legal Requirements</h6>
              <p>
                We may disclose your information if required by law, court order, or governmental request, or if we believe disclosure is necessary to:
              </p>
              <ul>
                <li>Comply with legal obligations</li>
                <li>Protect our rights or property</li>
                <li>Prevent fraud or security threats</li>
                <li>Protect the safety of our users or the public</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">5. Data Security</h5>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and monitoring</li>
                <li>PCI-DSS compliant payment processing</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-muted">
                <small>
                  <strong>Note:</strong> While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </small>
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">6. Your Rights and Choices</h5>
              <p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from promotional communications</li>
                <li><strong>Location Services:</strong> Disable GPS tracking in your device settings</li>
              </ul>
              <p>
                To exercise these rights, please contact us at <a href="mailto:privacy@crowdwave.eu">privacy@crowdwave.eu</a>
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">7. Data Retention</h5>
              <p>
                We retain your personal information for as long as necessary to:
              </p>
              <ul>
                <li>Provide our services to you</li>
                <li>Comply with legal obligations (e.g., tax records for 7 years)</li>
                <li>Resolve disputes and enforce our agreements</li>
                <li>Maintain security and prevent fraud</li>
              </ul>
              <p>
                When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal purposes.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">8. International Data Transfers</h5>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">9. Children's Privacy</h5>
              <p>
                CrowdWave is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">10. Cookies and Tracking Technologies</h5>
              <p>
                We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">11. Changes to This Privacy Policy</h5>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul>
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending an email notification for significant changes</li>
              </ul>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted on this page.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">12. Contact Us</h5>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-light p-3 rounded">
                <p className="mb-2"><strong>CrowdWave</strong></p>
                <p className="mb-2"><i className="bi bi-envelope me-2"></i>Email: <a href="mailto:privacy@crowdwave.eu">privacy@crowdwave.eu</a></p>
                <p className="mb-2"><i className="bi bi-envelope me-2"></i>Support: <a href="mailto:support@crowdwave.eu">support@crowdwave.eu</a></p>
                <p className="mb-0"><i className="bi bi-globe me-2"></i>Website: <a href="https://crowdwave.eu" target="_blank" rel="noopener noreferrer">www.crowdwave.eu</a></p>
              </div>
            </section>

            <div className="alert alert-info mt-4">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Your Privacy Matters:</strong> We are committed to transparency and protecting your personal information. If you have concerns about how your data is being used, please don't hesitate to reach out to our privacy team.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
