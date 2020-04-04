import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import classes from './Chat.module.css';

const Chat = (props) => {
  const [formData, setFormData] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(props.appData);
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setMessages(
      messages.concat({
        meta: {
          datetime: '4/4/2020',
          username: 'John',
        },
        content: formData,
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.chatContainer}>
        <div className={classes.sidebar}>
          <div className={classes.roomName}>
            <h2>{props.appData.room}</h2>
          </div>
          <ul className={classes.users}>
            <li>John</li>
            <li>Neo</li>
            <li>Lisa</li>
          </ul>
        </div>
        <div className={classes.msgContainer}>
          {messages.map((msg, index) => (
            <div key={index} className={classes.msg}>
              <div className={classes.msgMeta}>
                {`${msg.meta.username} said on ${msg.meta.datetime}:`}
              </div>
              <div className={classes.msgContent}>{msg.content}</div>
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
