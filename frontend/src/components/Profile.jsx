import React from 'react'
import styled from 'styled-components'
import { getInitials } from '../utils/helper';
import { getFirstName } from '../utils/helper';



const Profile = ({userInfo}) => {
  return (
    <Container>
        <div className="profile-img"> {getInitials(userInfo?.fullName)} </div>
        <p> {getFirstName(userInfo?.fullName)}'s Notebook</p>
        
    </Container>
  )
}

const Container = styled.div`
    background-color: #f0f8ff21;
    padding: 2%;
    display: flex;
    align-items: center;
    border-radius: 50px;
    gap: 20px;
    width: 100%;

    overflow-x: hidden;

    font-size: 2vh;

    .profile-img{
        /* border: 2px solid #000000; */
        background-color: white;
        height: 40px;
        width: 40px;
        display: grid;
        place-items:center;
        border-radius: 50vw;
        /* font-weight: 900; */

    }
`

export default Profile