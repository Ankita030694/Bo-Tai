import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/Navbar/navbarAdmin";
import FirestoreService from "../../../services/firestore-service";
import "./addoutlet.css";

function AddOutlet() {
  const [outlets, setOutlets] = useState([]);
  const [newOutlet, setNewOutlet] = useState("");
  const [newTimeSlots, setNewTimeSlots] = useState([""]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Fetch existing outlets from Firestore
  async function GetOutlets() {
    const outlets = await FirestoreService.getAll("Constraints");
    setOutlets(outlets);
  }

  useEffect(() => {
    GetOutlets();
  }, []);

  // Add a new outlet
  async function handleAddOutlet() {
    if (!newOutlet.trim() || !newTimeSlots.length) {
      alert("Please provide outlet name and at least one time slot.");
      return;
    }
    const outletData = {
      outlet: newOutlet,
      timeSlots: newTimeSlots.filter((slot) => slot.trim() !== ""),
    };

    await FirestoreService.add("Constraints", outletData);
    alert("Outlet added successfully!");
    setNewOutlet("");
    setNewTimeSlots([""]);
    setShowAddModal(false);
    GetOutlets(); // Refresh outlets
  }

  // Update an existing outlet
  async function handleUpdateOutlet() {
    if (!selectedOutlet || !newTimeSlots.length) {
      alert("Please select an outlet and provide time slots.");
      return;
    }

    const updatedData = {
      ...selectedOutlet,
      timeSlots: newTimeSlots.filter((slot) => slot.trim() !== ""),
    };

    await FirestoreService.update(
      "Constraints",
      selectedOutlet.id,
      updatedData
    );
    alert("Outlet updated successfully!");
    setSelectedOutlet(null);
    setNewTimeSlots([""]);
    setShowUpdateModal(false);
    GetOutlets(); // Refresh outlets
  }

  // Add a new time slot input field
  const handleAddTimeSlot = () => setNewTimeSlots([...newTimeSlots, ""]);

  // Delete a specific time slot
  const handleDeleteTimeSlot = (index) => {
    const updatedSlots = newTimeSlots.filter((_, i) => i !== index);
    setNewTimeSlots(updatedSlots);
  };

  // Update a specific time slot
  const handleTimeSlotChange = (index, value) => {
    const updatedSlots = [...newTimeSlots];
    updatedSlots[index] = value;
    setNewTimeSlots(updatedSlots);
  };

  // Open update modal and set selected outlet
  const openUpdateModal = (outlet) => {
    setSelectedOutlet(outlet);
    setNewTimeSlots(outlet.timeSlots);
    setShowUpdateModal(true);
  };

  return (
    <>
      <AdminNavbar />
      <main className="w-screen h-screen bg-[rgb(50_28_18)] p-4 pt-60">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Manage Outlets</h1>
          {/* Add Outlet Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 px-4 py-2 bg-[rgb(78_50_38)] text-white rounded-md border-2 border-[rgb(50_28_18)] hover:bg-[rgb(100_70_50)]"
          >
            + Add Outlet
          </button>
          {/* List of Outlets */}
          <div>
            <div className="p-4">
              {outlets.length > 0 ? (
                outlets.map((outlet) => (
                  <div
                    key={outlet.id}
                    className="flex justify-between w-full mb-4 border-b pb-4 items-center shadow-md rounded-lg p-2 m-2 bg-[rgb(78_50_38)] text-white"
                  >
                    <h3 className="font-bold text-lg">{outlet.outlet}</h3>
                    <p className="ml-6">
                      {outlet.timeSlots.map((slot, index) => (
                        <span
                          className={
                            "bg-[rgb(100_70_50)] shadow-md rounded-lg p-2 m-2"
                          }
                          key={index}
                        >
                          {slot}
                        </span>
                      ))}
                    </p>
                    <button
                      onClick={() => openUpdateModal(outlet)}
                      className="px-4 py-2 bg-[rgb(100_70_50)] text-white rounded-md mt-2 hover:bg-[rgb(120_85_60)]"
                    >
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-white">No outlets available.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-gray-100">
          <div className="bg-[rgb(78_50_38)] p-6 rounded-lg shadow-lg w-96 text-white">
            <div className="flex justify-between w-full items-center">
              <h2 className="text-xl font-bold mb-4">Add New Outlet</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
            <input
              type="text"
              placeholder="Outlet Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-black"
              value={newOutlet}
              onChange={(e) => setNewOutlet(e.target.value)}
            />
            {newTimeSlots.map((slot, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Time Slot ${index + 1}`}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md text-black"
                  value={slot}
                  onChange={(e) => handleTimeSlotChange(index, e.target.value)}
                />
                <button
                  onClick={() => handleDeleteTimeSlot(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              onClick={handleAddTimeSlot}
              className="w-full px-4 py-2 bg-[rgb(100_70_50)] text-white rounded-md mb-4 hover:bg-[rgb(120_85_60)]"
            >
              + Add Time Slot
            </button>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleAddOutlet}
                className="px-4 py-2 bg-[rgb(78_50_38)] text-white rounded-md hover:bg-[rgb(100_70_50)]"
              >
                Add Outlet
              </button>
            </div>
          </div>
        </div>
      )}
     {/* Update Modal */}
{showUpdateModal && selectedOutlet && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-gray-100">
    <div className="bg-[rgb(78_50_38)] p-6 rounded-lg shadow-lg w-96 text-white">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-xl font-bold mb-4">Update Outlet</h2>
        <button
          onClick={() => setShowUpdateModal(false)}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>
      {/* Outlet Name Input */}
      <input
        type="text"
        placeholder="Outlet Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-black"
        value={selectedOutlet.outlet}
        onChange={(e) => setSelectedOutlet({ ...selectedOutlet, outlet: e.target.value })} // Make the outlet name editable
      />
      {/* Time Slots Input */}
      {newTimeSlots.map((slot, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={`Time Slot ${index + 1}`}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md text-black"
            value={slot}
            onChange={(e) => handleTimeSlotChange(index, e.target.value)}
          />
          <button
            onClick={() => handleDeleteTimeSlot(index)}
            className="px-3 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={handleAddTimeSlot}
        className="w-full px-4 py-2 bg-[rgb(100_70_50)] text-white rounded-md mb-4 hover:bg-[rgb(120_85_60)]"
      >
        + Add Time Slot
      </button>
      <div className="flex justify-end gap-4">
        <button
          onClick={handleUpdateOutlet}
          className="px-4 py-2 bg-[rgb(78_50_38)] text-white rounded-md hover:bg-[rgb(100_70_50)]"
        >
          Update Outlet
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default AddOutlet;
