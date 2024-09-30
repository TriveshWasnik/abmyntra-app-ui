import { BrowserRouter, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
          <Toaster />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
