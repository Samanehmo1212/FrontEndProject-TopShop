import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { Action } from "@remix-run/router";
import {
  createProduct,
  createProductWithForm,
  fetchAllProducts,
  modifyProduct,
} from "../../redux/reducers/productReducers";
import { createStore, RootState } from "../../redux/store";
import { CreateProduct } from "../../types/product";
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
afterAll(() => {
  server.close();
});

describe("Test all the actions", () => {
  test("should run initial state", () => {
    expect(store.getState().productReducer.length).toBe(0);
  });

  test("Shouls fetch all products", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productReducer.length).toBe(3);
  });
  test("Should create a new product", async () => {
    const newProduct: CreateProduct = {
      title: "new product",
      price: 1000,
      description: "test new product",
      categoryId: 1,
      images: [],
    };
    await store.dispatch(createProduct(newProduct));
    expect(store.getState().productReducer.length).toBe(1);
  });
  test("Should modify a product", async () => {
    await store.dispatch(fetchAllProducts());
    await store.dispatch(
      modifyProduct({
        id: 1,
        update: {
          price: 600,
        },
      })
    );
    console.log(
      store.getState().productReducer.find((product) => product.id === 1)?.title
    );
    expect(
      store.getState().productReducer.find((product) => product.id === 1)?.price
    ).toBe(600);
  });
  test("Should create product with form", async () => {
    const images: File[] = [
      {
        lastModified: 0,
        name: "test file image",
        webkitRelativePath: "",
        size: 0,
        type: "",
        arrayBuffer: function (): Promise<ArrayBuffer> {
          throw new Error("Function not implemented.");
        },
        slice: function (
          start?: number | undefined,
          end?: number | undefined,
          contentType?: string | undefined
        ): Blob {
          throw new Error("Function not implemented.");
        },
        stream: function () {
          throw new Error("Function not implemented.");
        },
        text: function (): Promise<string> {
          throw new Error("Function not implemented.");
        },
      },
      {
        lastModified: 0,
        name: "test file image",
        webkitRelativePath: "",
        size: 0,
        type: "",
        arrayBuffer: function (): Promise<ArrayBuffer> {
          throw new Error("Function not implemented.");
        },
        slice: function (
          start?: number | undefined,
          end?: number | undefined,
          contentType?: string | undefined
        ): Blob {
          throw new Error("Function not implemented.");
        },
        stream: function () {
          throw new Error("Function not implemented.");
        },
        text: function (): Promise<string> {
          throw new Error("Function not implemented.");
        },
      },
    ];

    const product: CreateProduct = {
      title: "new product",
      price: 1000,
      description: "test new product",
      categoryId: 1,
      images: [],
    };
    await store.dispatch(createProductWithForm({ images, product }));
    expect(store.getState().productReducer.length).toBe(1);
  });
});
