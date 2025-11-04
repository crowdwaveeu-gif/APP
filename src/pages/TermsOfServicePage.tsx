const TermsOfServicePage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">
              <i className="bi bi-file-text me-2"></i>
              Terms of Service
            </h4>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <p className="text-muted">
                <strong>Last Updated:</strong> November 4, 2025
              </p>
              <p className="text-muted">
                <strong>Effective Date:</strong> November 4, 2025
              </p>
            </div>

            <section className="mb-4">
              <h5 className="text-primary mb-3">1. Agreement to Terms</h5>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you and CrowdWave ("Company," "we," "us," or "our") governing your access to and use of the CrowdWave platform, including our mobile application and website (collectively, the "Platform").
              </p>
              <p>
                By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Platform.
              </p>
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <strong>Important:</strong> Please read these Terms carefully before using the Platform. They contain important information about your legal rights, remedies, and obligations.
              </div>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">2. Description of Service</h5>
              <p>
                CrowdWave is a peer-to-peer logistics platform that connects individuals who need to send packages ("Senders") with travelers who can transport them ("Travelers"). The Platform facilitates:
              </p>
              <ul>
                <li>Posting and browsing delivery requests</li>
                <li>Matching Senders with Travelers</li>
                <li>In-app communication and coordination</li>
                <li>Payment processing and fund transfers</li>
                <li>Package tracking and delivery confirmation</li>
                <li>User ratings and reviews</li>
              </ul>
              <p>
                <strong>Note:</strong> CrowdWave is a platform provider only. We do not provide delivery services directly, and we are not a party to the agreements between Senders and Travelers.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">3. Eligibility</h5>
              <p>To use the Platform, you must:</p>
              <ul>
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be prohibited from using the Platform under applicable laws</li>
                <li>Not have been previously banned or suspended from the Platform</li>
                <li>Provide accurate and complete registration information</li>
                <li>Complete identity verification when required</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">4. User Accounts</h5>
              
              <h6 className="mt-3">4.1 Account Registration</h6>
              <p>
                You must create an account to use certain features of the Platform. You agree to:
              </p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>

              <h6 className="mt-3">4.2 Account Verification</h6>
              <p>
                We may require you to complete identity verification before accessing certain features. This may include:
              </p>
              <ul>
                <li>Email and phone number verification</li>
                <li>Government-issued ID verification</li>
                <li>Address verification</li>
                <li>Background checks (for certain user categories)</li>
              </ul>

              <h6 className="mt-3">4.3 Account Suspension and Termination</h6>
              <p>
                We reserve the right to suspend or terminate your account at any time for:
              </p>
              <ul>
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Multiple user complaints</li>
                <li>Failure to complete verification</li>
                <li>Any other reason at our sole discretion</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">5. Sender Responsibilities</h5>
              <p>As a Sender, you agree to:</p>
              <ul>
                <li>Provide accurate package descriptions, dimensions, and weight</li>
                <li>Ensure packages comply with all applicable laws and regulations</li>
                <li>Properly package items to prevent damage during transport</li>
                <li>Disclose any special handling requirements</li>
                <li>Meet Travelers at agreed-upon times and locations</li>
                <li>Pay agreed-upon fees promptly</li>
                <li>Not send prohibited items (see Section 7)</li>
                <li>Obtain necessary insurance for valuable items</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">6. Traveler Responsibilities</h5>
              <p>As a Traveler, you agree to:</p>
              <ul>
                <li>Provide accurate travel information and availability</li>
                <li>Handle packages with reasonable care</li>
                <li>Comply with all customs and import/export regulations</li>
                <li>Deliver packages to the specified recipient</li>
                <li>Update delivery status in real-time</li>
                <li>Refuse packages that appear suspicious or prohibited</li>
                <li>Maintain communication with Senders</li>
                <li>Follow agreed-upon delivery terms</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">7. Prohibited Items and Activities</h5>
              
              <h6 className="mt-3">7.1 Prohibited Items</h6>
              <p>The following items are strictly prohibited on the Platform:</p>
              <ul>
                <li>Illegal drugs, narcotics, or controlled substances</li>
                <li>Weapons, firearms, ammunition, or explosives</li>
                <li>Stolen goods or counterfeit items</li>
                <li>Hazardous or flammable materials</li>
                <li>Live animals or perishable goods (unless specified)</li>
                <li>Items that violate intellectual property rights</li>
                <li>Pornographic or obscene materials</li>
                <li>Currency or monetary instruments above legal limits</li>
                <li>Items restricted by customs or aviation regulations</li>
              </ul>

              <h6 className="mt-3">7.2 Prohibited Activities</h6>
              <ul>
                <li>Using the Platform for illegal purposes</li>
                <li>Misrepresenting package contents</li>
                <li>Harassing or threatening other users</li>
                <li>Creating fake accounts or reviews</li>
                <li>Attempting to circumvent payment systems</li>
                <li>Scraping or data mining</li>
                <li>Interfering with Platform operations</li>
                <li>Reverse engineering or hacking</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">8. Payments and Fees</h5>
              
              <h6 className="mt-3">8.1 Platform Fees</h6>
              <p>
                CrowdWave charges a service fee on completed transactions. Current fee structure:
              </p>
              <ul>
                <li>Sender fee: 5% of delivery price (minimum €2)</li>
                <li>Traveler fee: 10% of delivery earnings</li>
                <li>Payment processing fees (as charged by Stripe)</li>
              </ul>

              <h6 className="mt-3">8.2 Payment Processing</h6>
              <p>
                All payments are processed securely through Stripe. By using the Platform, you agree to Stripe's terms and conditions.
              </p>

              <h6 className="mt-3">8.3 Refunds and Cancellations</h6>
              <ul>
                <li>Cancellations more than 24 hours before pickup: Full refund</li>
                <li>Cancellations within 24 hours: 50% cancellation fee</li>
                <li>No-shows: No refund</li>
                <li>Failed deliveries due to Traveler fault: Full refund to Sender</li>
                <li>Disputes: Resolved through our dispute resolution process</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">9. Liability and Insurance</h5>
              
              <h6 className="mt-3">9.1 Platform Liability</h6>
              <p>
                CrowdWave is a platform provider only. We are not responsible for:
              </p>
              <ul>
                <li>Loss, damage, or delay of packages</li>
                <li>Actions or inactions of Senders or Travelers</li>
                <li>Quality, safety, or legality of packages</li>
                <li>Ability of users to complete transactions</li>
                <li>Accuracy of user-provided information</li>
              </ul>

              <h6 className="mt-3">9.2 User Liability</h6>
              <p>
                Users are solely responsible for their actions on the Platform. You agree to indemnify CrowdWave against any claims arising from your use of the Platform.
              </p>

              <h6 className="mt-3">9.3 Insurance</h6>
              <p>
                CrowdWave provides basic insurance coverage up to €100 per package. For higher value items, we recommend:
              </p>
              <ul>
                <li>Purchasing additional insurance</li>
                <li>Using shipping services for valuables</li>
                <li>Obtaining proof of value before shipping</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">10. Dispute Resolution</h5>
              <p>
                In case of disputes between users:
              </p>
              <ul>
                <li>Contact our support team at support@crowdwave.eu</li>
                <li>Provide evidence (photos, messages, tracking data)</li>
                <li>Allow up to 7 business days for investigation</li>
                <li>Accept CrowdWave's decision as final</li>
              </ul>
              <p>
                For disputes with CrowdWave, both parties agree to attempt mediation before pursuing legal action.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">11. Intellectual Property</h5>
              <p>
                All content on the Platform, including logos, text, graphics, and software, is owned by CrowdWave or our licensors and protected by intellectual property laws. You may not:
              </p>
              <ul>
                <li>Copy or reproduce Platform content</li>
                <li>Use our trademarks without permission</li>
                <li>Create derivative works</li>
                <li>Reverse engineer our software</li>
              </ul>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">12. Privacy</h5>
              <p>
                Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data practices.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">13. Modifications to Terms</h5>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of material changes by:
              </p>
              <ul>
                <li>Posting updated Terms on the Platform</li>
                <li>Sending email notification</li>
                <li>Displaying in-app notification</li>
              </ul>
              <p>
                Continued use of the Platform after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">14. Disclaimers</h5>
              <div className="alert alert-warning">
                <p>
                  THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="mb-0">
                  WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
                </p>
              </div>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">15. Limitation of Liability</h5>
              <div className="alert alert-danger">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, CROWDWAVE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="mb-0">
                  OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT OF FEES PAID BY YOU TO CROWDWAVE IN THE 12 MONTHS PRECEDING THE CLAIM.
                </p>
              </div>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">16. Governing Law</h5>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the European Union and the jurisdiction where CrowdWave is registered, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-4">
              <h5 className="text-primary mb-3">17. Contact Information</h5>
              <p>
                For questions about these Terms, please contact us:
              </p>
              <div className="bg-light p-3 rounded">
                <p className="mb-2"><strong>CrowdWave Legal Department</strong></p>
                <p className="mb-2"><i className="bi bi-envelope me-2"></i>Email: <a href="mailto:legal@crowdwave.eu">legal@crowdwave.eu</a></p>
                <p className="mb-2"><i className="bi bi-envelope me-2"></i>Support: <a href="mailto:support@crowdwave.eu">support@crowdwave.eu</a></p>
                <p className="mb-0"><i className="bi bi-globe me-2"></i>Website: <a href="https://crowdwave.eu" target="_blank" rel="noopener noreferrer">www.crowdwave.eu</a></p>
              </div>
            </section>

            <div className="alert alert-info mt-4">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Questions?</strong> If you have any questions about these Terms of Service, please contact our support team. We're here to help!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
