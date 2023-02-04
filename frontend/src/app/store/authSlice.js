import
{
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import authService from "../../api-service/authService";

export const login = createAsyncThunk('auth/login', async (user) =>
{
  const { username, password } = user
  const res = await authService.login(username, password)
  if (res.data) return res.data
  else {
    const data = res.response.data;
    if (data.message) {
      throw new Error(data.message)
    } else {
      let errorMessage = "";
      for (const key in data) {
        errorMessage += key[0].toUpperCase()
          + key.slice(1) + ": "
          + data[key][0] + " "
      }
      throw new Error(errorMessage)
    }
  }
})
export const getUser = createAsyncThunk('auth/getUser', async () =>
{
  const res = await authService.getUser()
  return res
})
let tokenString = null;
try {
  tokenString = JSON.parse(localStorage.getItem('token'))
} catch {

}
let currentWorkspace = null;
try {
  currentWorkspace = JSON.parse(localStorage.getItem('currentWorkspace'))
} catch {

}

const initialState = {
  user: null,
  token: tokenString,
  error: "",
  currentWorkspace,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) =>
    {
      state.token = action.payload
      localStorage.setItem("token", JSON.stringify(action.payload))
    },
    setCurrentWorkspace: (state, action) =>
    {
      state.currentWorkspace = action.payload
      localStorage.setItem("currentWorkspace", JSON.stringify(action.payload))
    },
    logout: (state) =>
    {
      state.token = null;
      state.user = null;
      localStorage.setItem("token", null)
    }
  },
  extraReducers(builder)
  {
    builder
      .addCase(login.fulfilled, (state, action) =>
      {
        state.token = action.payload
        localStorage.setItem("token", JSON.stringify(action.payload))
      })
      .addCase(login.rejected, (state, action) =>
      {
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) =>
      {
        state.user = action.payload
      })
  }
});

export const selectUser = state => state.auth.user;
export const selectToken = state => state.auth.token;
export const selectError = state => state.auth.error;
export const selectCurrentWorkspace = state => state.auth.currentWorkspace;

export const { logout, setToken,setCurrentWorkspace } = userSlice.actions;
export default userSlice.reducer;
