import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        {location.pathname !== "/dashboard" && <Header />}

        <main>
          <Outlet />
          <Toaster />
        </main>
        {location.pathname !== "/dashboard" && <Footer />}
      </div>
    </div>
  );
}

export default App;
