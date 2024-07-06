import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import styled from 'styled-components';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance";
import moment from "moment";
import EmptyCard from '../components/EmptyCard';
import NoteModal from '../components/NoteModal'; // Assuming you have a NoteModal component

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // get user info - for profile
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
        console.log("Notes fetched successfully");
      }
    } catch (error) {
      console.log("An unexpected error occurred");
    }
  };

  const deleteNote = async (id) => {
    try {
      await axiosInstance.delete(`/delete-note/${id}`);
      getAllNotes();
    } catch (error) {
      console.log("An unexpected error occurred");
    }
  };

  const editNote = (note) => {
    setSelectedNote(note);
    setEditMode(true);
    setIsModalOpen(true); // Open the modal in edit mode
  };

  const openNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true); // Open the modal to view the note
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <Container>
      <Navbar userInfo={userInfo}></Navbar>
      <div className="right">
        {allNotes.length > 0 ? (
          <div className="grid-container">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format('MM-DD-YYYY')}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => editNote(item)}
                onDelete={() => deleteNote(item._id)}
                onPinNote={() => {}}
                onClick={() => openNote(item)} // Open modal when note card is clicked
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>
      <AddNote
        getAllNotes={getAllNotes}
        editMode={editMode}
        setEditMode={setEditMode}
        selectedNote={selectedNote}
      />
      {isModalOpen && (
        <NoteModal
          note={selectedNote}
          onClose={() => setIsModalOpen(false)}
          onEdit={() => setEditMode(true)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  .right {
    padding: 50px;
    width: 100%;

    background-color: white;

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
    }
  }
`;

export default Home;
