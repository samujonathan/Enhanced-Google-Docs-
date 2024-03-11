// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Fetch user's documents from the server upon component mount
    // Replace the URL with your actual endpoint
    fetch('http://localhost:5000/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((error) => console.error('Error fetching documents:', error));
  }, []);

  const handleLogout = () => {
    // Clear user token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    history.push('/login');
  };
  const handleCreateDocument = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/new-document', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create document');
      }

      // Document created successfully
      // You can handle redirection or any other action here
      
      console.log('Document created successfully');
      const data = await response.json();
      history.push(`/documents/${data}`);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCreateDocument}>Create New Document</button>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <Link to={`/documents/${doc._id}`}>{doc._id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
