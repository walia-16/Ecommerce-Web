import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout"; // Importing Layout
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";

// Define all the routes
const router = createBrowserRouter([
  {
    path: "/", // Parent route
    element: <Layout />, // Layout component
    children: [
      { path: "/", element: <Home /> }, // Child routes
      { path: "collection", element: <Collection /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "product/:productId", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "place-order", element: <PlaceOrder /> },
      { path: "orders", element: <Orders /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;


