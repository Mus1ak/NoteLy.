import React from 'react';
import { BsFillPinFill } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';
import { AiTwotoneDelete } from 'react-icons/ai';
import styled from 'styled-components';

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onClick, 
}) => {
  return (
    <Container onClick={onClick}>
      <Header>
        <Title>
          <h6>{title}</h6>
          <span>{date}</span>
        </Title>
        <PinIcon onClick={(e) => { e.stopPropagation(); onPinNote(); }} isPinned={isPinned} />
      </Header>
      <Content>{content?.slice(0, 200)}</Content>
      <Footer>
        <Tags>{tags}</Tags>
        <Actions>
          <TbEdit className="icon" onClick={(e) => { e.stopPropagation(); onEdit(); }} />
          <AiTwotoneDelete className="icon" onClick={(e) => { e.stopPropagation(); onDelete(); }} />
        </Actions>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  border: 2px solid #ebe6e6;
  border-radius: 25px;
  height: 40vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 6px rgba(117, 117, 117, 0.16), 0 3px 6px rgba(148, 148, 148, 0.23);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;

  h6 {
    margin: 0;
    font-size: 1.25rem;
  }

  span {
    font-size: 0.875rem;
    color: #888;
  }
`;

const PinIcon = styled(BsFillPinFill)`
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ isPinned }) => (isPinned ? 'gold' : '#888')};
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Content = styled.p`
  flex-grow: 1;
  margin: 20px 0;
  color: #333;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tags = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;

  .icon {
    font-size: 1.25rem;
    cursor: pointer;
    color: #888;

    &:hover {
      color: #333;
    }
  }
`;

export default NoteCard;
