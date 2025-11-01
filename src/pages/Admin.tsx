import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/Dashboard";
import AnnouncementsPage from "./admin/AnnouncementsPage";
import HeroImagesPage from "./admin/HeroImagesPage";
import MembersPage from "./admin/MembersPage";
import HomepageContentPage from "./admin/HomepageContentPage";
import SettingsPage from "./admin/SettingsPage";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
      <Route path="/hero-images" element={<HeroImagesPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/homepage-content" element={<HomepageContentPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default Admin;