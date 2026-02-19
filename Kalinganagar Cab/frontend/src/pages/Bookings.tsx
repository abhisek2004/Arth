import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, MapPin, Car, Clock, CheckCircle, XCircle, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Booking, User } from '../types';
import { mockCars } from '../data/mockData';
import { generateTicketPDF } from '../utils/generateTicketPDF';

const Bookings: React.FC = () => {
  const { user, apiRequest } = useAuth();
  const location = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }

    if (location.state?.newBooking) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [user, location.state]);

  const fetchUserBookings = async () => {
    try {
      const response = await apiRequest('http://localhost:5000/api/bookings/my-bookings');
      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback to localStorage if API fails
      if (user) {
        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const userBookings = allBookings.filter((booking: Booking) => booking.userId === user.id);
        setBookings(userBookings);
      }
    }
  };

  // Refresh bookings when needed
  const refreshBookings = () => {
    if (user) {
      fetchUserBookings();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const response = await apiRequest(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Booking cancelled successfully!');
        refreshBookings();
      } else {
        alert(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const downloadTicket = (booking: Booking) => {
    const allCars = JSON.parse(localStorage.getItem('cars') || JSON.stringify(mockCars));

    const car = allCars.find((c: any) => c.id === booking.carId);

    if (!car) {
      console.error('Car not found for booking:', booking.carId);
      alert('Vehicle information not found. Cannot generate ticket.');
      return;
    }

    // Create user data from booking information
    const userData: User = {
      id: booking.userId,
      name: booking.customerName || 'Unknown Customer',
      email: booking.email || 'unknown@email.com',
      phone: booking.phone || 'N/A',
      password: '',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    try {
      generateTicketPDF({ ...booking, customerName: booking.customerName }, car, userData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate ticket. Please try again.');
    }
  };

  // Add storage event listener for backward compatibility
  useEffect(() => {
    const handleStorageChange = () => {
      if (user) {
        fetchUserBookings();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Please log in to view your bookings</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-1 text-gray-600">View and manage your car rentals</p>
        </div>
      </div>

      {showSuccess && (
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              <p className="text-green-700">Booking created successfully! Your booking is now pending confirmation.</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {bookings.length === 0 ? (
          <div className="py-12 text-center">
            <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">No bookings yet</h2>
            <p className="text-gray-600">Start by browsing our amazing car collection</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const car = mockCars.find(c => c.id === booking.carId);
              if (!car) return null;

              return (
                <div key={booking.id} className="overflow-hidden bg-white shadow-lg rounded-xl">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="object-cover w-full h-48 md:h-full"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {car.brand} {car.model}
                          </h3>
                          <p className="text-gray-600">{car.year} • {car.color}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="capitalize">{booking.status}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {booking.startDate} to {booking.endDate}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{booking.pickupLocation}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">₹{booking.totalPrice}</p>
                          <p className="text-sm text-gray-500">Total Amount</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => cancelBooking(booking.id)}
                              className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                            >
                              Cancel Booking
                            </button>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => downloadTicket(booking)}
                              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download Ticket</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;