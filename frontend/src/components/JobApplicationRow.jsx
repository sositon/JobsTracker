import React, { memo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Info, Trash2, Edit2 } from 'lucide-react';
import JobDetailsModal from './JobDetailsModal';
import { logger } from '../utils/logger';

const JobApplicationRow = memo(({ job, editingCell, onCellClick, onCellChange, onCellBlur, onDeleteJob }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusBadgeColor = (status) => {
    const statusColors = {
      'Interview': 'bg-cyan-500',
      'Pending': 'bg-yellow-500',
      'Applied': 'bg-blue-500',
      'Rejected': 'bg-red-500',
      'Accepted': 'bg-green-500',
    };
    return statusColors[status] || 'bg-gray-500';
  };

  const openJobDetailesModal = (job) => () => {
    logger.info('Opening job details modal for job:', job);
    setShowDetails(true);
  };

  const renderCell = (field, value) => {
    if (editingCell?.jobId === job.id && editingCell?.field === field) {
      return (
        <Form.Control
          type="text"
          value={value || ''}
          onChange={(e) => onCellChange(e, job.id, field)}
          onBlur={onCellBlur}
          autoFocus
          className="w-full p-1 text-sm"
        />
      );
    }
    if (field === 'application_status') {
      return (
        <span className={`${getStatusBadgeColor(value)} text-white px-2 py-1 rounded-full`}>
          {value || '-'}
        </span>
      );
    }
    if (field === 'application_date') {
      return value ? new Date(value).toLocaleDateString() : '-';
    }
    return value || '-';
  };

  return (
    <>
    <tr className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      <td onClick={() => onCellClick(job.id, 'job_title')} className="py-3 px-4 text-sm text-gray-900">{renderCell('job_title', job.job_title)}</td>
      <td onClick={() => onCellClick(job.id, 'company_name')} className="py-3 px-4 text-sm text-gray-900">{renderCell('company_name', job.company_name)}</td>
      <td onClick={() => onCellClick(job.id, 'company_location')} className="py-3 px-4 text-sm text-gray-900">{renderCell('company_location', job.company_location)}</td>
      <td onClick={() => onCellClick(job.id, 'application_date')} className="py-3 px-4 text-sm text-gray-900">{renderCell('application_date', job.application_date)}</td>
      <td onClick={() => onCellClick(job.id, 'application_status')} className="py-3 px-4 text-sm text-gray-900">{renderCell('application_status', job.application_status)}</td>
      <td onClick={() => onCellClick(job.id, 'application_method')} className="py-3 px-4 text-sm text-gray-900">{renderCell('application_method', job.application_method)}</td>
      <td className="py-3 px-4 text-sm">
        <div className="flex space-x-2">
          <Button variant="outline-info" size="sm" onClick={openJobDetailesModal(job)} className="p-1">
            <Info size={16} />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => onDeleteJob(job.id)} className="p-1">
            <Trash2 size={16} />
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => onCellClick(job.id, 'job_title')} className="p-1">
            <Edit2 size={16} />
          </Button>
        </div>
      </td>
    </tr>

    <JobDetailsModal show={showDetails} onHide={() => setShowDetails(false)} job={job} />
    </>
  );
});

JobApplicationRow.displayName = 'JobApplicationRow';

export default JobApplicationRow;