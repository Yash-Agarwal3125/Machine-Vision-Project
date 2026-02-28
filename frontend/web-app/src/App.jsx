import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MedicalHistory from './pages/MedicalHistory';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import AIChat from './pages/AIChat';
import UploadReport from './pages/UploadReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="history" element={<MedicalHistory />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="upload" element={<UploadReport />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
