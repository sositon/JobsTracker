import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { logger } from './utils/logger';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrf_access_token";
axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email: email.toLowerCase(),
        password,
      }, { withCredentials: true });
      if (response.status === 200) {
        logger.info('Login successful', { email });
        setIsLoggedIn(true);
        fetchJobs();
      }
      return response;
    } catch (error) {
      logger.error('Login error', { error: error.message, email });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        logger.info('Logout successful');
        setIsLoggedIn(false);
        setJobs([]);
      }
    } catch (error) {
      logger.error('Logout error', { error: error.message });
    }
  };

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/job-applications`, { withCredentials: true });
      setJobs(response.data);
      logger.info('Jobs fetched successfully', { count: response.data.length });
    } catch (error) {
      logger.error('Error fetching jobs', { error: error.message });
    }
  }, []);

  const addJob = (newJob) => {
    axios.post(`${process.env.REACT_APP_API_URL}/job-applications`, newJob, { withCredentials: true })
      .then((response) => {
        logger.info('Job added successfully', { jobId: response.data.id });
        setJobs([...jobs, response.data]);
      })
      .catch((error) => {
        logger.error('Error adding job', { error: error.message, job: newJob });
      });
  };

  const updateJob = (updatedJob) => {
    if (updatedJob === undefined || updatedJob.id === undefined) {
      logger.error('Invalid job for update', { job: updatedJob });
      return;
    }
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    axios.put(`${process.env.REACT_APP_API_URL}/job-applications/${updatedJob.id}`, updatedJob, { withCredentials: true })
      .then((response) => {
        logger.info('Job updated successfully', { jobId: updatedJob.id });
      })
      .catch((error) => {
        logger.error('Error updating job', { error: error.message, jobId: updatedJob.id });
      });
  };

  const deleteJob = (jobId) => {
    if (jobId === undefined) {
      logger.error('Invalid job ID for deletion', { jobId });
      return;
    }
    setJobs(jobs.filter(job => job.id !== jobId));
    axios.delete(`${process.env.REACT_APP_API_URL}/job-applications/${jobId}`, { withCredentials: true })
      .then((response) => {
        logger.info('Job deleted successfully', { jobId });
      })
      .catch((error) => {
        logger.error('Error deleting job', { error: error.message, jobId });
      });
  };

  const checkAuthStatus = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          fetchJobs();
          logger.info('User authenticated');
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          logger.info('User is not logged in');
          setIsLoggedIn(false);
        } else {
          logger.error('Error checking auth status', { error: err.message });
        }
      });
  }, [fetchJobs]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

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