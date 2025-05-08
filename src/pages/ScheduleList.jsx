import React, { useState, useEffect } from 'react';
import { scheduleAPI } from '../services/api';
import { toast } from 'react-toastify';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await scheduleAPI.getByCustomer(customerId);
      setSchedules(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch schedules');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSchedules();
  };

  return (
    <div className="container my-5">
      <h2 className="text-primary mb-4">Customer Schedules</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Loading...' : 'Fetch Schedules'}
            </button>
          </div>
        </div>
      </form>
      {schedules.length > 0 ? (
        <ul className="list-group">
          {schedules.map((schedule) => (
            <li key={schedule._id} className="list-group-item">
              <p><strong>Poster ID:</strong> {schedule.posterId}</p>
              <p><strong>Category:</strong> {schedule.category}</p>
              <p><strong>Dates:</strong> {schedule.dates.join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedules found.</p>
      )}
    </div>
  );
};

export default ScheduleList;