import { createSlice } from "@reduxjs/toolkit"

import { asyncLoginAction, asyncRegisterAction } from "../actions/auth"


const initialState = {
  token: "",
  successMessage: "",
  errorMessage: "",
  warningMessage: "",
  formError: []
}

const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    setWarningMessage: (state, action) => {
      state.warningMessage = action.payload
    },
    clearMessage: (state) => {
      state.errorMessage = ""
      state.warningMessage = ""
    },
    logout: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLoginAction.rejected, (state, action)=> {
      if(typeof action.payload === "string"){
        state.errorMessage = action.payload
      }else{
        state.formError = action.payload
      }
    })
    builder.addCase(asyncLoginAction.fulfilled, (state, action) => {
      state.token = action.payload
    })

    builder.addCase(asyncRegisterAction.rejected, (state, action)=> {
      if(typeof action.payload === "string"){
        state.errorMessage = action.payload
      }else{
        state.formError = action.payload
      }
    })
    builder.addCase(asyncRegisterAction.fulfilled, (state, action) => {
      state.successMessage = action.payload
    })
  }
})

export const {login, logout, setErrorMessage, setWarningMessage, clearMessage} = authSlice.actions
export default authSlice.reducer
