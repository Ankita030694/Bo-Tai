
import React, { useEffect, useState } from "react";
import FirestoreService from '../../services/firestore-service';

function   ReservationComponent() {
  const [outlets, setOutlets] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: 1,
  });
  async function getOutlets() {
    const outletsData = await FirestoreService.getAll("Constraints");
    setOutlets(outletsData);
    if (outletsData.length > 0) {
      setSelectedOutlet(outletsData[0]);
      setTimeSlots(outletsData[0].timeSlots);
    }
  }
  
  async function handleSubmit() {
    if (!selectedOutlet || !selectedTimeSlot || !selectedDate) {
      alert("Please complete all fields.");
      return;
    }
  
    const reservation = {
      ...formData,
      outlet: {
        title: selectedOutlet.outlet,
        id: selectedOutlet.id,
      },
      timeSlot: selectedTimeSlot,
      date: selectedDate,
    };
  
    await FirestoreService.add("Reservations", reservation);
    alert("Reservation successfully created!");
  }
  
  useEffect(() => {
    getOutlets();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (   <div style={{ padding: "20px" }}>
    <h1>Reservation</h1>
    <div style={{ marginBottom: "10px" }}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
        required
      />
    </div>
    <div style={{ marginBottom: "10px" }}>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
        required
      />
    </div>
    <div style={{ marginBottom: "10px" }}>
      <label>Phone:</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
        required
      />
    </div>
    <div style={{ marginBottom: "10px" }}>
      <label>Number of Persons:</label>
      <select
        name="persons"
        value={formData.persons}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
      >
        {[...Array(10).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
    <div style={{ marginBottom: "10px" }}>
      <label>Outlet:</label>
      <select
        value={selectedOutlet?.id || ""}
        onChange={(e) => {
          const outlet = outlets.find((o) => o.id === e.target.value);
          setSelectedOutlet(outlet);
          setTimeSlots(outlet.timeSlots);
          setSelectedTimeSlot(null); 
        }}
        style={{ marginLeft: "10px" }}
      >
        {outlets.map((outlet) => (
          <option key={outlet.id} value={outlet.id}>
            {outlet.outlet}
          </option>
        ))}
      </select>
    </div>
    <div style={{ marginBottom: "10px" }}>
      <label>Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ marginLeft: "10px" }}
        required
      />
    </div>
    <div style={{ marginBottom: "10px" }}>
      <label>Time Slots:</label>
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => setSelectedTimeSlot(slot)}
            style={{
              backgroundColor:
                selectedTimeSlot === slot ? "yellow" : "lightgray",
              padding: "10px",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
    <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
      Submit Reservation
    </button>
  </div>)
}

export default ReservationComponent