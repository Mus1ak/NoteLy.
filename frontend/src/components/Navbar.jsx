import React, { useState } from 'react'
import styled from 'styled-components'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'
import { IoAddCircleSharp } from "react-icons/io5";
import { BiLogoCodepen } from "react-icons/bi";
import Logo from './Logo';
import { RiLogoutCircleLine } from "react-icons/ri";


const Navbar = ({userInfo}) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login")
  }

  return (
    <Container>
      <div className="main">
        <div className="top">
          {/* <div className="logo"> <BiLogoCodepen /> <p> Notly.</p></div> */}
          <Logo/>
          <Profile userInfo={userInfo} onLogout={onLogout}/>
          
        </div>
        <div className="bottom" onClick={onLogout}>
          <button className='logout' >Logout</button>
        <RiLogoutCircleLine />
        </div>

      </div>
      
    </Container>
  )
}

const Container = styled.div`
  background-color: #fec6a1;
  /* border-right: 1px solid #ebe6e6; */
  height: 100vh;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main {
    width: 80%;
    margin: 0 auto;

    .top {
      height: 92vh;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .bottom {
      width: max-content;
      display: flex;
      align-items: center;
      /* padding-bottom: 1px; */
      /* background-color: red; */
      gap: 5px;
      /* height: 10vh; */
      cursor: pointer;
      .logout {
        font-size: 1rem;
        font-family: "Poppins", "sans-serif";
        font-weight: 400;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
      &:hover {
        border-bottom: 2px solid black;
      }
    }
  }

  .logo {
    height: 20vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* font-size: 4rem; */
  }

  @media (max-width: 1200px) {
    width: 30%;
    
    .main {
      width: 90%;
      
      .top {
        gap: 15px;
      }

      .bottom .logout {
        font-size: 0.9rem;
      }
    }

    .logo {
      font-size: 3.5rem;
    }
  }

  @media (max-width: 992px) {
    width: 35%;
    
    .main {
      width: 90%;
      
      .top {
        gap: 10px;
      }

      .bottom .logout {
        font-size: 0.85rem;
      }
    }

    .logo {
      font-size: 3rem;
    }
  }

  @media (max-width: 768px) {
    width: 40%;
    
    .main {
      width: 95%;
      
      .top {
        gap: 10px;
      }

      .bottom .logout {
        font-size: 0.8rem;
      }
    }

    .logo {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 576px) {
    width: 100%;
    height: auto;
    
    .main {
      width: 100%;
      
      .top {
        flex-direction: row;
        flex-wrap: wrap;
        height: auto;
        gap: 10px;
      }

      .bottom .logout {
        font-size: 0.8rem;
      }
    }

    .logo {
      font-size: 2rem;
      height: 10vh;
    }

  }
`;



export default Navbar