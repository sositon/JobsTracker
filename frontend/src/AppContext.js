import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrf_access_token";
axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);

  // auth.py is the file that contains the login and logout routes
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email: email.toLowerCase(),
        password,
      }, { withCredentials: true });
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setIsLoggedIn(true);
        fetchJobs();
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        console.log('Logout successful:', response.data);
        setIsLoggedIn(false);
        setJobs([]);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // job_applications.py is the file that contains the job applications routes
  const fetchJobs = useCallback(async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/job-applications`, { withCredentials: true })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
    });
  }, []);

  const addJob = (newJob) => {
    axios.post(`${process.env.REACT_APP_API_URL}/job-applications`, newJob, { withCredentials: true })
      .then((response) => {
        console.log('Job added:', response.data);
        setJobs([...jobs, response.data]);
      })
      .catch((error) => {
        console.error('Error adding job:', error);
      });
  };

  const updateJob = (updatedJob) => {
    if (updatedJob === undefined || updatedJob.id === undefined) {
      console.error('Invalid job:', updatedJob);
      return;
    }
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    axios.put(`${process.env.REACT_APP_API_URL}/job-applications/${updatedJob.id}`, updatedJob, { withCredentials: true })
      .then((response) => {
        console.log('Job updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating job:', error);
      });
  };

  const deleteJob = (jobId) => {
    console.log('Deleting job:', jobId);
    if (jobId === undefined) {
      return;
    }
    setJobs(jobs.filter(job => job.id !== jobId));
    axios.delete(`${process.env.REACT_APP_API_URL}/job-applications/${jobId}`, { withCredentials: true })
      .then((response) => {
        console.log('Job deleted:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting job:', error);
      });
  };

  const checkAuthStatus = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          fetchJobs();
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log('User is not logged in');
          setIsLoggedIn(false);
        }
      });
  }, [fetchJobs]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      jobs,
      login,
      logout,
      addJob,
      updateJob,
      deleteJob,
      fetchJobs
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);