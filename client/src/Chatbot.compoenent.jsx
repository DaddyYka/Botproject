import React, { useEffect, useState } from 'react';
import { Launcher } from '@bnbsystems/react-chat-window';
import io from 'socket.io-client';

const ChatBotRobot = () => {
  const [messageList, setMessageList] = useState([]);
  const [socket, setSocket] = useState(null);
  const room = 'user1';

  useEffect(() => {
    setSocket(io('http://localhost:3000'));
    _sendMessage('Hey there !');

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.connect(true);
      socket.emit('join', room);

      socket.on('send-msg-response', async (msg) => {
        setMessageList((prevMessageList) => {
          prevMessageList.pop();
          return [...prevMessageList];
        });
        _sendMessage(msg);
      });
    }
  }, [socket, room]);

  const _onMessageWasSent = async (message) => {
    setMessageList((prevMessageList) => [...prevMessageList, message]);
    _sendMessage('Hi');
    if (socket) {
      socket.emit('new-msg', { msg: message.data.text, room });
    }
  };

  const _sendMessage = (text) => {
    if (text.length > 0) {
      setMessageList((prevMessageList) => [
        ...prevMessageList,
        {
          author: 'them',
          type: 'text',
          data: { text },
        },
      ]);
    }
  };

  return (
    <div id="chatbox" className="chatbox">
      <Launcher
        agentProfile={{
          teamName: 'Chatbot',
          imageUrl: '',
        }}
        onMessageWasSent={_onMessageWasSent}
        messageList={messageList}
        showEmoji
      />
    </div>
  );
};

export default ChatBotRobot;