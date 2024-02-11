import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { LoginView } from 'features/Login/LoginView';
import { CarDealershipView } from 'features/CarDealership/CarDealershipView';
import Header from 'components/layout/Header';
import { useAppSelector } from 'app/hooks';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.user.currentUser);
  let location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after logging in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<RequireAuth><CarDealershipView /></RequireAuth>} />
        {/* More authenticated routes as needed inside RequireAuth */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
