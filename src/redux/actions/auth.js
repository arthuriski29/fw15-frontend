import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../helpers/http"


export const asyncLoginAction = createAsyncThunk(
  "auth/sign-in", 
  async (payload, {rejectWithValue}) => {
    try{
      const body = new URLSearchParams(payload).toString()
      const {data} = await http().post("/auth/sign-in", body)
      return data.results.token
    }catch(err){
      const results = err.response?.data?.results
      const message = err.response?.data?.message
      if(results){
        return rejectWithValue(results)
      }
      if(err.code === "ERR_NETWORK"){
        return rejectWithValue("Error: Connection to Backend failed")
      }
      return rejectWithValue(message)
    }
  }
)
export const asyncRegisterAction = createAsyncThunk(
  "auth/sign-up", 
  async (payload, {rejectWithValue}) => {
    try{
      const body = new URLSearchParams(payload).toString()
      const {data} = await http().post("/auth/sign-up", body)
      return data.message
    }catch(err){
      const results = err.response?.data?.results
      const message = err.response?.data?.message
      if(results){
        return rejectWithValue(results)
      }
      if(err.code === "ERR_NETWORK"){
        return rejectWithValue("Error: Connection to Backend failed")
      }
      return rejectWithValue(message)
    }
  }
)
