import React from 'react'
import styled from 'styled-components'
import { BiLogoCodepen } from "react-icons/bi";

const Logo = () => {
  return (
    <Container>

      <div className="logo"> <BiLogoCodepen /> <p> NoteLy.</p></div>
      <p className='below'>Ride the wave of productivity</p>

    </Container>
  )
}

const Container = styled.div`
/* background-color: red; */
margin: 5vh 0 2vh 0; 
height: 100px;
display: flex;
flex-direction: column;
align-items: center;
  .logo {
    font-size: 3rem;
  }
  .below{
    color: #242424;
  }
`

export default Logo