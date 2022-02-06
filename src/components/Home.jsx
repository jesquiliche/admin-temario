import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/spacelab/bootstrap.min.css"
import SideBar from "../components/sidebar/SideBar";
import Content from "../components/content/Content";
import "../App.css";
import UserProvider from '../context/UserProvider';



const Home = (props) => {
    console.log(props)
    //const open= props.sidebarIsOpen== "true" ? true:false;
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  
    return (
        <>
         <UserProvider>
            <Router>
                <div className="App wrapper"> 
                    <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
                    <Content toggleSidebar={toggleSidebar} sidebarIsOpen={true} />
                </div>
            </Router>
         </UserProvider>
              
        </>
    )
}

export default Home
