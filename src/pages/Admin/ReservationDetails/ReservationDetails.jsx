import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/Navbar/navbarAdmin";
import FirestoreService from "../../../services/firestore-service";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function ReservationDetails() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });

  // Fetch reservations and extract unique outlets
  async function GetReservations() {
    const data = await FirestoreService.getAll("Reservations");
    setReservations(data);
    setFilteredReservations(data);

    // Extract unique outlets
    const outletSet = new Set(data.map((res) => res.outlet.title));
    setOutlets(["All", ...outletSet]); // Add 'All' for showing all reservations
  }

  const downloadCSV = () => {
    if (filteredReservations.length === 0) {
      alert("No data available to download.");
      return;
    }

    const csvHeader = [
      "Name,Email,Phone,Persons,Timing,Date,Outlet,Created At\n",
    ];
    const csvRows = filteredReservations.map((res) => {
      const createdAt = res.createdAt
        ? new Date(res.createdAt.seconds * 1000).toLocaleString()
        : "N/A";

      return `${res.name},${res.email},${res.phone},${res.persons},${res.timing},${res.date} - ${res.timeSlot},${res.outlet.title},${createdAt}`;
    });

    const csvContent = csvHeader + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "reservation_details.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Updated phone formatting function – no hardcoded regions now.
  const formatPhoneNumber = (phone) => {
    if (!phone) return "N/A";
    const parsedNumber = parsePhoneNumberFromString(phone);
    return parsedNumber && parsedNumber.isValid()
      ? `+${parsedNumber.countryCallingCode} ${parsedNumber.formatNational()}`
      : phone; // Return original if parsing fails
  };

  // Filter reservations by selected outlet and search query
  useEffect(() => {
    let filtered = reservations;

    if (selectedOutlet !== "All") {
      filtered = filtered.filter((res) => res.outlet.title === selectedOutlet);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (res) =>
          res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDate) {
      filtered = filtered.filter((res) => res.date === selectedDate);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let valueA, valueB;

        if (sortConfig.key === "date") {
          valueA = new Date(`${a.date} ${a.timeSlot || "00:00"}`).getTime();
          valueB = new Date(`${b.date} ${b.timeSlot || "00:00"}`).getTime();
        } else if (sortConfig.key === "createdAt") {
          valueA = b.createdAt || 0;
          valueB = a.createdAt || 0;
        } else {
          valueA = a[sortConfig.key]
            ? a[sortConfig.key].toString().toLowerCase()
            : "";
          valueB = b[sortConfig.key]
            ? b[sortConfig.key].toString().toLowerCase()
            : "";
        }

        if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredReservations(filtered);
  }, [selectedOutlet, searchQuery, selectedDate, sortConfig, reservations]);

  // Toggle sort order
  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  useEffect(() => {
    GetReservations();
  }, []);

  return (
    <>
      <AdminNavbar />
      <main className="w-screen h-auto bg-brown p-4 pt-52">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-brown-100">
            Reservation Details
          </h1>

          {/* Filters and Search */}
          <div className="flex flex-row-reverse flex-wrap items-center justify-between mb-6 gap-4">
            <div>
              <button className="bg-white rounded-md p-2" onClick={downloadCSV}>
                Download CSV
              </button>
            </div>
            <div>
              <select
                id="outletFilter"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedOutlet}
                onChange={(e) => setSelectedOutlet(e.target.value)}
              >
                {outlets.map((outlet, index) => (
                  <option key={index} value={outlet}>
                    {outlet}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="date"
                className="bg-white rounded-md p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <input
                id="searchBar"
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email or name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Reservation Table */}
          <div className="bg-[#CFA177] shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-[#CFA177]">
              <thead className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th
                    className="py-3 px-6 text-center cursor-pointer"
                    onClick={() => toggleSort("name")}
                  >
                    Name{" "}
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="py-3 px-3 text-center">Email</th>
                  <th className="py-3 px-3 text-center">Country</th>
                  <th className="py-3 px-3 text-center">Phone</th>
                  <th className="py-3 px-3 text-center">Persons</th>
                  <th className="py-3 px-3 text-center">Timing</th>
                  <th
                    className="py-3 px-6 text-center cursor-pointer"
                    onClick={() => toggleSort("date")}
                  >
                    Date & Time{" "}
                    {sortConfig.key === "date" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="py-3 px-6 text-center">Outlet</th>
                  <th
                    className="py-3 px-6 text-center cursor-pointer"
                    onClick={() => toggleSort("createdAt")}
                  >
                    Created At{" "}
                    {sortConfig.key === "createdAt" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((res) => (
                    <tr
                      key={res.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-3 text-center">{res.name}</td>
                      <td className="py-3 px-3 text-center">{res.email}</td>
                      <td className="py-3 px-3 text-center">{res.countryCode}</td>
                      <td className="py-3 px-3 text-center">
                        {formatPhoneNumber(res.phone)}
                      </td>
                      <td className="py-3 px-3 text-center">{res.persons}</td>
                      <td className="py-3 px-3 text-center">{res.timing}</td>
                      <td className="py-3 px-3 text-center">
                        {res.date
                          ? new Date(res.date).toLocaleDateString("en-GB") // Format: DD/MM/YYYY
                          : "N/A"}{" "}
                        - {res.timeSlot}
                      </td>

                      <td className="py-3 px-6 text-center">
                        {res.outlet.title}
                      </td>
                      <td className="py-3 px-6 text-center">{res.createdAt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-3 px-6 text-center text-gray-500"
                    >
                      No reservations found.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="7"
                    className="py-3 px-6 text-right text-gray-500"
                  >
                    Total queries: {filteredReservations.length}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default ReservationDetails;
