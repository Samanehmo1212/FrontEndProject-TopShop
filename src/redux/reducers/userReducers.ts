import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import {
  BaseUser,
  CreateUser,
  Credentials,
  ReturnedCredential,
  User,
  UserReducer,
} from "../../types/user";
import axiosInstance from "../../common/axiosInstance";

const initialState: UserReducer = {
  userList: [],
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const response = await axiosInstance.get("users");
    const data: User[] = response.data;
    return data;
  } catch (e: any) {
    const error = e as AxiosError;
    return error;
  }
});
export const authenticatCredential = createAsyncThunk(
  "authenticatCredential",
  async ({ email, password }: Credentials) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      const data: ReturnedCredential = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);
export const authenticatCredentialWithForm = createAsyncThunk(
  "authenticatCredentialWithForm",
  async ({ email, password }: Credentials) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      const data: ReturnedCredential = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const loginUserForm = createAsyncThunk(
  "loginUserForm",
  async (access_token: string) => {
    try {
      const response = await axiosInstance.get("auth/profile", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data: User = response.data;
      console.log("userrrrrr", data);
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (access_token: string) => {
    try {
      const response = await axiosInstance.get("auth/profile", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data: User = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);
/**Register user via form and upload file */
export const createUserWithForm = createAsyncThunk(
  "createUserWithForm",
  async (user: BaseUser) => {
    try {
      const response = await axiosInstance.post(
        "files/upload",
        { file: user.avatar[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const url: string = response.data.location;
      /*use the url with the rest of properties in user to create new user */
      const userResponse = await axiosInstance.post("users", {
        ...user,
        avatar: url,
      });
      const userData = userResponse.data;
      return userData;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);
export const createUser = createAsyncThunk(
  "createUser",
  async (user: CreateUser) => {
    try {
      console.log("hiii");
      const response: AxiosResponse<User, User> = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        user
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      if (state.currentUser) state.currentUser = undefined;
    },
    setCurrentUser: (state, action) => {
      if (state.currentUser === undefined) {
        state.currentUser = action.payload;
      }
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return state;
      } else {
        state.userList = action.payload;
      }
    });

    build.addCase(fetchAllUsers.rejected, (state, action) => {
      console.log("error in fetching");
      return state;
    });
    build.addCase(fetchAllUsers.pending, (state, action) => {
      console.log("data is loading");
      return state;
    });
    build.addCase(authenticatCredential.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return state;
      } else {
        state.access_token = action.payload.access_token;
      }
    });
    build.addCase(authenticatCredentialWithForm.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return state;
      } else {
        state.access_token = action.payload.access_token;
        localStorage.setItem("token", state.access_token);
      }
    });
    build.addCase(loginUserForm.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return state;
      } else {
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        console.log(
          "currentUserfromreducer",
          localStorage.getItem("currentUser")
        );
      }
    });

    build
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else {
          state.currentUser = action.payload;
        }
      })

      .addCase(createUserWithForm.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          console.log("byyyyyyy");
          return state;
        } else {
          console.log("hiiiiiiii");
        }
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
export const { logoutUser, setCurrentUser } = userSlice.actions;
