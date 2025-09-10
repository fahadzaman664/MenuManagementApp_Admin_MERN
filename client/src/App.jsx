import { Toaster } from "sonner"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/sidebar-page";
import AddMenu from "./pages/AddMenu";

function App() {
  return (
    <>
         <Toaster closeButton />
      <Router>
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/addmenu" element={<AddMenu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
