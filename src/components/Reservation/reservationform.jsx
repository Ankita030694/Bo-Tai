import React, { useState, useEffect } from "react";
import FirestoreService from "../../services/firestore-service";
import reserve from "../../assets/formbg.png";
import loadingAnimation from "../../assets/loader-old.json";
import Lottie from "lottie-react";
import "./reservation.css";

const ReservationForm = () => {
  const [outlets, setOutlets] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slotName, setslotName] = useState("Lunch");
  const [persons, setPersons] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "1",
    date: "",
    timeSlot: "",
    timing: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getOutlets();
  }, []);

  // Function to parse time like "8:00 PM" to a 24-hour format
  const parseTime = (time) => {
    const [hourMinute, period] = time.split(" ");
    const [hour, minute] = hourMinute.split(":").map(Number);

    // Convert 12-hour format to 24-hour format
    if (period === "PM" && hour !== 12) {
      return hour + 12; // Convert PM times to 24-hour format (12:00 PM becomes 12, 1:00 PM becomes 13)
    } else if (period === "AM" && hour === 12) {
      return 0; // Convert 12:00 AM to 0:00
    }
    return hour;
  };

  const handleLunchTime = (field, slot) => {
    console.log("Lunch Time Slots");
    handleInputChange("timing", slot);

    // **Filtering slots based on lunch time (11 AM to 5 PM)**
    const filteredSlots = selectedOutlet.timeSlots.filter((slot) => {
      const hour = parseTime(slot);
      return hour >= 11 && hour < 18; // Lunch time: 11 AM - 5 PM
    });
    setTimeSlots(filteredSlots);
  };
  const handleCounter = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 150) {
      setPersons(Number(value));
    }
  };

  // Increment persons value
  const increment = () => {
    if (persons < 150) {
      setPersons(persons + 1);
    }
  };

  // Decrement persons value
  const decrement = () => {
    if (persons > 0) {
      setPersons(persons - 1);
    }
  };
  const handleDinnerTime = (field, slot) => {
    console.log("Dinner Time");
    handleInputChange("timing", slot);

    // **Filtering slots based on dinner time (5 PM to 11 PM)**
    const filteredSlots = selectedOutlet.timeSlots.filter((slot) => {
      const hour = parseTime(slot);
      return hour >= 18 && hour < 24; // Dinner time: 5 PM - 11 PM
    });
    setTimeSlots(filteredSlots);
  };

  async function getOutlets() {
    const outletsData = await FirestoreService.getAll("Constraints");
    setOutlets(outletsData);
    setLoading(false);
    if (outletsData.length > 0) {
      setSelectedOutlet(outletsData[0]);
      setTimeSlots(outletsData[0].timeSlots);
    }
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!selectedOutlet) {
      newErrors.outlet = "Please select an outlet";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Please select a time slot";
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
          name: "",
          email: "",
          phone: "",
          persons: "1",
          date: "",
          timeSlot: "",
          timing: "",
        });
        setSelectedOutlet(outlets[0]);
      } catch (error) {
        alert(
          "An error occurred while submitting your reservation. Please try again."
        );
      }
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const containerStyle = {
    backgroundImage: `url('${reserve}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  if (showThankYou) {
    return (
      <div
        style={containerStyle}
        className="flex items-center justify-center w-full"
      >
        <div className="w-full max-w-2xl mx-4 bg-brown-300 bg-opacity-opacity-100 rounded-lg shadow-lg p-16 text-center">
          <h2 className="text-3xl font-bold text-orange-100 mb-4">
            Thank You!
          </h2>
          <p className="text-orange-100 font-medium mb-6">
            Your reservation has been successfully submitted.
          </p>
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
    <div
      style={containerStyle}
      className="flex items-center justify-center w-full py-8"
    >
      <div
        className="w-full max-w-5xl rounded-lg shadow-lg p-8 mt-24 border-orange-100 border-2"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-orange-100">
            BOOK YOUR TABLE NOW
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value;

                // Only allow alphabets and whitespaces
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  handleInputChange("name", value);
                }
              }}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300  ${
                errors.name ? "border-red-500 border" : "border-gray-100"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.email ? "border-red-500 border" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="tel"
              inputMode="numeric" // Ensures number input on mobile
              maxLength={10} // Limiting the number of characters
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value;

                // Check if the input contains only numbers and enforce max length
                if (/^\d*$/.test(value) && value.length <= 10) {
                  handleInputChange("phone", value);
                }
              }}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.phone ? "border-red-500 border" : "border-gray-300"
              }`}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <select
                value={selectedOutlet?.id || ""}
                onChange={(e) => {
                  const outlet = outlets.find((o) => o.id === e.target.value);
                  setSelectedOutlet(outlet);
                  setTimeSlots(outlet.timeSlots);
                  handleInputChange("timeSlot", "");
                }}
                className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                  errors.outlet ? "border-red-500 border" : "border-gray-300"
                }`}
              >
                <option value="">Select outlet</option>
                {outlets.map((outlet) => (
                  <option key={outlet.id} value={outlet.id}>
                    {outlet.outlet}
                  </option>
                ))}
              </select>
              {errors.outlet && (
                <p className="text-red-500 text-sm">{errors.outlet}</p>
              )}
            </div>

            <div className="space-y-2 text-white">
              <div className="flex items-center space-x-2">
                {/* Decrement Button */}
                <button
                  onClick={decrement}
                  className="px-2 py-2 bg-gray-200 rounded-md focus:outline-none"
                > - </button>

                {/* Input for person count with manual entry */}
                <input
                  type="number"
                  value={persons}
                  onChange={handleCounter}
                  className="w-full px-4 py-2 border-gray-300 rounded-md text-center outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Pax"
                />

                {/* Increment Button */}
                <button
                  onClick={increment}
                  className="px-2 py-2 bg-gray-200 rounded-md focus:outline-none"
                > + </button>
              </div>

              {/* <p>
                {persons} {persons === 1 ? "person" : "persons"}
              </p> */}
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="date"
              placeholder="DD-MM-YYYY"
              value={formData.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.date ? "border-red-500 border" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          <div className="flex justify-evenly">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleLunchTime("timeSlot", "lunch")}
                className={`p-2 rounded-md transition-colors duration-200 md:w-48 ${
                  formData.timing === "lunch"
                    ? "bg-brown font-semibold text-white"
                    : "bg-brown-100 hover:bg-gray-200"
                }`}
              >
                Lunch Time
              </button>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleDinnerTime("timeSlot", "dinner")}
                className={`p-2 rounded-md transition-colors duration-200 md:w-48  ${
                  formData.timing === "dinner"
                    ? "bg-brown font-semibold text-white"
                    : "bg-brown-100 hover:bg-gray-200 "
                }`}
              >
                Dinner Time
              </button>
            </div>
          </div>

          <div className="space-y-2 align items-center">
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange("timeSlot", slot)}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    formData.timeSlot === slot
                      ? "bg-brown font-semibold text-white"
                      : "bg-brown-100 hover:bg-gray-200 "
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.timeSlot && (
              <p className="text-red-500 text-sm">{errors.timeSlot}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-100 hover:bg-brown-400 font-semibold hover:text-orange-100 py-3 rounded-lg transition-colors duration-200 disabled:bg-orange-300"
          >
            {loading ? "Please Wait .." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
