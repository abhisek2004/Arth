import React, { useState, useEffect } from 'react';
import { Car, Users, Calendar, TrendingUp, Plus, Edit, Trash2, X, Save, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Car as CarType, Booking, User } from '../../types';
import { mockCars } from '../../data/mockData';
import { generateTicketPDF } from '../../utils/generateTicketPDF';
import * as XLSX from 'xlsx';

const AdminDashboard: React.FC = () => {
  const { user, apiRequest } = useAuth();
  const [cars, setCars] = useState<CarType[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [carFormData, setCarFormData] = useState<Partial<CarType>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seating: 5,
    pricePerDay: 0,
    category: 'Indian',
    bodyType: 'SUV',
    images: ['', '', '', ''],
    features: [],
    mileage: '',
    available: true,
    location: 'Mumbai',
    rating: 4.0,
    description: ''
  });

  useEffect(() => {
    // Load initial data
    const storedCars = JSON.parse(localStorage.getItem('cars') || JSON.stringify(mockCars));
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    setCars(storedCars);
    setUsers(storedUsers);

    // Fetch bookings from API
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await apiRequest('http://localhost:5000/api/bookings');
      const data = await response.json();

      if (data.success) {
        // Map _id to id for frontend compatibility
        const bookingsWithId = data.bookings.map((booking: any) => ({
          ...booking,
          id: booking._id
        }));
        setBookings(bookingsWithId);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback to localStorage if API fails
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      // Ensure localStorage bookings also have id field mapped correctly
      const bookingsWithId = storedBookings.map((booking: any) => ({
        ...booking,
        id: booking.id || booking._id
      }));
      setBookings(bookingsWithId);
    }
  };

  // Refresh all data when needed
  const refreshAllData = () => {
    const storedCars = JSON.parse(localStorage.getItem('cars') || JSON.stringify(mockCars));
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    setCars(storedCars);
    setUsers(storedUsers);
    fetchBookings();
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalCars: cars.length,
    totalBookings: bookings.length,
    totalUsers: users.filter(u => u.role === 'user').length,
    revenue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)
  };

  const handleAddCar = () => {
    const newCar: CarType = {
      id: Date.now().toString(),
      brand: carFormData.brand || '',
      model: carFormData.model || '',
      year: carFormData.year || new Date().getFullYear(),
      color: carFormData.color || '',
      fuelType: carFormData.fuelType || 'Petrol',
      transmission: carFormData.transmission || 'Manual',
      seating: carFormData.seating || 5,
      pricePerDay: carFormData.pricePerDay || 0,
      category: carFormData.category || 'Indian',
      bodyType: carFormData.bodyType || 'SUV',
      images: carFormData.images?.filter(img => img.trim() !== '') || [],
      features: carFormData.features || [],
      mileage: carFormData.mileage || '',
      available: carFormData.available !== false,
      location: carFormData.location || 'Mumbai',
      rating: carFormData.rating || 4.0,
      description: carFormData.description || ''
    };

    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    setShowAddCarModal(false);
    resetCarForm();
  };

  const handleEditCar = () => {
    if (!editingCar) return;

    const updatedCar: CarType = {
      ...editingCar,
      brand: carFormData.brand || editingCar.brand,
      model: carFormData.model || editingCar.model,
      year: carFormData.year || editingCar.year,
      color: carFormData.color || editingCar.color,
      fuelType: carFormData.fuelType || editingCar.fuelType,
      transmission: carFormData.transmission || editingCar.transmission,
      seating: carFormData.seating || editingCar.seating,
      pricePerDay: carFormData.pricePerDay || editingCar.pricePerDay,
      category: carFormData.category || editingCar.category,
      bodyType: carFormData.bodyType || editingCar.bodyType,
      images: carFormData.images?.filter(img => img.trim() !== '') || editingCar.images,
      features: carFormData.features || editingCar.features,
      mileage: carFormData.mileage || editingCar.mileage,
      available: carFormData.available !== undefined ? carFormData.available : editingCar.available,
      location: carFormData.location || editingCar.location,
      rating: carFormData.rating || editingCar.rating,
      description: carFormData.description || editingCar.description
    };

    const updatedCars = cars.map(car => car.id === editingCar.id ? updatedCar : car);
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    setEditingCar(null);
    resetCarForm();
  };

  const deleteCar = (carId: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      const allCars = JSON.parse(localStorage.getItem('cars') || JSON.stringify(mockCars));
      const updatedCars = allCars.filter((car: any) => car.id !== carId);
      localStorage.setItem('cars', JSON.stringify(updatedCars));

      // Refresh all states
      setCars(updatedCars);
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const bookingsWithId = storedBookings.map((booking: any) => ({
        ...booking,
        id: booking.id || booking._id
      }));
      setBookings(bookingsWithId);
      setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await apiRequest(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Booking status updated successfully!');
        refreshAllData();
      } else {
        alert(data.message || 'Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status. Please try again.');
    }
  };

  // Function to get user name by ID
  const getUserName = (userId: string) => {
    const foundUser = users.find(u => u.id === userId);
    return foundUser ? foundUser.name : 'Unknown User';
  };

  const resetCarForm = () => {
    setCarFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      fuelType: 'Petrol',
      transmission: 'Manual',
      seating: 5,
      pricePerDay: 0,
      category: 'Indian',
      bodyType: 'SUV',
      images: ['', '', '', ''],
      features: [],
      mileage: '',
      available: true,
      location: 'Mumbai',
      rating: 4.0,
      description: ''
    });
  };

  const downloadTicket = (booking: Booking) => {
    // Get fresh data from localStorage to ensure we have the latest information
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
      refreshAllData();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const openEditModal = (car: CarType) => {
    setEditingCar(car);
    setCarFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      color: car.color,
      fuelType: car.fuelType,
      transmission: car.transmission,
      seating: car.seating,
      pricePerDay: car.pricePerDay,
      category: car.category,
      bodyType: car.bodyType,
      images: [...car.images, '', '', '', ''].slice(0, 4),
      features: car.features,
      mileage: car.mileage,
      available: car.available,
      location: car.location,
      rating: car.rating,
      description: car.description
    });
  };

  const getCarName = (carId: string) => {
    const foundCar = cars.find(c => c.id === carId);
    return foundCar ? `${foundCar.brand} ${foundCar.model}` : 'Unknown Car';
  };

  const exportBookingsToExcel = () => {
    // Prepare data for export
    const exportData = bookings.map(booking => {
      const car = cars.find(c => c.id === booking.carId);
      const user = users.find(u => u.id === booking.userId);

      return {
        'Booking ID': booking.id,
        'Customer Name': booking.customerName || (user ? user.name : 'Unknown'),
        'Email': booking.email || (user ? user.email : 'N/A'),
        'Phone': booking.phone || (user ? user.phone : 'N/A'),
        'Driving License': booking.drivingLicenseNumber || 'N/A',
        'License Expiry': booking.licenseExpiryDate || 'N/A',
        'Aadhaar Card': booking.aadhaarCardNumber || 'N/A',
        'Car': car ? `${car.brand} ${car.model}` : 'Unknown',
        'Pickup Location': booking.pickupLocation,
        'Drop-off Location': booking.dropoffLocation,
        'Start Date': booking.startDate,
        'End Date': booking.endDate,
        'Duration (Days)': Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24)),
        'Total Price': `₹${booking.totalPrice}`,
        'Status': booking.status,
        'Remarks': booking.remark || 'N/A',
        'Booking Date': new Date(booking.createdAt).toLocaleDateString()
      };
    });

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');

    // Export to file
    XLSX.writeFile(wb, `bookings-export-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const CarFormModal = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Car' : 'Add New Car'}
            </h2>
            <button
              onClick={() => {
                setShowAddCarModal(false);
                setEditingCar(null);
                resetCarForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Brand *</label>
              <input
                type="text"
                value={carFormData.brand}
                onChange={(e) => setCarFormData({ ...carFormData, brand: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Tata, BMW, Tesla"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Model *</label>
              <input
                type="text"
                value={carFormData.model}
                onChange={(e) => setCarFormData({ ...carFormData, model: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Nexon, 3 Series, Model 3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Year *</label>
              <input
                type="number"
                value={carFormData.year}
                onChange={(e) => setCarFormData({ ...carFormData, year: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="2000"
                max="2025"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Color *</label>
              <input
                type="text"
                value={carFormData.color}
                onChange={(e) => setCarFormData({ ...carFormData, color: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Pearl White, Jet Black"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Fuel Type *</label>
              <select
                value={carFormData.fuelType}
                onChange={(e) => setCarFormData({ ...carFormData, fuelType: e.target.value as any })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Transmission *</label>
              <select
                value={carFormData.transmission}
                onChange={(e) => setCarFormData({ ...carFormData, transmission: e.target.value as any })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Seating Capacity *</label>
              <input
                type="number"
                value={carFormData.seating}
                onChange={(e) => setCarFormData({ ...carFormData, seating: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="2"
                max="8"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Price per Day (₹) *</label>
              <input
                type="number"
                value={carFormData.pricePerDay}
                onChange={(e) => setCarFormData({ ...carFormData, pricePerDay: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Category *</label>
              <select
                value={carFormData.category}
                onChange={(e) => setCarFormData({ ...carFormData, category: e.target.value as any })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Indian">Indian</option>
                <option value="Foreign">Foreign</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Body Type *</label>
              <select
                value={carFormData.bodyType}
                onChange={(e) => setCarFormData({ ...carFormData, bodyType: e.target.value as any })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Location *</label>
              <select
                value={carFormData.location}
                onChange={(e) => setCarFormData({ ...carFormData, location: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Mileage *</label>
              <input
                type="text"
                value={carFormData.mileage}
                onChange={(e) => setCarFormData({ ...carFormData, mileage: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 15.5 km/l, 400 km range"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Car Images (URLs)</label>
            <div className="space-y-2">
              {carFormData.images?.map((image, index) => (
                <input
                  key={index}
                  type="url"
                  value={image}
                  onChange={(e) => {
                    const newImages = [...(carFormData.images || [])];
                    newImages[index] = e.target.value;
                    setCarFormData({ ...carFormData, images: newImages });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Image ${index + 1} URL`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Features (comma-separated)</label>
            <input
              type="text"
              value={carFormData.features?.join(', ')}
              onChange={(e) => setCarFormData({ ...carFormData, features: e.target.value.split(',').map(f => f.trim()).filter(f => f) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., AC, Power Steering, ABS, Airbags"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={carFormData.description}
              onChange={(e) => setCarFormData({ ...carFormData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Brief description of the car"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              checked={carFormData.available}
              onChange={(e) => setCarFormData({ ...carFormData, available: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="available" className="block ml-2 text-sm text-gray-900">
              Available for booking
            </label>
          </div>
        </div>

        <div className="flex justify-end p-6 space-x-4 border-t border-gray-200">
          <button
            onClick={() => {
              setShowAddCarModal(false);
              setEditingCar(null);
              resetCarForm();
            }}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? handleEditCar : handleAddCar}
            className="flex items-center px-6 py-2 space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            <span>{isEdit ? 'Update Car' : 'Add Car'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('cars')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'cars' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Cars
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Bookings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
              <div className="p-6 bg-white shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Cars</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCars}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Car</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">User</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Customer Name</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Dates</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Status</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Amount</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Ticket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="px-4 py-3">{getCarName(booking.carId)}</td>
                        <td className="px-4 py-3">{getUserName(booking.userId)}</td>
                        <td className="px-4 py-3">{booking.customerName || getUserName(booking.userId)}</td>
                        <td className="px-4 py-3">{booking.startDate} to {booking.endDate}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">₹{booking.totalPrice}</td>
                        <td className="px-4 py-3">
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => downloadTicket(booking)}
                              className="flex items-center px-3 py-1 space-x-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                              <Download className="w-4 h-4" />
                              <span>PDF</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cars' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Cars</h2>
              <button
                onClick={() => setShowAddCarModal(true)}
                className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Car</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <div key={car.id} className="overflow-hidden bg-white shadow-lg rounded-xl">
                  <img
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                      {car.brand} {car.model}
                    </h3>
                    <p className="mb-2 text-gray-600">₹{car.pricePerDay}/day</p>
                    <p className="mb-4 text-sm text-gray-500">
                      {car.fuelType} • {car.transmission} • {car.seating} seats
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(car)}
                        className="flex items-center justify-center flex-1 px-4 py-2 space-x-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteCar(car.id)}
                        className="flex items-center justify-center flex-1 px-4 py-2 space-x-1 text-white bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Bookings</h2>
              <button
                onClick={exportBookingsToExcel}
                className="flex items-center px-4 py-2 space-x-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                <span>Export to Excel</span>
              </button>
            </div>
            <div className="overflow-hidden bg-white shadow-lg rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Car</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">User</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Customer Name</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Dates</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Location</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Status</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Amount</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Actions</th>
                      <th className="px-4 py-3 font-medium text-left text-gray-600">Ticket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="px-4 py-3">{getCarName(booking.carId)}</td>
                        <td className="px-4 py-3">{getUserName(booking.userId)}</td>
                        <td className="px-4 py-3">{booking.customerName || getUserName(booking.userId)}</td>
                        <td className="px-4 py-3">{booking.startDate} to {booking.endDate}</td>
                        <td className="px-4 py-3">{booking.pickupLocation}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">₹{booking.totalPrice}</td>
                        <td className="px-4 py-3">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => downloadTicket(booking)}
                              className="flex items-center px-3 py-1 space-x-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                              <Download className="w-4 h-4" />
                              <span>PDF</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && <CarFormModal />}

      {/* Edit Car Modal */}
      {editingCar && <CarFormModal isEdit={true} />}
    </div>
  );
};

export default AdminDashboard;