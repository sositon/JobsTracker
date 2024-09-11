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
    <Card className="mt-4 shadow-lg rounded-lg overflow-hidden">
      <Card.Body className="p-0">
        <div className="p-4 bg-gray-50 border-b">
          <Card.Title as="h2" className="text-2xl font-bold text-gray-800">Job Applications</Card.Title>
        </div>
        <div className="overflow-x-auto">
          <Table responsive hover className="mb-0">
            <thead className="bg-gray-100">
              <tr>
                {columns.map(column => (
                  <th key={column.key} className="py-3 px-4 text-start text-sm font-semibold text-gray-600 uppercase tracking-wider">{column.label}</th>
                ))}
                <th className="py-3 px-4 text-start text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
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
        <div className="p-4 bg-gray-50 border-t">
          <Button
            variant="primary"
            onClick={handleAddNewJob}
            disabled={!isLoggedIn}
            className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            <Plus size={16} className="mr-2" /> Add job application
          </Button>
        </div>
      </Card.Body>

      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton className="border-b-0">
          <Modal.Title className="text-xl font-bold text-primary">Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-5">
          {selectedJob && (
            <div className="space-y-3">
              <p><strong className="text-gray-700">Job Title:</strong> <span className="text-gray-900">{selectedJob.job_title}</span></p>
              <p><strong className="text-gray-700">Company:</strong> <span className="text-gray-900">{selectedJob.company_name}</span></p>
              <p><strong className="text-gray-700">Location:</strong> <span className="text-gray-900">{selectedJob.company_location}</span></p>
              <p><strong className="text-gray-700">Application Date:</strong> <span className="text-gray-900">{new Date(selectedJob.application_date).toLocaleDateString()}</span></p>
              <p><strong className="text-gray-700">Application Status:</strong> <span className="text-gray-900">{selectedJob.application_status}</span></p>
              <p><strong className="text-gray-700">Application Method:</strong> <span className="text-gray-900">{selectedJob.application_method}</span></p>
              {selectedJob.job_description && <p><strong className="text-gray-700">Job Description:</strong> <span className="text-gray-900">{selectedJob.job_description}</span></p>}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default JobApplicationsTable;