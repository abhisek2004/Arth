import React from 'react';
import { Shield, AlertTriangle, FileText, Clock } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl opacity-90">Please read these terms carefully before using our services</p>
            <p className="text-sm opacity-75 mt-2">Last updated: January 1, 2024</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700">
                By accessing and using CarRental services, you agree to be bound by these Terms and Conditions. 
                If you do not agree with any part of these terms, please do not use our services.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms and Conditions ("Terms") govern your use of the CarRental website and services. 
                By creating an account, making a reservation, or using our services, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You must be at least 21 years old to rent a vehicle</li>
                <li>You must possess a valid driver's license</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Rental Requirements</h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Driver Requirements:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Minimum age of 21 years (additional fees may apply for drivers under 25)</li>
                <li>Valid driver's license held for at least 1 year</li>
                <li>Clean driving record with no major violations</li>
                <li>Valid credit card for security deposit</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Documents:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Government-issued photo ID (passport, national ID, or driver's license)</li>
                <li>Valid driver's license</li>
                <li>Credit card in the renter's name</li>
                <li>International Driving Permit (for international customers)</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking and Payment</h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reservations:</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All reservations are subject to vehicle availability. We reserve the right to substitute 
                a vehicle of similar or higher category if the reserved vehicle becomes unavailable.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Terms:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Payment is required at the time of booking</li>
                <li>Security deposit will be held on your credit card</li>
                <li>Additional charges may apply for extras, damages, or violations</li>
                <li>Refunds are processed according to our cancellation policy</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Vehicle Use and Restrictions</h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Permitted Use:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Personal and business use within the rental period</li>
                <li>Operation by authorized drivers only</li>
                <li>Compliance with all traffic laws and regulations</li>
                <li>Use within geographical boundaries specified in the agreement</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prohibited Activities:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Racing, rallying, or any competitive driving</li>
                <li>Transporting illegal substances or materials</li>
                <li>Subletting or unauthorized commercial use</li>
                <li>Driving under the influence of alcohol or drugs</li>
                <li>Off-road driving (unless specifically permitted)</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Insurance and Liability</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                All rental vehicles include basic insurance coverage. However, renters are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Deductible amounts as specified in the rental agreement</li>
                <li>Damages not covered by insurance</li>
                <li>Personal belongings left in the vehicle</li>
                <li>Traffic violations and fines incurred during the rental period</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-6 w-6 text-blue-600 mr-2" />
              6. Cancellation Policy
            </h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Cancellation Timeline:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  <li><strong>More than 24 hours:</strong> Full refund</li>
                  <li><strong>12-24 hours:</strong> 50% cancellation fee</li>
                  <li><strong>Less than 12 hours:</strong> No refund</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Cancellations must be made through your account dashboard or by contacting customer service. 
                Refunds will be processed within 5-7 business days.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                CarRental's liability is limited to the maximum extent permitted by law. We are not liable for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages exceeding the total rental fee paid</li>
                <li>Acts of nature, theft, or vandalism beyond our control</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modifications to Terms</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                upon posting on our website. Continued use of our services after changes constitutes acceptance 
                of the modified Terms. We recommend reviewing these Terms periodically.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Email:</strong> legal@carrental.com</li>
                  <li><strong>Phone:</strong> +91 9876543210</li>
                  <li><strong>Address:</strong> CarRental Legal Department, Mumbai, India</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Agreement Confirmation */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Agreement Confirmation</h3>
          <p className="text-blue-800">
            By using CarRental services, you confirm that you have read, understood, and agree to these 
            Terms and Conditions. These terms constitute a legally binding agreement between you and CarRental.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;