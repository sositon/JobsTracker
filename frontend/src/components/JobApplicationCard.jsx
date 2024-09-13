import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Briefcase, Building, MapPin, Calendar } from 'lucide-react';

const JobApplicationCard = ({ job, onViewDetails }) => {
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Interview: 'bg-blue-100 text-blue-800',
    Accepted: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  return (
    <Card className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Briefcase className="text-purple-500 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-gray-800 truncate">{job.job_title}</h3>
        </div>
        <div className="flex items-center mb-2">
          <Building className="text-blue-500 mr-3" size={18} />
          <p className="text-gray-600 truncate">{job.company_name}</p>
        </div>
        <div className="flex items-center mb-2">
          <MapPin className="text-green-500 mr-3" size={18} />
          <p className="text-gray-600 truncate">{job.company_location}</p>
        </div>
        <div className="flex items-center mb-4">
          <Calendar className="text-yellow-500 mr-3" size={18} />
          <p className="text-gray-600">{new Date(job.application_date).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.application_status] || 'bg-gray-100 text-gray-800'}`}>
            {job.application_status}
          </span>
          <Button
            onClick={() => onViewDetails(job)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobApplicationCard;