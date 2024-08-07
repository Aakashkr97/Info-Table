import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    { id: "1", name: "Ajay", salary: "20110", address: "Delhi" },
    { id: "2", name: "Kiran", salary: "19800", address: "Mumbai" },
    { id: "3", name: "Ram", salary: "91010", address: "Kolkata" },
    { id: "4", name: "Md Wasim", salary: "29200", address: "Chennai" },
    { id: "5", name: "Ronak", salary: "39200", address: "Bengaluru" },
    { id: "6", name: "mcSher", salary: "99200", address: "Hyderabad" },
    { id: "7", name: "Justin", salary: "59400", address: "Pune" },
    { id: "8", name: "Ankit", salary: "49500", address: "Jaipur" },
    { id: "9", name: "Vijay", salary: "59005", address: "Ahmedabad" },
    { id: "10", name: "Aakash", salary: "89400", address: "Delhi" },
    { id: "11", name: "Rosy", salary: "9006", address: "Mumbai" },
    { id: "12", name: "Amit", salary: "9400", address: "Kolkata" },
    { id: "13", name: "Vikash", salary: "9030", address: "Chennai" },
    { id: "14", name: "Ranjeet", salary: "9200", address: "Bengaluru" },
    { id: "15", name: "Sourabh", salary: "8000", address: "Hyderabad" },
    { id: "16", name: "Aashish", salary: "9000", address: "Pune" }
  ];

 
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const valueA = sortConfig.key === 'id' ? Number(a[sortConfig.key]) : a[sortConfig.key].toLowerCase();
    const valueB = sortConfig.key === 'id' ? Number(b[sortConfig.key]) : b[sortConfig.key].toLowerCase();

    if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('salary')}>
              Salary {sortConfig.key === 'salary' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('address')}>
              Address {sortConfig.key === 'address' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.salary}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
