import React from 'react'
import LoginBox from '../../Components/LoginBox'
import "./login.css"
import {NavLink} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { signUpRequest ,loginRequest} from '../../Actions'
import SignUpBox from '../../Components/SignUpBox'

function Login() {
    const dispatch=useDispatch();

    const signUp=useSelector(state=>state.help.signUp)
    const signUpHandler=(e)=>{
        e.preventDefault();
        dispatch(signUpRequest())


    }
    const loginHadler=(e)=>{
        e.preventDefault()
        dispatch(loginRequest())

    }
    return (
        <div className="login">
      {signUp?
            <div className="login_new_user">
                
                 <div className="login_new_user_text">

                     Already have an account ?
                </div>
                    
                <div className="login_new_user_link" onClick={loginHadler}> Login</div>
                
          
                
            </div> 
                
                
                
                
                : <div className="login_new_user">
                <div className="login_new_user_text">

                     Don't have an account ?
                </div>
                    
                <div className="login_new_user_link" onClick={signUpHandler}> Get Started</div>
                
          
                
            </div> 
                
                
                
                }
                
            <div className="box">
                {signUp?
                <SignUpBox/>:  <LoginBox />
            
            }

              
            </div>




        </div>
    )
}

export default Login
