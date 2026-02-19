import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Fuel, Users, Star, MapPin } from 'lucide-react';
import { Car as CarType } from '../types';

interface CarCardProps {
  car: CarType;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1">
      <div className="relative">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="object-cover w-full h-48"
        />
        <div className="absolute px-3 py-1 bg-white rounded-full top-4 right-4 bg-opacity-90 backdrop-blur-sm">
          <span className="text-sm font-semibold text-gray-800">{car.category}</span>
        </div>
        <div className="absolute px-3 py-1 bg-black bg-opacity-50 rounded-full bottom-4 left-4 backdrop-blur-sm">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-white">{car.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
            <p className="text-gray-600">{car.year} • {car.color}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">₹{car.pricePerDay}</p>
            <p className="text-sm text-gray-500">per day</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Fuel className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{car.fuelType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{car.seating} seats</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{car.location}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {car.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        <Link
          to={`/cars`}
          className="block w-full px-6 py-3 font-semibold text-center text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default CarCard;