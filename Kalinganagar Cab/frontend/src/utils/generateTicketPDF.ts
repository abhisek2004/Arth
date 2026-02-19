import jsPDF from 'jspdf';

interface BookingDetails {
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

interface CarDetails {
  brand: string;
  model: string;
  year: number;
  color: string;
  fuelType: string;
  transmission: string;
  seating: number;
  pricePerDay: number;
  location: string;
  rating: number;
  description: string;
  bodyType: string;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  password?: string;
  id: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export const generateTicketPDF = (
  booking: BookingDetails,
  car: CarDetails,
  user: UserDetails
) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(26, 115, 232);
  doc.text('Kalinganagar Cab', 105, 20, { align: 'center' });

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Booking Confirmation Ticket', 105, 30, { align: 'center' });

  // Booking Info
  doc.setFontSize(12);
  doc.setTextColor(55, 65, 81);
  doc.text(`Booking ID: ${booking.id}`, 20, 45);
  doc.text(`Booking Date: ${new Date(booking.createdAt).toLocaleDateString()}`, 20, 52);

  // Customer Info
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text('Customer Information', 20, 65);

  doc.setFontSize(12);
  doc.setTextColor(55, 65, 81);
  doc.text(`Name: ${booking.customerName || user.name}`, 20, 72);
  doc.text(`Email: ${booking.email || user.email || 'N/A'}`, 20, 79);
  doc.text(`Phone: ${booking.phone || user.phone || 'N/A'}`, 20, 86);
  doc.text(`Driving License: ${booking.drivingLicenseNumber || 'N/A'}`, 20, 93);
  doc.text(`License Expiry: ${booking.licenseExpiryDate || 'N/A'}`, 20, 100);
  doc.text(`Aadhaar Card: ${booking.aadhaarCardNumber || 'N/A'}`, 20, 107);

  // Car Info
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text('Vehicle Information', 20, 120);

  doc.setFontSize(12);
  doc.setTextColor(55, 65, 81);
  doc.text(`Brand: ${car.brand}`, 20, 127);
  doc.text(`Model: ${car.model}`, 20, 134);
  doc.text(`Year: ${car.year}`, 20, 141);
  doc.text(`Color: ${car.color}`, 20, 148);
  doc.text(`Fuel Type: ${car.fuelType}`, 20, 155);
  doc.text(`Transmission: ${car.transmission}`, 20, 162);
  doc.text(`Seating: ${car.seating} seats`, 20, 169);
  doc.text(`Body Type: ${car.bodyType}`, 20, 176);
  doc.text(`Location: ${car.location}`, 20, 183);

  // Booking Dates and Locations
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text('Booking Details', 20, 195);

  doc.setFontSize(12);
  doc.setTextColor(55, 65, 81);
  doc.text(`Pickup Date: ${new Date(booking.startDate).toLocaleDateString()}`, 20, 202);
  doc.text(`Drop-off Date: ${new Date(booking.endDate).toLocaleDateString()}`, 20, 209);
  doc.text(`Pickup Location: ${booking.pickupLocation}`, 20, 216);
  doc.text(`Drop-off Location: ${booking.dropoffLocation}`, 20, 223);
  
  // Additional Remarks
  if (booking.remark) {
    doc.text(`Remarks: ${booking.remark}`, 20, 230);
  }

  // Pricing
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text('Pricing', 20, 245);

  doc.setFontSize(12);
  doc.setTextColor(55, 65, 81);
  doc.text(`Daily Rate: ₹${car.pricePerDay}`, 20, 252);
  const days = Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24));
  doc.text(`Duration: ${days} days`, 20, 259);
  doc.text(`Total Amount: ₹${booking.totalPrice}`, 20, 266);

  // Status
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text('Status', 20, 280);

  // Draw status badge
  const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
  let statusColor = '#EF4444'; // cancelled/red
  if (booking.status === 'confirmed') statusColor = '#10B981'; // confirmed/green
  if (booking.status === 'pending') statusColor = '#F59E0B'; // pending/yellow
  if (booking.status === 'completed') statusColor = '#3B82F6'; // completed/blue

  doc.setFillColor(statusColor);
  doc.rect(20, 284, 40, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(statusText, 25, 292);

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Important Information
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text('Important Information', 20, 305);
  
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text('• Valid driving license is mandatory at pickup', 20, 312);
  doc.text('• Minimum age required: 21 years', 20, 319);
  doc.text('• Driving License Number is mandatory for car rental', 20, 326);
  doc.text('• License Expiry Date is required', 20, 333);
  doc.text('• Aadhaar Card details required for processing', 20, 340);
  doc.text('• Fuel charges are not included', 20, 347);
  doc.text('• Cancellation allowed up to 24 hours before pickup', 20, 354);
  doc.text('• Late return will be charged per extra day', 20, 361);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text('Thank you for choosing Kalinganagar Cab!', 105, 375, { align: 'center' });
  doc.text('For any queries, contact us at support@kalinganagarcab.com', 105, 380, { align: 'center' });

  // Add watermark
  doc.setFontSize(40);
  doc.setTextColor(229, 231, 235);
  doc.text('CONFIRMED', 200, 150, { angle: 45 });

  // Save the PDF
  doc.save(`booking-ticket-${booking.id}.pdf`);
};