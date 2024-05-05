import React from 'react';
import styled from 'styled-components';

interface MessageBubbleProps {
  text: string;
  onClick: () => void;
  backgroundColor?: string; // Optional background color prop
}


const StyledMessageBubble = styled.div<{ clickable: boolean; backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: #333;
  padding: 8px 14px; // Slightly reduced padding for a tighter text block
  border-radius: 8px;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  margin: 8px 0;
  max-width: 80%;
  word-wrap: break-word;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; // Professional-looking font
  font-size: 14px; // Appropriate font size for readability

  &:hover {
    background-color: ${(props) => props.backgroundColor};
  }
`;


const MessageBubble: React.FC<MessageBubbleProps> = ({ text, onClick, backgroundColor = '#FFB000' }) => {
  return (
    <StyledMessageBubble clickable={!!onClick} onClick={onClick} backgroundColor={backgroundColor}>
      {text}
    </StyledMessageBubble>
  );
};

export default MessageBubble;
