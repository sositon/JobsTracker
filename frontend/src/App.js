import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import JobApplicationsTable from './components/JobApplicationsTable';
import { AppProvider } from './AppContext';


const App = () => {
  return (
    <AppProvider>
      <div className="container">
        <Header />
        <h1 className='text-center'>Job Applications</h1>
        <JobApplicationsTable />
      </div>
    </AppProvider>
  );
};

export default App;
