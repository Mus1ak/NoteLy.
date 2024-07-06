import React from 'react'
import styled from 'styled-components'

const EmptyCard = () => {
  return (
    <Container>
        <img src="./public/empty-note.png" alt="Empty Note Card" />

        <h3>Opps! It appears that you have yet to add any notes!</h3>
    </Container>
  )
}

const Container = styled.div`
height: 100%;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
h3{
    font-size: 1rem;
    font-weight: 400;
}
    img{
        width: 200px;
        opacity: 0.6;
    }
`

export default EmptyCard