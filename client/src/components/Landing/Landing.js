import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './Landing.module.css';

const Landing = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    room: 'React',
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    props.setAppData({ username: formData.username, room: formData.room });
    props.history.push('/chat');
    //context.updateState(formData.username, formData.room);
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>Welcome to chat app!</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <input
          name='username'
          className={classes.username}
          type='text'
          placeholder='Enter your name'
          required
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <div className={classes.room}>
          <span>Select room:</span>
          <select
            name='room'
            id='room'
            value={formData.room}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          >
            <option value='JavaScript'>React</option>
            <option value='Vue'>Vue</option>
            <option value='Angular'>Angular</option>
          </select>
        </div>

        <button className={classes.btn} type='submit'>
          Join
        </button>
      </form>
    </div>
  );
};

Landing.propTypes = {
  setAppData: PropTypes.func.isRequired,
};

export default withRouter(Landing);
