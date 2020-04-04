import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Context from './context';
import Landing from './components/Landing/Landing';
import Chat from './components/Chat/Chat';

function App() {
  const [appData, setAppData] = useState({
    username: '',
    room: '',
  });

  return (
    <BrowserRouter>
      <Context.Provider>
        <div className='App'>
          <Switch>
            <Route
              path='/'
              exact
              render={() => <Landing setAppData={setAppData} />}
            />
            <Route
              path='/chat'
              exact
              render={() => <Chat appData={appData} />}
            />
          </Switch>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
