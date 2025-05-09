import React, { useContext } from "react";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import {UserContext} from "../../context/UserContext"; // Corrected import casing


const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="">   
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
