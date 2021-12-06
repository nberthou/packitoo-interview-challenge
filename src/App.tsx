import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import BriefForm from "./Components/BriefForm";

import store from './store';
import BriefList from "./Components/BriefList";

function App() {
  return (
      <ReduxProvider store={store}>
        <div className="App">
            <BriefForm />
            <BriefList />
        </div>
      </ReduxProvider>
  );
}

export default App;
