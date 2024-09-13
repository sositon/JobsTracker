import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './custom-bootstrap.css';
import Header from './components/Header';
import JobApplicationsTable from './components/JobApplicationsTable';
import MotivationalSection from './components/MotivationalSection';
import { AppProvider } from './AppContext';

const App = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <MotivationalSection />
          <JobApplicationsTable />
        </main>
        <footer className="bg-purple-300 text-white py-6 mt-16 fixed bottom-0 left-0 w-full">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 DreamJob Tracker. Chase your dreams!</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;
