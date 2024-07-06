import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { IoAddCircleSharp } from "react-icons/io5";
import axiosInstance from '../utils/axiosInstance';

Modal.setAppElement('#root');

const AddNote = ({ getAllNotes, editMode, setEditMode, selectedNote }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setEditMode(false);
    setTitle('');
    setContent('');
    setTags('');
  };

  useEffect(() => {
    if (editMode && selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags);
      openModal();
    }
  }, [editMode, selectedNote]);

  const handleSaveNote = async () => {
    if (editMode) {
      await editExistingNote();
    } else {
      await addNewNote();
    }
  };

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        console.log("Note added successfully");
        getAllNotes();
        closeModal();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editExistingNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${selectedNote._id}`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        console.log("Note edited successfully");
        getAllNotes();
        closeModal();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <OpenButton onClick={openModal}>
        <IoAddCircleSharp className="icon" />
        <p>Add Note</p>
      </OpenButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note Modal"
      >
        <Container>
          <h2>{editMode ? 'Edit Note' : 'Add Note'}</h2>
          <div>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="content">CONTENT</label>
            <textarea
              id="content"
              type="text"
              placeholder="Content"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="tags">TAGS</label>
            <input
              id="tags"
              type="text"
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button onClick={handleSaveNote}>{editMode ? 'SAVE' : 'ADD'}</button>
          {error && <Error>{error}</Error>}
        </Container>
      </Modal>
    </>
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
    borderRadius: '25px',
    border: '2px solid #ebe6e6'
  },
};

const Container = styled.div`
width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input, textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 2px solid #ebe6e6;
    /* border-radius: 4px; */

    font-family: "poppins";

    &:focus{
      outline: none;
    }
  }

  button {
    padding: 10px 20px;
    background-color: #fec6a1;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;

    &:hover {
      background-color: #e2b08f;
    }
  }
`;

const OpenButton = styled.button`
  width: 200px;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 50px;
  background-color: transparent;
  gap: 20px;
  position: fixed;
  cursor: pointer;
  border: 1px solid #ebe6e6;
  bottom: 0;
  right: 0;
  transform: translate(-20%, -50%);
  font-family: 'Poppins';

  .icon {
    font-size: 50px;
  }

  p {
    margin: 0;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

export default AddNote;
