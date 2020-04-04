import React from 'react';

const state = React.createContext({
  username: '',
  room: '',
  updateState: (username, room) => {
    console.log('updating state...');
  },
});

export default state;
