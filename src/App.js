import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, MainPage, SuperAdmin, AddOrganization, Organization, ServiceDetails, Rules, Profile, OrgAdmin, OrgMain, Services} from "./Components/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/SuperAdmin" element={<SuperAdmin />} />
        <Route path="/add-organization" element={<AddOrganization />} />
        <Route path="/organization/:id" element={<Organization />} />
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        <Route path="/rules/:serviceName" element={<Rules />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/organizationadmin" element={<OrgMain />} />
        <Route path="/users" element={<OrgAdmin />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;
