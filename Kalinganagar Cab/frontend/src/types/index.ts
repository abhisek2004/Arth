export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  seating: number;
  pricePerDay: number;
  category: 'Indian' | 'Foreign';
  bodyType: 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'Convertible';
  images: string[];
  features: string[];
  mileage: string;
  available: boolean;
  location: string;
  rating: number;
  description: string;
}

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  customerName?: string;
  email?: string;
  phone?: string;
  drivingLicenseNumber?: string;
  licenseExpiryDate?: string;
  aadhaarCardNumber?: string;
  remark?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
}