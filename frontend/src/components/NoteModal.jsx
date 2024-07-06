import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const NoteModal = ({ note, onClose }) => {
  return (
    <Modal
      isOpen={!!note}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Note Details"
    >
      <Container>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <Tags>
          {note.tags}
        </Tags>
        <button onClick={onClose}>Close</button>
      </Container>
    </Modal>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    borderRadius: '25px', // Updated border radius
    border: '2px solid #ebe6e6'
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap:20px;
    position: relative;

  h2 {
    margin-bottom: 10px;
  }

  p {
    white-space: pre-wrap;
  }

  button {
    padding: 10px 20px;
    /* background-color: #db5035; */
    border: none;
    border-radius: 5px;
    width: max-content;
    cursor: pointer;
    right: 0;
    bottom: 0;
    position: absolute;
    
    font-family: "poppins";
    background-color: #363636;
    color:white;
    
    &:hover {
        background-color: #888;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
  color: #888;
`;

const Tag = styled.span`
  background-color: #e0e0e0;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.9rem;
`;

export default NoteModal;
