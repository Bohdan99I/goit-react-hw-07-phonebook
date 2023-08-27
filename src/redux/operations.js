import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64e9dcacbf99bdcc8e670930.mockapi.io';

const handleErrors = (error, thunkAPI) => {
  if (error.response) {
    return thunkAPI.rejectWithValue(error.response.data);
  } else if (error.request) {
    return thunkAPI.rejectWithValue('The request could not be completed');
  } else {
    return thunkAPI.rejectWithValue('An error occurred');
  }
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return handleErrors(error, thunkAPI);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', {
        name: data.name,
        number: data.number,
      });
      return response.data;
    } catch (error) {
      return handleErrors(error, thunkAPI);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return handleErrors(error, thunkAPI);
    }
  }
);