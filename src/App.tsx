import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from './store';

function App() {
  return (
      <ReduxProvider store={store}>
        <div className="App">
        </div>
      </ReduxProvider>
  );
}

export default App;
