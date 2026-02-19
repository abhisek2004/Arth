import React, { useState } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [searchData, setSearchData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    startDate: '',
    endDate: ''
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/cars?${queryParams.toString()}`);
  };

  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Find Your Perfect
            <span className="text-blue-300"> Ride</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing cars from premium brands at unbeatable prices
          </p>
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
              <input
                type="text"
                placeholder="Pickup Location"
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 backdrop-blur-md rounded-lg text-white placeholder-gray-300 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchData.pickupLocation}
                onChange={(e) => setSearchData({...searchData, pickupLocation: e.target.value})}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
              <input
                type="text"
                placeholder="Drop-off Location"
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 backdrop-blur-md rounded-lg text-white placeholder-gray-300 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchData.dropoffLocation}
                onChange={(e) => setSearchData({...searchData, dropoffLocation: e.target.value})}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 backdrop-blur-md rounded-lg text-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchData.startDate}
                onChange={(e) => setSearchData({...searchData, startDate: e.target.value})}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 backdrop-blur-md rounded-lg text-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchData.endDate}
                onChange={(e) => setSearchData({...searchData, endDate: e.target.value})}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Search Cars</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;