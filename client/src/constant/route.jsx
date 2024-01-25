import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/commons/Layout';
import LoginPage from '../pages/Login';
import { GlobalStyles } from '../commons/styles/GlobalStyle';
import JoinPage from '../pages/Join';
import AdminPage from '../pages/Admin';

const Routers = () => {
    return (
        <Router>
            <GlobalStyles />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/join" element={<JoinPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default Routers;