import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import Logo from '../components/Logo';
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();


    if(!name){
      setError("Please Enter Name!");
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email!");
      return;
    }

    if(!password){
      setError("Please Enter the password!");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,

      });
      if(response.data && response.data.error){

        setError(response.data.message)
        return

      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate("/Home");
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("An Unexpected error occured, Please Try again.");
      }
    }


  }

  return (
    <Container>
      <div className='side-image'></div>
      <div className='side-form'>
        <Logo/>
        <form action="" onSubmit={handleSignUp}>

          <h4>Sign up</h4>
          <input type="text" placeholder='Name' value={name} onChange={ (e) => setName(e.target.value)}/>
          <input type="text" placeholder='Email' value={email} onChange={ (e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='password' value={password} onChange={ (e) => setPassword(e.target.value)} />
         
          {error && <p className='error'>{error}</p>}
          <button type='submit'>Login</button>
          <p>Already Have an account? </p>
          <Link to="/login">Login</Link>

        </form>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  .side-image{
    background-image: url("./public/note-img.jpg");
    background-position: center;
    background-size: cover;
    height: 100%;
    width: 60%;
  }

  .side-form{
    height: 100%;
    width: 40%;
    /* background-color: red; */

    display: flex;
    flex-direction: column;

    .error{
      color: #db4f34;
    }

    .logo{
      height: 20vh;
      width: 100%;
      /* background-color: yellow; */
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
    }

    form{
      width: 100%;
      height: 80vh;
      /* background-color: red; */
      padding-top: 15%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      h4{
        /* background-color: red; */
        font-size: 2rem;
        font-weight: 300;
      }

      input{
        padding: 1rem;
        width: 50%;

        border: 1px solid #ebe6e6;

        border-radius: 50px;

        font-family: "poppins" , "sans-serif";

        &:focus{
          outline: none;
        }
      }

      button{
        padding: 1rem;
        border-radius: 50px;
        width: 20%;
        border: none;
        cursor: pointer;

        transition: background-color 0.04s cubic-bezier(0.455, 0.03, 0.515, 0.955);
        &:hover{
          background-color: #fec6a1;
        }
      }
    }
  }

  
    
`
export default Signup;