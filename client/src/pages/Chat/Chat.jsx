import React from 'react';
import JoshChatIdea from './JoshChatIdea.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';

function Chat() {
  return (
    <>
      <NavBar />
      <main>
        <JoshChatIdea />
      </main>
    </>
  );
}

export default Chat;
