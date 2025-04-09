import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Weather from "./pages/weather/Weather";
import WeatherDetails from "./pages/weather/WeatherDetails";
import Crypto from "./pages/crypto/Crypto";
import CryptoDetails from "./pages/crypto/CryptoDetails";
import News from "./pages/news/News";
// import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UserPreferences from "./components/UserPreferences";
import NotificationManager from "./components/NotificationManager";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NotificationManager />
      {/* <Navbar /> */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "crypto",
          children: [
            {
              index: true,
              element: <Crypto />,
            },
            {
              path: ":cryptoId",
              element: <CryptoDetails />,
            },
          ],
        },
        {
          path: "weather",
          children: [
            {
              index: true,
              element: <Weather />,
            },
            {
              path: ":cityId",
              element: <WeatherDetails />,
            },
          ],
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "preferences",
          element: <UserPreferences />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
