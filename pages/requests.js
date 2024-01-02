// pages/requests.js

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function Requests() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);


  useEffect(() => {
    // Fetch user requests based on email
    if (session?.user?.email) {
      axios.get(`/api/requests?userTo=${session.user.email}`)
        .then(response => setRequests(response.data))
        .catch(error => console.error('Error fetching requests:', error));
    }
  }, [session]);

  const handleAction = async (_id, action) => {
    if(action === 'accept'){
        setApproved(true);
    }
    else if(action === 'reject'){
        setRejected(true);
    }
    try {
        const data = {
            approved,
            rejected,
            _id
        }
      // Update request status based on the action (accept/reject)
      await axios.put(`/api/requests`, data);
      // Refresh requests after the update
      await axios.get(`/api/requests?userTo=${session.user.email}`)
        .then(response => setRequests(response.data))
        .catch(error => console.error('Error fetching requests:', error));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map(request => (
          <div key={request._id} className="border p-4 rounded-md mb-4">
            <h2 className="text-xl font-semibold mb-2">{request.title}</h2>
            <p className="mb-4">{request.description}</p>
            {!request.approved &&
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleAction(request._id, 'accept')}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleAction(request._id, 'reject')}
              >
                Reject
              </button>
            </div>}
            {
                request.approved &&
                <p className="text-green-500 font-semibold">Approved</p>
            }
          </div>
        ))}
      </div>
    </Layout>
  );
}
