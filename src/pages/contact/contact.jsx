import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavbarTwo from '../../components/Navbar/navbar2';
import Footer from '../../components/Footer/footer';
import FirestoreService from '../../services/firestore-service';
import { serverTimestamp } from 'firebase/firestore';
import Navbar from '../../components/Navbar/navbar';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required';

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Invalid phone number';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      await FirestoreService.add("ContactQuries", { ...formData, createdAt: serverTimestamp() });
      setFormData({ fullName: '', email: '', phone: '', notes: '' });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <NavbarTwo/>
      <div className="min-h-screen bg-[#f9f6f1] py-16 px-6 sm:px-8 lg:px-12 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className='shadow-lg bg-white p-8 rounded-lg'>
              <h1 className="text-4xl font-bold text-[#4A3427] mb-6">Contact Us</h1>
              <p className="text-gray-700 mb-6">
                Seth Sarai, 6/4, Kalka Das Marg, Behind Qutub Minar Mehrauli, New Delhi, Delhi 110030
              </p>
              <div className="space-y-4">
                <p className='text-gray-700'>For franchisee enquiries contact Business Development and Franchising:</p>
                <div className="flex items-center space-x-3">
                  <span className="text-[#4A3427]">📧</span>
                  <span className="text-gray-700">franchising@massiverestaurants.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#4A3427]">📞</span>
                  <span className="text-gray-700">+91 9870587770/71 | 011-20860051/52</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-[#4A3427] mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full p-4 rounded-md border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#4A3427]`}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full p-4 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#4A3427]`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`w-full p-4 rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#4A3427]`}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Message"
                rows="5"
                className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A3427]"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-4 rounded-md bg-[#4A3427] text-white font-semibold ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#3A2720]'} transition duration-200`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
