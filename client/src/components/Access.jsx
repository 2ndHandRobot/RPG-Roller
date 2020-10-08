import React, { useState } from "react";
import { Collapse, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../Auth';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


export default function Access(props) {
    const [regMode, setRegMode] = useState(false);
    const [email, setLogin] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passValid, setPassValid] = useState('');
    const [showPass, setShowPass] = useState(false);
    
    function clearForm() {
        setLogin('');
        setUsername('');
        setPassword('');
        setPassValid('');

    }
    // console.log('Loading <Access>. State: ',{regMode: regMode,email:email,password:password,passValid:passValid,userId:props.userId})
    // console.log('Access props: ',props)    

    function moveFocus(elId) {
        setTimeout(()=>{document.getElementById(elId).focus();},10,);

    }

    function handleChange(event){
        switch (event.target.name) {
            case "email":
                setLogin(event.target.value);
                break;
            case "username":
                setUsername(event.target.value);
                break;
            case "passwd":
                setPassword(event.target.value);
                break;
            case "pass-val":
                setPassValid(event.target.value);
                break;
            default:
          }
    }

    function handleKeyPress(event) {
        console.log(event);
        switch (event.target.name) {
                case "email":
                    if ([9, 13].includes(event.charCode)) {
                        event.preventDefault();
                        moveFocus("passwd")                        
                    }
                break;
                case "passwd":
                    if ([9, 13].includes(event.charCode)) {
                        event.preventDefault();
                        if (regMode) {
                            moveFocus("pass-val");
                        } else {
                            moveFocus("email-button");
                        }
                    }
                break;
                case "pass-val":
                    if ([9, 13].includes(event.charCode)) {
                        event.preventDefault();
                        moveFocus("reg-button")
                    }
                break;
                default:

        }
    }

    
    function handleLoginClick() {
        console.log("DOING THIS: handleLoginClick")
        const loginData={
            email: email,
            userName: userName,
            password: password
        }
        Auth.authenticate(loginData, props.setUserId)
        clearForm();
        props.setShowThis(false);
    }

    function isEmail(str) {
        // check if the string is in an email format
        return true
    }

    function handleRegClick() {
        console.log("DOING THIS: handleRegClick")
        if (!regMode) {
            console.log("Entering Reg mode.");
            setRegMode(true);
            console.log("regMode: ",regMode);
        } else if (!isEmail(email)) {
            alert("Enter valid email");
            // moveFocus("email");
            } else if (password.length < 8) {
                console.log("Password only ",password.length," characters long.");
                alert("Password must be at least 8 characters long.");
                // moveFocus("passwd");
        } else if (password !== passValid) {
            console.log("Password fields do not match.");
            alert("Password fields do not match.");
            // moveFocus("pass-val");
        } else {
            console.log("Registering user ", email," / ",userName);
            regUser();
            props.setShowThis(false);
        }
    }

    function regUser(){
        console.log("DOING THIS: regUser")
        const payload = {
            email: email,
            userName: userName,
            password: password,
            loggedIn: false,
            privilege: 'user'
        }
        Auth.register(payload, props.setUserId);
    }

    return (
        <div>
            <form className="access-form">
                <Row>
                <Col>
                    <div className="login-field">
                        <input 
                            className="email" 
                            name="email" 
                            id="email" 
                            placeholder={regMode?"enter email":"email or user name"}
                            onChange={handleChange} 
                            onKeyPress={handleKeyPress} 
                            value={email}
                        />
                        <Collapse in={regMode}>
                            <input
                                // className={regMode ? "password" : "password hidden"}
                                name="username"
                                id="username"
                                placeholder="username"
                                onChange={handleChange} 
                                onKeyPress={handleKeyPress}
                                value={userName}
                            />
                        </Collapse>
                    </div>
                    </Col>
                </Row>
                    <Row>
                    <Col>
                    <div className="login-field">
                        <input 
                            className="password" 
                            type={!showPass&&"password"}
                            name="passwd" 
                            id="passwd" 
                            placeholder="enter password" 
                            onChange={handleChange} 
                            onKeyPress={handleKeyPress} 
                            value={password}
                        />
                        <Collapse in={regMode}>
                            <input
                                // className={regMode ? "password" : "password hidden"}
                                name="pass-val"
                                type={!showPass&&"password"}
                                id="password-validation"
                                placeholder="confirm password"
                                onChange={handleChange} 
                                onKeyPress={handleKeyPress}
                                value={passValid}
                            />
                        </Collapse>
                        <FontAwesomeIcon icon={faEye} className="eye" onClick={()=>{setShowPass(!showPass)}}/>
                    </div>
                    </Col>
                </Row>
                <Link to='/protected'>
                <button
                    className="btn btn-primary shadow-none login-btn"
                    type="button"
                    id="email-button"
                    onClick={handleLoginClick}
                >Login</button>
                </Link>
                <button
                    className="btn btn-primary shadow-none login-btn"
                    type="button"
                    id="reg-button"
                    dataToggle="collapse"
                    dataTarget="#password-validation"
                    aria-expanded={regMode}
                    aria-controls="password-validation"
                    onClick={handleRegClick}
                >Register</button>
                
            </form>
        </div>
    );
    }