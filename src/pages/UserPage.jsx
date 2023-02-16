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
                       <h1 className="form-name">Sign In</h1>
                       <label>
                           <input className="placeholders" type="text" placeholder="Username"
                                  onChange={e => setUsername(e.target.value)}
                                  />
                       </label>
                       <label>
                           <input className="placeholders" type="password" placeholder="Password"
                                  onChange={e => setPassword(e.target.value)}
                                  />
                       </label>
                       <input className="btn-submit" type="submit" name="" value="Sign In"

                       />
                   </form>
               </div>
           </div>
       </>
    );
}
