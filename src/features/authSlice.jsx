import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userName: '',
    token: ''
  },
  reducers: {
    getAuth(state, action) {
      state.userName = action.payload.nickname;
      state.token = action.payload.token;
    }
  }
})

export const { getAuth } = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;

export const registerAccount = (inputs) => async (dispatch) => {
  try {
    const result = await axios.post('https://todolist-api.hexschool.io/users/sign_up', {
      "email": inputs.email,
      "password": inputs.password,
      "nickname": inputs.userName
    })
    dispatch(getAuth(inputs.userName, result.data));
    return true;
  }
  catch (err) {
    console.log(err)
  }
}

export const loginData = (inputs) => async (dispatch) => {
  try {
    const res = await axios.post('https://todolist-api.hexschool.io/users/sign_in', {
      "email": inputs.email,
      "password": inputs.password
    })
    dispatch(getAuth(res.data));
    Cookies.set('authTokenCookie', res.data.token.toString(), { expires: 1 });
    Cookies.set('authNameCookie', res.data.nickname.toString(), { expires: 1 });
    return true;
  }
  catch (err) {
    console.log(err)
  }
}