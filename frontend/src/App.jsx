import Navigation from './pages/Auth/Navigation.jsx';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div style={{color: "aliceblue" }}>
      <ToastContainer />
      <Navigation />
      <main>
        <Outlet /> {/* This ensures child routes (like login) are displayed */}
      </main>
    </div>
  );
}

export default App;
