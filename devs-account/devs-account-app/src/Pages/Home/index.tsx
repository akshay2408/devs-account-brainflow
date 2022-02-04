import { lazy } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Layout from "../../Components/Layout";

const Auth = lazy(() => import("../../Modules/Auth"));

const HomePage = () => {
    const { user: { loggedIn } } = useSelector((state: any) => state.auth);
    
    if (loggedIn) return <Redirect to="/secure" />; // if user is already logged in
    
    return (
        <Layout>
            <Auth />
        </Layout>
    );
};

export default HomePage;
