import tasksReducer, { addTask } from '../src/redux/tasksSlice';

describe('tasks reducer', () => {
  it('should handle initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual({
      tasks: []
    });
  });

  it('should handle addTask', () => {
    const actual = tasksReducer(undefined, addTask('New Task'));
    expect(actual.tasks.length).toEqual(1);
    expect(actual.tasks[0].description).toEqual('New Task');
  });
});
