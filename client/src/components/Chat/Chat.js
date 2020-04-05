import React, { useState, useEffect, useRef } from 'react';
import io from '../../../node_modules/socket.io-client/dist/socket.io';
import PropTypes from 'prop-types';

import classes from './Chat.module.css';

const socket = io('http://localhost:5000', { autoConnect: false });

const Chat = (props) => {
  const [formData, setFormData] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const containerRef = useRef(null);

  console.log('chat rendered');

  useEffect(() => {
    socket.open();

    socket.on('message', (msg) => {
      setMessages((messages) => [...messages, msg]);
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    });

    socket.on('roomUsers', (data) => {
      setUsers(data.users);
    });

    socket.emit('joinRoom', {
      username: props.appData.username,
      room: props.appData.room,
    });

    return () => {
      socket.off('message');
      socket.off('roomUsers');

      socket.close();
    };
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    socket.emit('chatMessage', formData);
    // Scroll down
    //containerRef.current.scrollTop = containerRef.current.scrollHeight;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;

    setFormData('');
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>ChatApp</h2>
      <div className={classes.chatContainer}>
        <div className={classes.sidebar}>
          <div className={classes.roomname}>
            <h2>{props.appData.room}</h2>
          </div>
          <ul className={classes.users}>
            {users &&
              users.map((user, index) => <li key={index}>{user.username}</li>)}
          </ul>
        </div>
        <div className={classes.msgContainer} ref={containerRef}>
          {messages &&
            messages.map((msg, index) => (
              <div key={index} className={classes.msg}>
                <div className={classes.msgMeta}>
                  {`${msg.username} said on ${msg.time}:`}
                </div>
                <div className={classes.msgContent}>{msg.text}</div>
              </div>
            ))}
        </div>
      </div>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <input
            className={classes.inputMsg}
            type='text'
            name='message'
            id=''
            placeholder='Enter message..'
            onChange={(e) => setFormData(e.target.value)}
            value={formData}
            required
            autoComplete='off'
          />
          <button className={classes.btn} type='submit'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

Chat.propTypes = {
  appData: PropTypes.object.isRequired,
};

export default Chat;
