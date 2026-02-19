import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl opacity-90">Your privacy is important to us. Learn how we protect your data.</p>
            <p className="text-sm opacity-75 mt-2">Last updated: January 1, 2024</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Privacy Commitment */}
        <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
          <div className="flex items-start">
            <UserCheck className="h-6 w-6 text-green-600 mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Our Privacy Commitment</h3>
              <p className="text-green-700">
                CarRental is committed to protecting your privacy and ensuring the security of your personal information. 
                This policy explains how we collect, use, and safeguard your data.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="h-6 w-6 text-green-600 mr-2" />
              1. Information We Collect
            </h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Name, email address, and phone number</li>
                <li>Driver's license information</li>
                <li>Payment and billing information</li>
                <li>Address and location data</li>
                <li>Date of birth and age verification</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Website browsing behavior and preferences</li>
                <li>Booking history and rental patterns</li>
                <li>Device information and IP addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vehicle and Trip Data:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>GPS location during rental period</li>
                <li>Mileage and fuel consumption</li>
                <li>Vehicle condition reports</li>
                <li>Incident and damage reports</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 text-green-600 mr-2" />
              2. How We Use Your Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Provision:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Processing reservations and managing bookings</li>
                <li>Verifying identity and driver eligibility</li>
                <li>Processing payments and managing billing</li>
                <li>Providing customer support and assistance</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Sending booking confirmations and updates</li>
                <li>Providing important service notifications</li>
                <li>Marketing communications (with your consent)</li>
                <li>Responding to inquiries and feedback</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">Improvement and Analytics:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Analyzing usage patterns to improve services</li>
                <li>Personalizing your experience</li>
                <li>Conducting research and development</li>
                <li>Ensuring security and preventing fraud</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-1 mr-2" />
                  <p className="text-yellow-800">
                    <strong>We do not sell your personal information to third parties.</strong>
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We may share information with:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> Payment processors, insurance companies, and maintenance services</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong>Business Partners:</strong> With your explicit consent for specific services</li>
                <li><strong>Emergency Situations:</strong> To protect safety and prevent harm</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 text-green-600 mr-2" />
              4. Data Security
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement comprehensive security measures to protect your personal information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Technical Safeguards:</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• SSL/TLS encryption</li>
                    <li>• Secure data centers</li>
                    <li>• Regular security audits</li>
                    <li>• Access controls</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Administrative Safeguards:</h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Employee training</li>
                    <li>• Privacy policies</li>
                    <li>• Incident response plans</li>
                    <li>• Regular updates</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                While we strive to protect your information, no method of transmission over the internet 
                is 100% secure. We continuously update our security practices to address emerging threats.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">You have the right to:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correct:</strong> Update or correct inaccurate information</li>
                <li><strong>Delete:</strong> Request deletion of your personal data</li>
                <li><strong>Restrict:</strong> Limit how we process your information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Object:</strong> Opt-out of certain data processing activities</li>
              </ul>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">To exercise your rights:</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Email: privacy@carrental.com</li>
                  <li>• Phone: +91 9876543210</li>
                  <li>• Account settings in your dashboard</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              
              <div className="space-y-3">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                  <p className="text-gray-700 text-sm">Required for basic website functionality and security</p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Performance Cookies</h4>
                  <p className="text-gray-700 text-sm">Help us understand how visitors interact with our website</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
                  <p className="text-gray-700 text-sm">Used to deliver relevant advertisements (with your consent)</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                You can manage cookie preferences through your browser settings or our cookie consent tool.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your information only as long as necessary for the purposes outlined in this policy:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Account Information:</strong> Until account deletion or 7 years of inactivity</li>
                <li><strong>Booking Records:</strong> 7 years for legal and tax purposes</li>
                <li><strong>Payment Data:</strong> As required by financial regulations</li>
                <li><strong>Marketing Data:</strong> Until you opt-out or withdraw consent</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for individuals under 18 years of age. We do not knowingly 
                collect personal information from children. If we become aware that we have collected 
                information from a child, we will take steps to delete it promptly.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our practices or 
                applicable laws. We will notify you of significant changes through email or prominent 
                website notices. Your continued use of our services constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Privacy Officer:</strong> privacy@carrental.com</li>
                  <li><strong>Phone:</strong> +91 9876543210</li>
                  <li><strong>Address:</strong> CarRental Privacy Department, Mumbai, India</li>
                  <li><strong>Response Time:</strong> We will respond within 30 days</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Privacy Summary */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Privacy Summary</h3>
          <p className="text-green-800">
            We collect information to provide car rental services, protect it with industry-standard security, 
            share it only when necessary, and give you control over your data. Your privacy matters to us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;