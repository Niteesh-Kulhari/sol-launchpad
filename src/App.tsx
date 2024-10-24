import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './componenets/navbar/index';
import { SpotlightPreview } from './componenets/hero';
import SignupFormDemo from "./launchPad";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        
        {/* Define Routes for your different pages */}
        <Routes>
          <Route path="/" element={<SpotlightPreview />} />
          <Route path="/start" element= { <SignupFormDemo/>} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
