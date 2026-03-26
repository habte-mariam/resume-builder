import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor"; // እዚህ ጋር ዋናውን Editor ጥራው

function App() {
  return (
    <Router>
      <Routes>
        {/* መጀመሪያ ሲከፈት Dashboard እንዲታይ */}
        <Route path="/" element={<Dashboard />} />
        
        {/* ወደ Editor ሲሄድ */}
        <Route path="/editor/:id" element={<Editor />} />
        
        {/* የሌለ Path ከተጻፈ ወደ Dashboard ይመልሰው */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;