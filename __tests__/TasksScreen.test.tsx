import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TasksScreen from '../src/screens/TasksScreen';

const mockStore = configureStore([]);

test('renders tasks screen', () => {
  const store = mockStore({
    tasks: {
      tasks: [{ id: '1', description: 'Test Task' }]
    }
  });

  const { getByText } = render(
    <Provider store={store}>
      <TasksScreen />
    </Provider>
  );

  expect(getByText('Test Task')).toBeTruthy();
  expect(getByText('Add New Task')).toBeTruthy();
});
