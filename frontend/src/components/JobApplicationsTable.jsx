import React, { useState, useCallback } from 'react';
import { Modal, Table, Button, Card } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import JobApplicationRow from './JobApplicationRow';
import { useAppContext } from '../AppContext';
import { logger } from '../utils/logger';

const JobApplicationsTable = () => {
  const { jobs, addJob, updateJob, deleteJob, isLoggedIn } = useAppContext();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingCell, setEditingCell] = useState(null);

  const onViewDetails = useCallback((job) => {
    setSelectedJob(job);
    setShowDetails(true);
  }, []);

  const handleCellClick = useCallback((jobId, field) => {
    logger.info('Editing cell:', jobId, field);
    setEditingCell({ jobId, field });
  }, []);

  const handleCellChange = useCallback((e, jobId, field) => {
    const updatedJob = jobs.find(job => job.id === jobId);
    if (updatedJob) {
      updateJob({ ...updatedJob, [field]: e.target.value });
    }
  }, [jobs, updateJob]);

  const handleCellBlur = useCallback(() => {
    logger.info('Cell blur event');
    setEditingCell(null);
  }, []);

  const handleAddNewJob = useCallback(async () => {
    await addJob({
      job_title: '',
      company_name: '',
      company_location: '',
      application_date: new Date().toISOString().split('T')[0],
      application_status: '',
      application_method: '',
    });
  }, [addJob]);

  const handleDeleteJob = useCallback((jobId) => {
    deleteJob(jobId);
  }, [deleteJob]);

  const columns = [
    { key: 'job_title', label: 'Job Title' },
    { key: 'company_name', label: 'Company' },
    { key: 'company_location', label: 'Location' },
    { key: 'application_date', label: 'Application Date' },
    { key: 'application_status', label: 'Application Status' },
    { key: 'application_method', label: 'Application Method' },
  ];

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Job Applications</Card.Title>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <JobApplicationRow
                  key={job.id}
                  job={job}
                  onViewDetails={onViewDetails}
                  editingCell={editingCell}
                  onCellClick={handleCellClick}
                  onCellChange={handleCellChange}
                  onCellBlur={handleCellBlur}
                  onDeleteJob={handleDeleteJob}
                />
              ))}
            </tbody>
          </Table>
        </div>
        <Button
          variant="primary"
          onClick={handleAddNewJob}
          disabled={!isLoggedIn}
          className="mt-3"
        >
          <Plus size={16} className="me-2" /> Add job application
        </Button>
      </Card.Body>

      <Modal show={showDetails} onHide={() => setShowDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <>
              <p><strong>Job Title:</strong> {selectedJob.job_title}</p>
              <p><strong>Company:</strong> {selectedJob.company_name}</p>
              <p><strong>Location:</strong> {selectedJob.company_location}</p>
              <p><strong>Application Date:</strong> {new Date(selectedJob.application_date).toLocaleDateString()}</p>
              <p><strong>Application Method:</strong> {selectedJob.application_method}</p>
              <p><strong>Application Status:</strong> {selectedJob.application_status}</p>
              {selectedJob.job_description && <p><strong>Job Description:</strong> {selectedJob.job_description}</p>}
            </>
          )}
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default JobApplicationsTable;