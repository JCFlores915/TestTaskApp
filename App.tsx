import React from 'react';
import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import store from './src/redux/store';
import Navigation from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
