import React from 'react';
import { render, screen } from '@testing-library/react';
import JobApplicationsTable from './JobApplicationsTable';

describe('JobApplicationsTable', () => {
    it('renders a table', () => {
        render(<JobApplicationsTable />);
        expect(screen.getByRole('table')).toBeInTheDocument();
    });
    
    it('renders a table with the correct columns', () => {
        render(<JobApplicationsTable />);
        expect(screen.getByText('Job Title')).toBeInTheDocument();
        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Location')).toBeInTheDocument();
        expect(screen.getByText('Application Date')).toBeInTheDocument();
        expect(screen.getByText('Application Status')).toBeInTheDocument();
        expect(screen.getByText('Application Method')).toBeInTheDocument();
    });

    it('renders a button to add a new job', () => {
        render(<JobApplicationsTable />);
        expect(screen.getByRole('button', { name: 'Add Job' })).toBeInTheDocument();
    });

});
