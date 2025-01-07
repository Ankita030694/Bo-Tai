import React, { useState, useEffect } from 'react';
import FirestoreService from '../../services/firestore-service';
import reserve from '../../assets/formbg.png';
import loadingAnimation from '../../assets/loader-old.json'
import Lottie from 'lottie-react';
const ReservationForm = () => {
  const [outlets, setOutlets] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slotName, setslotName] = useState("Lunch");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    persons: '1',
    date: '',
    timeSlot: '',
    timing: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getOutlets();
  }, []);

  const handleLunchTime = (field, slot) => {
    console.log('Lunch Time Slots');
    handleInputChange("timing", slot);
  };

  const handleDinnerTime = (field, slot) => {
    console.log('Dinner Time');
    handleInputChange("timing", slot);
  };
  
  async function getOutlets() {
    const outletsData = await FirestoreService.getAll("Constraints");
    setOutlets(outletsData);
    setLoading(false)
    if (outletsData.length > 0) {
      setSelectedOutlet(outletsData[0]);
      setTimeSlots(outletsData[0].timeSlots);
    }
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!selectedOutlet) {
      newErrors.outlet = 'Please select an outlet';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const reservation = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          persons: parseInt(formData.persons),
          outlet: {
            title: selectedOutlet.outlet,
            id: selectedOutlet.id,
          },
          timeSlot: formData.timeSlot,
          date: formData.date,
          timing: formData.timing,
        };

        await FirestoreService.add("Reservations", reservation);
        setShowThankYou(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          persons: '1',
          date: '',
          timeSlot: '',
          timing: ''
        });
        setSelectedOutlet(outlets[0]);
      } catch (error) {
        alert('An error occurred while submitting your reservation. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const containerStyle = {
    backgroundImage: `url('${reserve}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    minHeight: '100vh',
  };

  if (showThankYou) {
    return (
      <div style={containerStyle} className="flex items-center justify-center w-full">
        <div className="w-full max-w-2xl mx-4 bg-brown-300 bg-opacity-opacity-100 rounded-lg shadow-lg p-16 text-center">
          <h2 className="text-3xl font-bold text-orange-100 mb-4">Thank You!</h2>
          <p className="text-orange-100 font-medium mb-6">Your reservation has been successfully submitted.</p>
          <button
            onClick={() => setShowThankYou(false)}
            className="bg-orange-100 hover:bg-brown-400 hover:text-orange-100 text-brown-100 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle} className="flex items-center justify-center w-full py-8">
      <div className="w-full max-w-5xl rounded-lg shadow-lg p-8 mt-24 border-orange-100 border-2" style={{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }}>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-orange-100">BOOK YOUR TABLE NOW</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300  ${
                errors.name ? 'border-red-500 border' : 'border-gray-100'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.email ? 'border-red-500 border' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <input
              type="tel"
              maxLength={10}
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.phone ? 'border-red-500 border' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <select
                value={selectedOutlet?.id || ""}
                onChange={(e) => {
                  const outlet = outlets.find(o => o.id === e.target.value);
                  setSelectedOutlet(outlet);
                  setTimeSlots(outlet.timeSlots);
                  handleInputChange('timeSlot', '');
                }}
                className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                  errors.outlet ? 'border-red-500 border' : 'border-gray-300'
                }`}
              >
                <option value="">Select outlet</option>
                {outlets.map((outlet) => (
                  <option key={outlet.id} value={outlet.id}>
                    {outlet.outlet}
                  </option>
                ))}
              </select>
              {errors.outlet && <p className="text-red-500 text-sm">{errors.outlet}</p>}
            </div>

            <div className="space-y-2">
              <select
                value={formData.persons}
                onChange={(e) => handleInputChange('persons', e.target.value)}
                className="w-full px-4 py-2 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-orange-300"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'person' : 'persons'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="date"
              value={formData.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.date ? 'border-red-500 border' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>
          <div className='flex justify-evenly'>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleLunchTime('timeSlot', 'lunch')}
              className={`p-2 rounded-md transition-colors duration-200 md:w-48 ${
                formData.timing === 'lunch'
                  ? 'bg-orange text-white font-semibold'
                  : 'bg-orange-100 hover:bg-gray-200 text-white'
              }`}
            >
              Lunch Time
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleDinnerTime('timeSlot', 'dinner')}
              className={`p-2 rounded-md transition-colors duration-200 md:w-48  ${
                formData.timing === 'dinner'
                  ? 'bg-orange text-white font-semibold'
                  : 'bg-orange-100 hover:bg-gray-200 text-white'
              }`}
            >
              Dinner Time
            </button>
          </div>
        </div>
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange('timeSlot', slot)}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    formData.timeSlot === slot
                      ? 'bg-orange text-white font-semibold'
                      : 'bg-orange-100 hover:bg-gray-200 text-white'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.timeSlot && <p className="text-red-500 text-sm">{errors.timeSlot}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-orange-100 hover:bg-brown-400 text-white font-semibold hover:text-orange-100 py-3 rounded-lg transition-colors duration-200 disabled:bg-orange-300"
          >
             {loading ? 'Please Wait ..' : 'Submit'}
          </button>
        </form>
      </div>
      {/* {loading &&
       <Lottie
          className="absolute h-80 "
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />} */}
    </div>
  );
};

export default ReservationForm;
