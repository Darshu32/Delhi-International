import { Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import AboutPage from "./pages/AboutPage";
import AcademyPage from "./pages/AcademyPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import CampusPage from "./pages/CampusPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import TheDisWayPage from "./pages/TheDisWayPage";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/the-dis-way" element={<TheDisWayPage />} />
        <Route path="/academics" element={<AcademyPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/campus" element={<CampusPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
