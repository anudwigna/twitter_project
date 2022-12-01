import React from 'react';
import './Sidebar.css';
import { Twitter,Home,User, Edit , Cube, List} from '@web3uikit/icons';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <>

          <div className='siderContent'>
              <div className='menu'>
                  <div className='details'>
                      <Twitter fontSize="50px" />
                  </div>
                  
                  <Link to="/" className="link" >
                    <div className='menuItems'>
                        <Home fontSize="50px" /> Home   
                    </div>
                  </Link>

                  <Link to="/profile" className="link" >
                    <div className='menuItems'>
                        <User fontSize="50px" /> Profile   
                    </div>
                  </Link>

                  <Link to="/settings" className="link" >
                    <div className='menuItems'>
                        <Edit fontSize="50px" /> Edit Profile   
                    </div>
                  </Link>

                  <Link to="/explore" className="link" >
                    <div className='menuItems'>
                        <Cube fontSize="50px" /> Explore <></>
                      
                    </div>
                  </Link>
                  
                  <Link to="/Lists" className="link" >
                    <div className='menuItems'>
                        <List fontSize="50px" /> Lists   
                    </div>
                  </Link>
              </div>
          </div>
        </>
    );
}

export default Sidebar;