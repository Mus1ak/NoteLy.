import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Toast = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 50000); // Adjust the timeout as needed
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <ToastContainer visible={visible}>
      <Message>{message}</Message>
    </ToastContainer>
  );
};

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
  z-index: 999;
`;

const Message = styled.p`
  margin: 0;
`;

export default Toast;
