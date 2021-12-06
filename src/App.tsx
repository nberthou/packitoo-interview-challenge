import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import BriefForm from "./Components/BriefForm";

import store from './store';

function App() {
  return (
      <ReduxProvider store={store}>
        <div className="App">
            <BriefForm />
        </div>
      </ReduxProvider>
  );
}

export default App;
