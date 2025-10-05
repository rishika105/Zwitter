import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer/index.ts";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer,
});

// Custom fetch that handles File objects for multipart uploads
const customFetch = (uri: string, options: RequestInit) => {
  const body = options.body as string;
  
  // Check if body contains File objects (parsed from JSON)
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch {
    return fetch(uri, options);
  }

  const operations = parsedBody;
  const hasFiles = Object.values(operations.variables || {}).some(
    (value) => value instanceof File
  );

  if (hasFiles) {
    // Build FormData for multipart upload
    const formData = new FormData();
    const fileMap: Record<string, string[]> = {};
    const files: File[] = [];

    // Extract files and build the map
    Object.entries(operations.variables).forEach(([key, value]) => {
      if (value instanceof File) {
        const fileIndex = files.length;
        files.push(value);
        fileMap[fileIndex.toString()] = [`variables.${key}`];
        operations.variables[key] = null;
      }
    });

    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify(fileMap));
    files.forEach((file, index) => {
      formData.append(index.toString(), file);
    });

    // Remove Content-Type header to let browser set it with boundary
    const headers = new Headers(options.headers);
    headers.delete('Content-Type');

    return fetch(uri, {
      ...options,
      headers,
      body: formData,
    });
  }

  return fetch(uri, options);
};

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
  fetch: customFetch as any,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
        <Toaster />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>
);