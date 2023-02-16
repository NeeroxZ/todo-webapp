import styles from "../styles/userInfo.css";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../stores/AuthStore";
import {Navigate, useNavigate} from "react-router-dom";

export const UserPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
       <>
           <div className="containerUser">
               <div className="rowLogin">
                   <form className="box">
                       <p className="form-name">Change User Information</p>
                       <div className="userRow">
                               <h1>UserName</h1>
                               <input className="userInput" type="text" placeholder="Username"
                                      onChange={e => setUsername(e.target.value)}
                               />
                       </div>
                       <div className="userRow">
                               <h1>E-Mail</h1>
                               <input className="userInput" type="email" placeholder="E-Mail"
                                      onChange={e => setUsername(e.target.value)}
                               />
                       </div>
                       <div className="userRow">
                           <h1>Password</h1>
                           <input className="userInput" type="password" placeholder="Password"
                                  onChange={e => setUsername(e.target.value)}
                           />
                       </div>
                       <div className="userRow">
                           <h1>Bockmark instead of DUE</h1>
                           <input type="checkbox"/>
                       </div>
                       <div className="userRow">
                           <h1>Disable Done Todo`s</h1>
                           <input type="checkbox" className="checkBoxInput"/>
                           <span className="checkmark"></span>
                       </div>
                       <input className="btn-submit" type="submit" name="" value="Save"></input>
                       <input className="btn-delete" type="submit" name="" value="Delete"></input>

                   </form>
               </div>
           </div>
       </>
    );
}
