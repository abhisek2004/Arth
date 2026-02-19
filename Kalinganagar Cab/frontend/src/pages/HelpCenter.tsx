import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, MessageCircle, Phone, Mail } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a car?",
      answer: "To book a car, simply browse our available vehicles, select your preferred car, choose your rental dates, and complete the booking process. You'll need to create an account and provide valid identification."
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You'll need a valid driver's license, a government-issued ID (passport or national ID), and a credit card for security deposit. International customers may need an International Driving Permit."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 24 hours before your rental start time without any penalty. Cancellations made within 24 hours may incur a small fee."
    },
    {
      question: "What is included in the rental price?",
      answer: "The rental price includes basic insurance, unlimited mileage within city limits, and 24/7 roadside assistance. Fuel, tolls, and additional insurance coverage are not included."
    },
    {
      question: "How do I extend my rental period?",
      answer: "You can extend your rental period by contacting our customer support or through your booking dashboard, subject to vehicle availability and additional charges."
    },
    {
      question: "What happens if I return the car late?",
      answer: "Late returns are charged on an hourly basis. If you're more than 6 hours late, you'll be charged for an additional full day."
    },
    {
      question: "Is there a minimum age requirement?",
      answer: "Yes, the minimum age to rent a car is 21 years. Drivers under 25 may be subject to a young driver surcharge."
    },
    {
      question: "What if the car breaks down?",
      answer: "All our vehicles come with 24/7 roadside assistance. Simply call our emergency number, and we'll arrange for immediate help or a replacement vehicle."
    }
  ];

  const categories = [
    {
      title: "Booking & Reservations",
      icon: "📅",
      topics: ["How to book", "Modify booking", "Cancel booking", "Payment methods"]
    },
    {
      title: "Vehicle Information",
      icon: "🚗",
      topics: ["Car specifications", "Fuel policy", "Mileage limits", "Vehicle features"]
    },
    {
      title: "Pricing & Billing",
      icon: "💳",
      topics: ["Rental rates", "Additional fees", "Security deposit", "Refund policy"]
    },
    {
      title: "Policies & Terms",
      icon: "📋",
      topics: ["Terms of service", "Insurance coverage", "Age requirements", "Driver requirements"]
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl opacity-90 mb-8">Find answers to your questions and get the help you need</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-gray-600">No results found for "{searchQuery}". Try different keywords.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600">Our support team is here to assist you 24/7</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
              <a href="tel:+919876543210" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block">
                Call Now
              </a>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <Mail className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us an email and we'll respond soon</p>
              <a href="mailto:support@carrental.com" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block">
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;