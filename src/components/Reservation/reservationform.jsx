import React, { useState, useEffect } from "react";
import FirestoreService from "../../services/firestore-service";
import reserve from "../../assets/formbg.png";
import loadingAnimation from "../../assets/loader-old.json";
import Lottie from "lottie-react";
import "./reservation.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
const ReservationForm = () => {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slotName, setslotName] = useState("Lunch");
  const [persons, setPersons] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    date: today,
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
    const value = parseInt(e.target.value, 10) || 0;
    if (value >= 1 && value <= 150) {
      setPersons(value);
      handleInputChange("persons", value);
    } else if (value < 1) {
      setPersons(1);
      handleInputChange("persons", 1);
    } else if (value > 150) {
      setPersons(150);
      handleInputChange("persons", 150);
    }
  };

  // Increment persons value
  const increment = () => {
    if (persons < 150) {
      const newValue = persons + 1;
      setPersons(newValue);
      handleInputChange("persons", newValue);
    }
  };

  // Decrement persons value
  const decrement = () => {
    if (persons > 1) {
      const newValue = persons - 1;
      setPersons(newValue);
      handleInputChange("persons", newValue);
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
      const sortedTimeSlots = outletsData[0].timeSlots.sort((a, b) => {
        return parseTime(a) - parseTime(b); // Sort time slots in ascending order
      });
      setSelectedOutlet(outletsData[0]);
      setTimeSlots(sortedTimeSlots);
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
          createdAt: Date.now(),
        };

        await FirestoreService.add("Reservations", reservation);
        // setShowThankYou(true);
        navigate("/thanks");
        setFormData({
          name: "",
          email: "",
          phone: "",
          persons: "",
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

  // if (showThankYou) {
  //   return (
  //     <div
  //       style={containerStyle}
  //       className="flex items-center justify-center w-full"
  //     >
  //       <div className="w-full max-w-2xl mx-4 bg-brown-300 bg-opacity-opacity-100 rounded-lg shadow-lg p-16 text-center">
  //         <h2 className="text-3xl font-bold text-orange-100 mb-4">
  //           Thank You!
  //         </h2>
  //         <p className="text-orange-100 font-medium mb-6">
  //           Your reservation has been successfully submitted.
  //         </p>
  //         <button
  //           onClick={() => setShowThankYou(false)}
  //           className="bg-orange-100 hover:bg-brown-400 hover:text-orange-100 text-brown-100 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
  //         >
  //           Make Another Reservation
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      style={containerStyle}
      className="flex items-center justify-center w-full py-8 h-auto"
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
            <div className="col-md-12 w-full flex">
              <div className="flex-1 pr-2">
                {/* Dropdown for country code with names */}
                <select
                  value={formData.countryCode || "+91"} // Default to '+91' or use state
                  onChange={(e) => {
                    const selectedCode = e.target.value;
                    handleInputChange("countryCode", selectedCode);

                    // Add country code only if not already present
                    if (!formData.phone.startsWith(selectedCode)) {
                      handleInputChange(
                        "phone",
                        selectedCode + formData.phone.replace(/^\+\d+/, "")
                      );
                    }
                  }}
                  className="w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 border-gray-300"
                >
                  <option value="+1">+1 USA</option>
                  <option value="+91">+91 India</option>
                  <option value="+44">+44 UK</option>
                  <option value="+61">+61 Australia</option>
                  <option value="+49">+49 Germany</option>
                  <option value="+81">+81 Japan</option>
                  <option value="+33">+33 France</option>
                  <option value="+39">+39 Italy</option>
                  <option value="+86">+86 China</option>
                  <option value="+971">+971 UAE</option>
                  <option value="+55">+55 Brazil</option>
                  <option value="+7">+7 Russia</option>
                  <option value="+27">+27 South Africa</option>
                  <option value="+20">+20 Egypt</option>
                  <option value="+32">+32 Belgium</option>
                  <option value="+34">+34 Spain</option>
                  <option value="+30">+30 Greece</option>
                  <option value="+52">+52 Mexico</option>
                  <option value="+65">+65 Singapore</option>
                  <option value="+82">+82 South Korea</option>
                  <option value="+90">+90 Turkey</option>
                  <option value="+351">+351 Portugal</option>
                  <option value="+358">+358 Finland</option>
                  <option value="+372">+372 Estonia</option>
                  <option value="+420">+420 Czech Republic</option>
                  <option value="+423">+423 Liechtenstein</option>
                  <option value="+45">+45 Denmark</option>
                  <option value="+46">+46 Sweden</option>
                  <option value="+47">+47 Norway</option>
                  <option value="+48">+48 Poland</option>
                  <option value="+51">+51 Peru</option>
                  <option value="+54">+54 Argentina</option>
                  <option value="+56">+56 Chile</option>
                  <option value="+60">+60 Malaysia</option>
                  <option value="+62">+62 Indonesia</option>
                  <option value="+64">+64 New Zealand</option>
                  <option value="+66">+66 Thailand</option>
                  <option value="+92">+92 Pakistan</option>
                  <option value="+94">+94 Sri Lanka</option>
                  <option value="+98">+98 Iran</option>
                  <option value="+212">+212 Morocco</option>
                  <option value="+213">+213 Algeria</option>
                  <option value="+216">+216 Tunisia</option>
                  <option value="+218">+218 Libya</option>
                  <option value="+220">+220 Gambia</option>
                  <option value="+221">+221 Senegal</option>
                  <option value="+222">+222 Mauritania</option>
                  <option value="+223">+223 Mali</option>
                  <option value="+224">+224 Guinea</option>
                  <option value="+225">+225 Ivory Coast</option>
                  <option value="+226">+226 Burkina Faso</option>
                  <option value="+227">+227 Niger</option>
                  <option value="+228">+228 Togo</option>
                  <option value="+229">+229 Benin</option>
                  <option value="+230">+230 Mauritius</option>
                  <option value="+231">+231 Liberia</option>
                  <option value="+232">+232 Sierra Leone</option>
                  <option value="+233">+233 Ghana</option>
                  <option value="+234">+234 Nigeria</option>
                  <option value="+235">+235 Chad</option>
                  <option value="+236">+236 Central African Republic</option>
                  <option value="+237">+237 Cameroon</option>
                  <option value="+238">+238 Cape Verde</option>
                  <option value="+239">+239 Sao Tome and Principe</option>
                  <option value="+240">+240 Equatorial Guinea</option>
                  <option value="+241">+241 Gabon</option>
                  <option value="+242">+242 Republic of the Congo</option>
                  <option value="+243">
                    +243 Democratic Republic of the Congo
                  </option>
                  <option value="+244">+244 Angola</option>
                  <option value="+245">+245 Guinea-Bissau</option>
                  <option value="+246">
                    +246 British Indian Ocean Territory
                  </option>
                  <option value="+248">+248 Seychelles</option>
                  <option value="+249">+249 Sudan</option>
                  <option value="+250">+250 Rwanda</option>
                  <option value="+251">+251 Ethiopia</option>
                  <option value="+252">+252 Somalia</option>
                  <option value="+253">+253 Djibouti</option>
                  <option value="+254">+254 Kenya</option>
                  <option value="+255">+255 Tanzania</option>
                  <option value="+256">+256 Uganda</option>
                  <option value="+257">+257 Burundi</option>
                  <option value="+258">+258 Mozambique</option>
                  <option value="+260">+260 Zambia</option>
                  <option value="+261">+261 Madagascar</option>
                  <option value="+262">+262 Reunion</option>
                  <option value="+263">+263 Zimbabwe</option>
                  <option value="+264">+264 Namibia</option>
                  <option value="+265">+265 Malawi</option>
                  <option value="+266">+266 Lesotho</option>
                  <option value="+267">+267 Botswana</option>
                  <option value="+268">+268 Eswatini</option>
                  <option value="+269">+269 Comoros</option>
                  <option value="+290">+290 Saint Helena</option>
                  <option value="+291">+291 Eritrea</option>
                  <option value="+297">+297 Aruba</option>
                  <option value="+298">+298 Faroe Islands</option>
                  <option value="+299">+299 Greenland</option>
                </select>
              </div>

              <div className="flex-1 pl-2">
                {/* Phone number input with auto country code */}
                <input
                  type="tel"
                  inputMode="numeric"
                  minLength={13}
                  maxLength={13} // Allows country code + 10-digit number
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers and limit length
                    if (
                      /^\d*$/.test(value.replace(/^\+/, "")) &&
                      value.length <= 13
                    ) {
                      handleInputChange("phone", value);
                    }
                  }}
                  className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                    errors.phone ? "border-red-500 border" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

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
                >
                  {" "}
                  -{" "}
                </button>

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
                >
                  {" "}
                  +{" "}
                </button>
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
