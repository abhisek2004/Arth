import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockCars } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const CarDetail: React.FC = () => {
  const navigate = useNavigate();
  const { user, apiRequest } = useAuth();
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropoffLocation: '',
    customerName: '',
    email: '',
    phone: '',
    remark: '',
    drivingLicenseNumber: '',
    licenseExpiryDate: '',
    aadhaarCardNumber: ''
  });

  // Use a default car for demonstration
  const car = mockCars[0];

  const calculateDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 1;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  const totalPrice = car.pricePerDay * calculateDays();

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      alert('Please log in to book a car');
      navigate('/login');
      return;
    }

    if (
      !bookingData.startDate ||
      !bookingData.endDate ||
      !bookingData.pickupLocation ||
      !bookingData.customerName ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.drivingLicenseNumber ||
      !bookingData.licenseExpiryDate ||
      !bookingData.aadhaarCardNumber
    ) {
      alert('Please fill in all required fields');
      return;
    }

    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }

    try {
      const response = await apiRequest('http://localhost:5000/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          carId: car.id,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          pickupLocation: bookingData.pickupLocation,
          dropoffLocation:
            bookingData.dropoffLocation || bookingData.pickupLocation,
          customerName: bookingData.customerName,
          email: bookingData.email,
          phone: bookingData.phone,
          remark: bookingData.remark,
          drivingLicenseNumber: bookingData.drivingLicenseNumber,
          licenseExpiryDate: bookingData.licenseExpiryDate,
          aadhaarCardNumber: bookingData.aadhaarCardNumber,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Booking created successfully!');
        navigate('/bookings', { state: { newBooking: true } });
      } else {
        alert(data.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  // For direct booking without authentication

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center mb-4 space-x-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Book a Car
              </h1>
              <p className="mt-1 text-gray-600">Complete your booking details below</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">₹{car.pricePerDay}</p>
              <p className="text-gray-500">per day</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-3xl sm:px-6 lg:px-8">
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Book This Car</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Customer Name *
              </label>
              <input
                type="text"
                value={bookingData.customerName}
                onChange={(e) => setBookingData({ ...bookingData, customerName: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter customer name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Driving License Number *
              </label>
              <input
                type="text"
                value={bookingData.drivingLicenseNumber}
                onChange={(e) => setBookingData({ ...bookingData, drivingLicenseNumber: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter driving license number"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                License Expiry Date *
              </label>
              <input
                type="date"
                value={bookingData.licenseExpiryDate}
                onChange={(e) => setBookingData({ ...bookingData, licenseExpiryDate: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Pickup Location *
              </label>
              <input
                type="text"
                value={bookingData.pickupLocation}
                onChange={(e) => setBookingData({ ...bookingData, pickupLocation: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter pickup location"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Drop-off Location
              </label>
              <input
                type="text"
                value={bookingData.dropoffLocation}
                onChange={(e) => setBookingData({ ...bookingData, dropoffLocation: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Same as pickup location"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Start Date *
              </label>
              <input
                type="date"
                value={bookingData.startDate}
                onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                End Date *
              </label>
              <input
                type="date"
                value={bookingData.endDate}
                onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Remark
              </label>
              <textarea
                value={bookingData.remark}
                onChange={(e) => setBookingData({ ...bookingData, remark: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional remarks"
                rows={3}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Aadhaar Card Number *
              </label>
              <input
                type="text"
                value={bookingData.aadhaarCardNumber}
                onChange={(e) => setBookingData({ ...bookingData, aadhaarCardNumber: e.target.value })}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Aadhaar card number"
                required
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Daily Rate</span>
                <span className="font-semibold">₹{car.pricePerDay}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold">{calculateDays()} days</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-lg font-bold border-t">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{totalPrice}</span>
              </div>
            </div>

            <div className="p-4 mt-4 bg-yellow-50 border-l-4 border-yellow-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important Information:</strong><br />
                    • Valid driving license is mandatory at pickup<br />
                    • Minimum age required: 21 years<br />
                    • Driving License Number is mandatory for car rental<br />
                    • License Expiry Date is required<br />
                    • Aadhaar Card details required for processing<br />
                    • Fuel charges are not included<br />
                    • Cancellation allowed up to 24 hours before pickup<br />
                    • Late return will be charged per extra day<br />
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  id="terms-and-conditions"
                  name="terms-and-conditions"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms-and-conditions" className="font-medium text-gray-700">
                  I agree to the <a href="/terms" className="text-blue-600 hover:text-blue-500">Terms & Conditions</a>
                </label>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="px-6 py-3 w-full font-semibold text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
