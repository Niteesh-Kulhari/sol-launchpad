import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './componenets/navbar/index';
import { SpotlightPreview } from './componenets/hero';
import SignupFormDemo from "./launchPad";

function App() {
  return (
    <Router>
      <div className="h-screen overflow-hidden flex flex-col dark:bg-black">  {/* Set full height and prevent overflow */}
        <Navbar />
        
        {/* Define Routes for your different pages */}
        <div className="flex-1 overflow-hidden"> {/* Ensures the content area uses full remaining height */}
          <Routes>
            <Route path="/" element={<SpotlightPreview />} />
            <Route path="/start" element={ <SignupFormDemo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
