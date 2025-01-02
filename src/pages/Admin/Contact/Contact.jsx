import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/Navbar/navbarAdmin';
import FirestoreService from '../../../services/firestore-service';

function Contact() {
    const [contactQueries, setContactQueries] = useState([]);
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState(null); // 'fullName' or 'createdAt'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    // Fetch contact queries from Firestore
    async function getContacts() {
        const data = await FirestoreService.getAll('ContactQuries');
        setContactQueries(data);
        setFilteredQueries(data); // Initially set filtered data to all data
    }

    // Filter and sort data based on search input and sorting preferences
    useEffect(() => {
        let filtered = contactQueries.filter(query =>
            query.fullName.toLowerCase().includes(search.toLowerCase()) ||
            query.email.toLowerCase().includes(search.toLowerCase())
        );

        if (sortField) {
            filtered = filtered.sort((a, b) => {
                if (sortField === 'createdAt') {
                    const dateA = new Date(a[sortField]?.seconds * 1000);
                    const dateB = new Date(b[sortField]?.seconds * 1000);
                    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                } else {
                    return sortOrder === 'asc'
                        ? a[sortField].localeCompare(b[sortField])
                        : b[sortField].localeCompare(a[sortField]);
                }
            });
        }

        setFilteredQueries(filtered);
    }, [search, sortField, sortOrder, contactQueries]);

    useEffect(() => {
        getContacts();
    }, []);

    // Toggle sorting
    const toggleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    return (
        <>
            <AdminNavbar />
            <main className="w-screen h-screen bg-brown px-6 pb-10 pt-52">
                <div className="container mx-auto">
                   
                    {/* Filters */}
                    <div className="flex items-center justify-center mb-6">
                        <input
                            type="text"
                            placeholder="Search by Name or Email"
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-[#CFA177] shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full bg-[#CFA177]">
                            <thead className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal border-b ">
                                <tr>
                                    <th
                                        className="py-3 px-6 text-left cursor-pointer"
                                        onClick={() => toggleSort('fullName')}
                                    >
                                        Full Name
                                        {sortField === 'fullName' && (
                                            <span className="ml-2">
                                                {sortOrder === 'asc' ? '🔼' : '🔽'}
                                            </span>
                                        )}
                                    </th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-left">Phone</th>
                                    <th className="py-3 px-6 text-left">Notes</th>
                                    <th
                                        className="py-3 px-6 text-left cursor-pointer"
                                        onClick={() => toggleSort('createdAt')}
                                    >
                                        Created At
                                        {sortField === 'createdAt' && (
                                            <span className="ml-2">
                                                {sortOrder === 'asc' ? '🔼' : '🔽'}
                                            </span>
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm font-light bg-[#c6a17f]">
                                {filteredQueries.length > 0 ? (
                                    filteredQueries.map((query) => (
                                        <tr
                                            key={query.id}
                                            className="border-b border-gray-200 hover:bg-brown hover:text-[#CFA177]"
                                        >
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                {query.fullName}
                                            </td>
                                            <td className="py-3 px-6 text-left">{query.email}</td>
                                            <td className="py-3 px-6 text-left">{query.phone}</td>
                                            <td className="py-3 px-6 text-left">{query.notes}</td>
                                            <td className="py-3 px-6 text-left">
                                                {query.createdAt
                                                    ? new Date(
                                                          query.createdAt.seconds * 1000
                                                      ).toLocaleString()
                                                    : 'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-3 px-6 text-center text-gray-500"
                                        >
                                            No queries found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-3 px-6 text-right text-gray-500"
                                    >
                                        Total queries: {contactQueries.length}
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

export default Contact;
