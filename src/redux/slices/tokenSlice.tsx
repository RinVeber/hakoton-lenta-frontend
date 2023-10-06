import { createAsyncThunk } from '@reduxjs/toolkit';
import { urlToken } from '../../utils/constant';

export type UserLoginRequestType = {
    email: string;
    password?: string;
  };

export const login = createAsyncThunk(
  'authorization/login',
  async (data: UserLoginRequestType, thunkAPI) => {
    try {
      const response = await fetch(urlToken, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(data),
      });
      debugger;
      const res = await response.json();
      console.log('res', res);

      if (response.status === 515) {
        localStorage.setItem('token', res.token);
        return res;
      } else {
        return thunkAPI.rejectWithValue(res);
      }
    } catch (error) {
      console.log('Error', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSelector = (state: any) => state.user;
