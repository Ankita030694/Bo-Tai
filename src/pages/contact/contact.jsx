import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavbarTwo from '../../components/Navbar/navbar2';
import Footer from '../../components/Footer/footer';
import FirestoreService from '../../services/firestore-service';
import { serverTimestamp } from 'firebase/firestore';
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
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } 

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      await FirestoreService.add("ContactQuries",{...formData,createdAt:serverTimestamp()})
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        notes: ''
      });
      setIsSubmitting(false);
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <>
    <NavbarTwo />
    <div className="min-h-screen bg-brown-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className='shadow-[-7px_-7px_14px_8px_rgba(8,_11,_14,_0.06)] bg-brown-200 p-6 rounded-lg'>
          <h1 className="text-5xl font-bold text-[#4A3427] mb-8">CONTACT US</h1>
          <p className="text-gray-600 mb-8">
          Seth Sarai, 6/4, Kalka Das Marg, Behind Qutub Minar
          Mehrauli, New Delhi, Delhi 110030
          </p>
         
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className='text-gray-600 mb-8s'>For franchisee enquiries contact
            Business Development and Franchising</p>
            <div className="flex items-center space-x-3">
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="text-[#4A3427]"
              >
                📧
              </motion.span>
              <span>franchising@massiverestaurants.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="text-[#4A3427]"
              >
                📞
              </motion.span>
              <span>+91 9870587770/71  011-20860051/52</span>
            </div>
          </motion.div>
          </div>
        </motion.div>
        

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-brown-200 rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold text-[#4A3427] mb-6">Get in touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="space-y-1"
            >
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full p-3 rounded-md border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#4A3427]`}
              />
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="space-y-1"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full p-3 rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#4A3427]`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="space-y-1"
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className={`w-full p-3 rounded-md border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#4A3427]`}
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  {errors.phone}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
            >
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes"
                rows="4"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A3427]"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-full bg-orange-100 text-white font-medium
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-100'}
                transition-all duration-200`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;