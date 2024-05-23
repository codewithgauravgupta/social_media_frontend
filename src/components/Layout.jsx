import React, { createContext, useMemo, useState } from "react";
import Navigationbar from "./Navbar";

export const Context = createContext("unknown");
function Layout(props) {
    return (
        <div>
            <Navigationbar />

            <div className="container m-5">{props.children}</div>
        </div>
    );
}

export default Layout;