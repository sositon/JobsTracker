import React, { memo } from 'react';
import { EllipsisVertical, Trash2Icon } from 'lucide-react';
import { Badge, Button, Form } from 'react-bootstrap';

const JobApplicationRow = memo(({ job, onViewDetails, editingCell, onCellClick, onCellChange, onCellBlur, onDeleteJob }) => {
  const statusVariant = {
    Pending: 'warning',
    Interview: 'info',
    Accepted: 'success',
    Rejected: 'danger',
  }[job.application_status] || 'secondary';

  const renderCell = (field, value) => {
    if (editingCell?.jobId === job.id && editingCell?.field === field) {
      return (
        <Form.Control
          type="text"
          value={value || ''}
          onChange={(e) => onCellChange(e, job.id, field)}
          onBlur={onCellBlur}
        />
      );
    }
    if (field === 'application_status') {
      return <Badge bg={statusVariant}>{value}</Badge>;
    }
    if (field === 'application_date') {
      return new Date(value).toLocaleDateString();
    }
    return value || '-';
  };

  return (
    <tr>
      <td className="text-center" onClick={() => onCellClick(job.id, 'job_title')}>{renderCell('job_title', job.job_title)}</td>
      <td className="text-center" onClick={() => onCellClick(job.id, 'company_name')}>{renderCell('company_name', job.company_name)}</td>
      <td className="text-center" onClick={() => onCellClick(job.id, 'company_location')}>{renderCell('company_location', job.company_location)}</td>
      <td className="text-center" onClick={() => onCellClick(job.id, 'application_date')}>{renderCell('application_date', job.application_date)}</td>
      <td className="text-center" onClick={() => onCellClick(job.id, 'application_status')}>{renderCell('application_status', job.application_status)}</td>
      <td className="text-center" onClick={() => onCellClick(job.id, 'application_method')}>{renderCell('application_method', job.application_method)}</td>
      <td className="text-center">
        {
          <Button variant="primary" size="sm" onClick={() => onViewDetails(job)}>
            <EllipsisVertical size={16} />
          </Button>
        }
        <Button variant="danger" size="sm" className="ms-2" onClick={() => onDeleteJob(job.id)}>
          <Trash2Icon size={16} />
        </Button>
      </td>
    </tr>
  );
});

JobApplicationRow.displayName = 'JobApplicationRow';

export default JobApplicationRow;