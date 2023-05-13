import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  token: '',
  errorMessage: '',
  warningMessage: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    login: (state, action) => {
      state.token = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    setWarningMessage: (state, action) => {
      state.warningMessage = action.payload
    },
    clearMessage: (state) => {
      state.errorMessage = ''
      state.warningMessage = ''
    },
    logout: () => {
      return initialState
    }
  }
})

export const {login, logout, setErrorMessage, setWarningMessage, clearMessage} = authSlice.actions
export default authSlice.reducer