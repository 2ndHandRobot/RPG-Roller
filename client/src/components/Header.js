import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth';
import Access from './Access';

function Header (props) {
    const [showAccess, setShowAccess] = useState(false)
    let loggedIn = props.userState.loggedIn;
    function logout(){
        Auth.signout(props.setUserId);
    }
    function bypass() {
        const loginData={login:'admin',password:'abcd1234'}
        Auth.authenticate(loginData, props.setUserId)
    }
    return (
  
            <div className="Header">
                <Link to='/'>Home</Link><br/>
                {  
                    loggedIn ? (
                        <button onClick={logout}>Log Out</button>
                    ) : (
                        <button onClick={()=>setShowAccess(!showAccess)}>Log In/Register</button>
                    )
                }
                {
                    showAccess && (<Access userId={props.userState.userId} setUserId={props.setUserId} setShowThis={setShowAccess}/>)
                }
                {/* <button onClick={()=>{bypass();console.log("auth: ",Auth.getAuth())}}>Bypass</button> */}
            </div>
 
        )
}

export default Header;