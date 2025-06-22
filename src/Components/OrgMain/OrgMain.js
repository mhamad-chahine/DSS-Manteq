import React from "react";
import { Link } from "react-router-dom";
import "./OrgMain.css";
import { Header, Footer } from "../index";



const OrgMain = () => {
    return (
        <>
        <Header />
        <div className="org-main">

            <div className="buttons">
                <Link to="/services" className="button">
                    Services
                </Link>
                <Link to="/users" className="button">
                    Users
                </Link>
            </div>
        </div>

        <Footer />
        </>
    );
};

export default OrgMain;
