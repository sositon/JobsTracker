import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JobApplicationRow from './JobApplicationRow';

const mockJob = {
  id: 1,
  job_title: 'Software Engineer',
  company_name: 'Tech Corp',
  company_location: 'San Francisco',
  application_date: '2023-10-01',
  application_status: 'Pending',
  application_method: 'Online',
};

const mockEditingCell = {
  jobId: 1,
  field: 'job_title',
};

const mockOnViewDetails = jest.fn();
const mockOnCellClick = jest.fn();
const mockOnCellChange = jest.fn();
const mockOnCellBlur = jest.fn();
const mockOnDeleteJob = jest.fn();

describe('JobApplicationRow', () => {
  beforeEach(() => {
        render(
        <table>
            <tbody>
            <JobApplicationRow
                job={mockJob}
                onViewDetails={mockOnViewDetails}
                editingCell={null}
                onCellClick={mockOnCellClick}
                onCellChange={mockOnCellChange}
                onCellBlur={mockOnCellBlur}
                onDeleteJob={mockOnDeleteJob}
            />
            </tbody>
        </table>
        );
  });

  it('renders job title', () => {
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders company name', () => {
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('renders company location', () => {
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
  });

  it('renders application date', () => {
    expect(screen.getByText('10/1/2023')).toBeInTheDocument();
  });

  it('renders application status badge', () => {
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Pending').closest('span')).toHaveClass('bg-warning');
  });

  it('renders application method', () => {
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('calls onViewDetails when details button is clicked', () => {
    fireEvent.click(screen.getByTestId('more-details-button'));
    expect(mockOnViewDetails).toHaveBeenCalled();
  });

  it('calls onDeleteJob when delete button is clicked', () => {
    fireEvent.click(screen.getByTestId('delete-job-button'));
    expect(mockOnDeleteJob).toHaveBeenCalledWith(mockJob.id);
  });

  it('calls onCellClick when a cell is clicked', () => {
    fireEvent.click(screen.getByText('Software Engineer'));
    expect(mockOnCellClick).toHaveBeenCalledWith(mockJob.id, 'job_title');
  });

  it('renders input field when editingCell matches', () => {
    render(
      <table>
        <tbody>
          <JobApplicationRow
            job={mockJob}
            onViewDetails={mockOnViewDetails}
            editingCell={mockEditingCell}
            onCellClick={mockOnCellClick}
            onCellChange={mockOnCellChange}
            onCellBlur={mockOnCellBlur}
            onDeleteJob={mockOnDeleteJob}
          />
        </tbody>
      </table>
    );
    expect(screen.getByDisplayValue('Software Engineer')).toBeInTheDocument();
  });

  it('calls onCellChange when input value changes', () => {
    render(
      <table>
        <tbody>
          <JobApplicationRow
            job={mockJob}
            onViewDetails={mockOnViewDetails}
            editingCell={mockEditingCell}
            onCellClick={mockOnCellClick}
            onCellChange={mockOnCellChange}
            onCellBlur={mockOnCellBlur}
            onDeleteJob={mockOnDeleteJob}
          />
        </tbody>
      </table>
    );
    fireEvent.change(screen.getByDisplayValue('Software Engineer'), { target: { value: 'New Title' } });
    expect(mockOnCellChange).toHaveBeenCalledWith(expect.any(Object), mockJob.id, 'job_title');
  });

  it('calls onCellBlur when input loses focus', () => {
    render(
      <table>
        <tbody>
          <JobApplicationRow
            job={mockJob}
            onViewDetails={mockOnViewDetails}
            editingCell={mockEditingCell}
            onCellClick={mockOnCellClick}
            onCellChange={mockOnCellChange}
            onCellBlur={mockOnCellBlur}
            onDeleteJob={mockOnDeleteJob}
          />
        </tbody>
      </table>
    );
    fireEvent.blur(screen.getByDisplayValue('Software Engineer'));
    expect(mockOnCellBlur).toHaveBeenCalled();
  });
});