import { Password } from "@mui/icons-material";
import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { S } from "msw/lib/SetupServerApi-70cc71a7";
import { fetchAllProducts } from "../../redux/reducers/productReducers";
import {
  authenticatCredential,
  fetchAllUsers,
  loginUser,
} from "../../redux/reducers/userReducers";
import { RootState, createStore } from "../../redux/store";
import server from "../shared/server";

let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;
beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  store = createStore();
});
describe("Test all the actions", () => {
  test("should run initial state", () => {
    const initialState = store.getState().userReducer;
    expect(initialState.userList.length).toBe(0);
    expect(initialState.currentUser).toBeUndefined();
  });
  test("should fetch user list", async () => {
    await store.dispatch(fetchAllUsers());
    const state = store.getState().userReducer;
    expect(state.userList.length).toBe(3);
  });
  test("should login user with right credential", async () => {
    const credentials = {
      email: "john@mail.com",
      password: "changeme",
    };
    await store.dispatch(authenticatCredential(credentials));
    const access_token = store.getState().userReducer.access_token as string;
    await store.dispatch(loginUser(access_token));
    const currentUser = store.getState().userReducer.currentUser;
    expect(currentUser).toBeDefined();
    expect(currentUser?.email).toBe("john@mail.com");
  });
});
afterAll(() => {
  server.close();
});
