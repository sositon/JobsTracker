import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const JobDetailsModal = ({ show, onHide, job, onUpdateJob }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState(job);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateJob(editedJob);
    setEditMode(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <Modal.Title className="text-xl font-bold">Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4">
        {job && (
          <div className="space-y-4">
            {editMode ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control type="text" name="job_title" value={editedJob.job_title} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Company</Form.Label>
                  <Form.Control type="text" name="company_name" value={editedJob.company_name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" name="company_location" value={editedJob.company_location} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Application Date</Form.Label>
                  <Form.Control type="date" name="application_date" value={editedJob.application_date} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Application Status</Form.Label>
                  <Form.Control as="select" name="application_status" value={editedJob.application_status} onChange={handleInputChange}>
                    <option value="">Select Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Application Method</Form.Label>
                  <Form.Control type="text" name="application_method" value={editedJob.application_method} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="job_description" value={editedJob.job_description} onChange={handleInputChange} />
                </Form.Group>
              </Form>
            ) : (
              <>
                <p><strong className="text-gray-700">Job Title:</strong> <span className="text-gray-900">{job.job_title}</span></p>
                <p><strong className="text-gray-700">Company:</strong> <span className="text-gray-900">{job.company_name}</span></p>
                <p><strong className="text-gray-700">Location:</strong> <span className="text-gray-900">{job.company_location}</span></p>
                <p><strong className="text-gray-700">Application Date:</strong> <span className="text-gray-900">{new Date(job.application_date).toLocaleDateString()}</span></p>
                <p><strong className="text-gray-700">Application Status:</strong> <span className={`${getStatusBadgeColor(job.application_status)} text-white px-2 py-1 rounded-full`}>{job.application_status}</span></p>
                <p><strong className="text-gray-700">Application Method:</strong> <span className="text-gray-900">{job.application_method}</span></p>
                <p><strong className="text-gray-700">Job Description:</strong> <span className="text-gray-900">{job.job_description || 'No description provided'}</span></p>
              </>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {editMode ? (
          <>
            <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => setEditMode(true)}>Edit</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default JobDetailsModal;