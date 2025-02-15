import React, { useState, useEffect } from "react";
import FirestoreService from "../../services/firestore-service";
import reserve from "../../assets/formbg.png";
import loadingAnimation from "../../assets/loader-old.json";
import Lottie from "lottie-react";
import "./reservation.css";
import { useNavigate } from "react-router-dom";

const ReservationForm = () => {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  // Consolidated form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    date: today,
    timeSlot: "",
    timing: "",
    countryCode: "+91 (India)",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getOutlets();
  }, []);

  // Helper function to validate a phone number in various formats.
  // It removes non-digit characters and then checks the digit count.
  const isValidPhoneNumber = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 6 && digits.length <= 15;
  };

  // Converts a time like "8:00 PM" to 24-hour format
  const parseTime = (time) => {
    const [hourMinute, period] = time.split(" ");
    const [hour, minute] = hourMinute.split(":").map(Number);
    if (period === "PM" && hour !== 12) {
      return hour + 12;
    } else if (period === "AM" && hour === 12) {
      return 0;
    }
    return hour;
  };

  // Filter time slots based on type (lunch or dinner)
  const filterTimeSlots = (slotType) => {
    const filteredSlots = selectedOutlet.timeSlots.filter((slot) => {
      const hour = parseTime(slot);
      return slotType === "lunch"
        ? hour >= 11 && hour < 18
        : hour >= 18 && hour < 24;
    });
    setTimeSlots(filteredSlots);
    handleInputChange("timing", slotType);
    // Reset selected time slot when filtering changes available options
    handleInputChange("timeSlot", "");
  };

  const handleCounter = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    if (value >= 1 && value <= 150) {
      handleInputChange("persons", value);
    } else if (value < 1) {
      handleInputChange("persons", 1);
    } else if (value > 150) {
      handleInputChange("persons", 150);
    }
  };

  const increment = () => {
    const currentPersons = parseInt(formData.persons) || 0;
    if (currentPersons < 150) {
      handleInputChange("persons", currentPersons + 1);
    }
  };

  const decrement = () => {
    const currentPersons = parseInt(formData.persons) || 0;
    if (currentPersons > 1) {
      handleInputChange("persons", currentPersons - 1);
    }
  };

  async function getOutlets() {
    const outletsData = await FirestoreService.getAll("Constraints");
    setOutlets(outletsData);
    setLoading(false);
    if (outletsData.length > 0) {
      const sortedTimeSlots = outletsData[0].timeSlots.sort((a, b) => {
        return parseTime(a) - parseTime(b);
      });
      setSelectedOutlet(outletsData[0]);
      setTimeSlots(sortedTimeSlots);
    }
  }

  // Validate entire form
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

    // Validate phone number using our helper
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Please Enter A Valid Phone Number";
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

    if (!formData.persons || formData.persons === "" || formData.persons <= 0) {
      newErrors.persons = "Please enter the number of people";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate phone on blur rather than on every change
  const validatePhone = () => {
    if (!formData.phone.trim()) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
    } else if (!isValidPhoneNumber(formData.phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please Enter A Valid Phone Number",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        createdAt: Date.now(),
        countryCode: formData.countryCode,
      };

      await FirestoreService.add("Reservations", reservation);
      navigate("/thanks");

      // Reset form fields (except outlet)
      setFormData({
        ...formData,
        name: "",
        email: "",
        phone: "",
        persons: "",
        date: today,
        timeSlot: "",
        timing: "",
      });
    } catch (error) {
      alert(
        "An error occurred while submitting your reservation. Please try again."
      );
    }
    setLoading(false);
  };

  // Update formData and clear any error for the field on change.
  // Note: No live validation for phone here.
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

  return (
    <div
      style={containerStyle}
      className="flex items-center justify-center w-full py-8 h-auto"
    >
      <div
        className="w-full max-w-5xl rounded-lg shadow-lg p-8 mt-24 border-orange-100 border-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-orange-100">
            BOOK YOUR TABLE NOW
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow alphabets and spaces
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  handleInputChange("name", value);
                }
              }}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.name ? "border-red-500 border" : "border-gray-100"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
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

          {/* Phone Number with Country Code */}
          <div className="space-y-2">
            <div className="col-md-12 w-full flex">
              <div className="flex-1 pr-2">
                <select
                  value={formData.countryCode || "+91"}
                  onChange={(e) => {
                    const selectedCode = e.target.value;
                    handleInputChange("countryCode", selectedCode);
                    // Ensure phone number starts with selected country code
                    // if (!formData.phone.startsWith(selectedCode)) {
                    //   handleInputChange(
                    //     "phone",
                    //     selectedCode + formData.phone.replace(/^\+\d+/, "")
                    //   );
                    // }
                  }}
                  className="w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 border-gray-300"
                >
                  <option value="+91 (India)">+91 India</option>
                  <option value="+1 (USA)">+1 USA</option>
                  <option value="+44 (UK)">+44 UK</option>
                  <option value="+61 (Australia)">+61 Australia</option>
                  <option value="+49 (Germany)">+49 Germany</option>
                  <option value="+81 (Japan)">+81 Japan</option>
                  <option value="+33 (France)">+33 France</option>
                  <option value="+39 (Italy)">+39 Italy</option>
                  <option value="+86 (China)">+86 China</option>
                  <option value="+971 (UAE)">+971 UAE</option>
                  <option value="+55 (Brazil)">+55 Brazil</option>
                  <option value="+7 (Russia)">+7 Russia</option>
                  <option value="+27 (South Africa)">+27 South Africa</option>
                  <option value="+20 (Egypt)">+20 Egypt</option>
                  <option value="+32 (Belgium)">+32 Belgium</option>
                  <option value="+34 (Spain)">+34 Spain</option>
                  <option value="+30 (Greece)">+30 Greece</option>
                  <option value="+52 (Mexico)">+52 Mexico</option>
                  <option value="+65 (Singapore)">+65 Singapore</option>
                  <option value="+82 (South Korea)">+82 South Korea</option>
                  <option value="+90 (Turkey)">+90 Turkey</option>
                  <option value="+351 (Portugal)">+351 Portugal</option>
                  <option value="+358 (Finland)">+358 Finland</option>
                  <option value="+372 (Estonia)">+372 Estonia</option>
                  <option value="+420 (Czech Republic)">
                    +420 Czech Republic
                  </option>
                  <option value="+423 (Liechtenstein)">+423 Liechtenstein</option>
                  <option value="+45 (Denmark)">+45 Denmark</option>
                  <option value="+46 (Sweden)">+46 Sweden</option>
                  <option value="+47 (Norway)">+47 Norway</option>
                  <option value="+48 (Poland)">+48 Poland</option>
                  <option value="+51 (Peru)">+51 Peru</option>
                  <option value="+54 (Argentina)">+54 Argentina</option>
                  <option value="+56 (Chile)">+56 Chile</option>
                  <option value="+60 (Malaysia)">+60 Malaysia</option>
                  <option value="+62 (Indonesia)">+62 Indonesia</option>
                  <option value="+64 (New Zealand)">+64 New Zealand</option>
                  <option value="+66 (Thailand)">+66 Thailand</option>
                  <option value="+92 (Pakistan)">+92 Pakistan</option>
                  <option value="+94 (Sri Lanka)">+94 Sri Lanka</option>
                  <option value="+98 (Iran)">+98 Iran</option>
                  <option value="+212 (Morocco)">+212 Morocco</option>
                  <option value="+213 (Algeria)">+213 Algeria</option>
                  <option value="+216 (Tunisia)">+216 Tunisia</option>
                  <option value="+218 (Libya)">+218 Libya</option>
                  <option value="+220 (Gambia)">+220 Gambia</option>
                  <option value="+221 (Senegal)">+221 Senegal</option>
                  <option value="+222 (Mauritania)">+222 Mauritania</option>
                  <option value="+223 (Mali)">+223 Mali</option>
                  <option value="+224 (Guinea)">+224 Guinea</option>
                  <option value="+225 (Ivory Coast)">+225 Ivory Coast</option>
                  <option value="+226 (Burkina Faso)">+226 Burkina Faso</option>
                  <option value="+227 (Niger)">+227 Niger</option>
                  <option value="+228 (Togo)">+228 Togo</option>
                  <option value="+229 (Benin)">+229 Benin</option>
                  <option value="+230 (Mauritius)">+230 Mauritius</option>
                  <option value="+231 (Liberia)">+231 Liberia</option>
                  <option value="+232 (Sierra Leone)">+232 Sierra Leone</option>
                  <option value="+233 (Ghana)">+233 Ghana</option>
                  <option value="+234 (Nigeria)">+234 Nigeria</option>
                  <option value="+235 (Chad)">+235 Chad</option>
                  <option value="+236 (Central African Republic)">
                    +236 Central African Republic
                  </option>
                  <option value="+237 (Cameroon)">+237 Cameroon</option>
                  <option value="+238 (Cape Verde)">+238 Cape Verde</option>
                  <option value="+239 (Sao Tome and Principe)">
                    +239 Sao Tome and Principe
                  </option>
                  <option value="+240 (Equatorial Guinea)">
                    +240 Equatorial Guinea
                  </option>
                  <option value="+241 (Gabon)">+241 Gabon</option>
                  <option value="+242 (Republic of the Congo)">
                    +242 Republic of the Congo
                  </option>
                  <option value="+243 (Democratic Republic of the Congo)">
                    +243 Democratic Republic of the Congo
                  </option>
                  <option value="+244 (Angola)">+244 Angola</option>
                  <option value="+245 (Guinea-Bissau)">+245 Guinea-Bissau</option>
                  <option value="+246 (British Indian Ocean Territory)">
                    +246 British Indian Ocean Territory
                  </option>
                  <option value="+248 (Seychelles)">+248 Seychelles</option>
                  <option value="+249 (Sudan)">+249 Sudan</option>
                  <option value="+250 (Rwanda)">+250 Rwanda</option>
                  <option value="+251 (Ethiopia)">+251 Ethiopia</option>
                  <option value="+252 (Somalia)">+252 Somalia</option>
                  <option value="+253 (Djibouti)">+253 Djibouti</option>
                  <option value="+254 (Kenya)">+254 Kenya</option>
                  <option value="+255 (Tanzania)">+255 Tanzania</option>
                  <option value="+256 (Uganda)">+256 Uganda</option>
                  <option value="+257 (Burundi)">+257 Burundi</option>
                  <option value="+258 (Mozambique)">+258 Mozambique</option>
                  <option value="+260 (Zambia)">+260 Zambia</option>
                  <option value="+261 (Madagascar)">+261 Madagascar</option>
                  <option value="+262 (Reunion)">+262 Reunion</option>
                  <option value="+263 (Zimbabwe)">+263 Zimbabwe</option>
                  <option value="+264 (Namibia)">+264 Namibia</option>
                  <option value="+265 (Malawi)">+265 Malawi</option>
                  <option value="+266 (Lesotho)">+266 Lesotho</option>
                  <option value="+267 (Botswana)">+267 Botswana</option>
                  <option value="+268 (Eswatini)">+268 Eswatini</option>
                  <option value="+269 (Comoros)">+269 Comoros</option>
                  <option value="+290 (Saint Helena)">+290 Saint Helena</option>
                  <option value="+291 (Eritrea)">+291 Eritrea</option>
                  <option value="+297 (Aruba)">+297 Aruba</option>
                  <option value="+298 (Faroe Islands)">+298 Faroe Islands</option>
                  <option value="+299 (Greenland)">+299 Greenland</option>
                </select>
              </div>
              <div className="flex-1 pl-2">
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    handleInputChange("phone", numericValue);
                  }}
                  onBlur={validatePhone}
                  className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                    errors.phone ? "border-red-500 border" : "border-gray-300"
                  }`}
                  minLength={10}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Outlet Selection and Persons Counter */}
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
                <button
                  type="button"
                  onClick={decrement}
                  className="px-2 py-2 bg-gray-200 rounded-md focus:outline-none"
                >
                  -
                </button>
                <input
                  type="number"
                  value={formData.persons}
                  onChange={handleCounter}
                  className={`w-full px-4 py-2 border-gray-300 rounded-md text-center outline-none focus:ring-2 focus:ring-orange-300 ${
                    errors.persons ? "border-red-500 pl-4" : ""
                  }`}
                  placeholder="Pax"
                />
                <button
                  type="button"
                  onClick={increment}
                  className="px-2 py-2 bg-gray-200 rounded-md focus:outline-none"
                >
                  +
                </button>
              </div>
              {errors.persons && (
                <p className="text-red-500 text-sm ml-4">{errors.persons}</p>
              )}
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <input
              type="date"
              placeholder="DD-MM-YYYY"
              value={formData.date}
              min={today}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.date ? "border-red-500 border" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Time Slot Filtering Buttons */}
          <div className="flex justify-evenly">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => filterTimeSlots("lunch")}
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
                onClick={() => filterTimeSlots("dinner")}
                className={`p-2 rounded-md transition-colors duration-200 md:w-48 ${
                  formData.timing === "dinner"
                    ? "bg-brown font-semibold text-white"
                    : "bg-brown-100 hover:bg-gray-200"
                }`}
              >
                Dinner Time
              </button>
            </div>
          </div>

          {/* Time Slot Selection */}
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
                      : "bg-brown-100 hover:bg-gray-200"
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

          {/* Submit Button */}
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
