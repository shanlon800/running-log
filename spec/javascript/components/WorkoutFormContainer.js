import WorkoutFormContainer from '../../../app/javascript/containers/WorkoutFormContainer'
import WorkoutsIndexContainer from '../../../app/javascript/containers/WorkoutsIndexContainer'

// beforeEach(() => {
//   tasks = [
//     {id: 1, title: 'Check the weather'}
//   ]
//   fetchMock.get('/api/v1/tasks', {
//     status: 200,
//     body: tasks
//   });
//   wrapper = mount(
//     <WorkoutFormContainer
//       currentUser={1}
//       addNewWorkout={addNewWorkout}
//       toggleNewForm={toggleNewForm}
//       showNewForm={true}
//       weekDropdown={['Monday', 'Tuesday']}
//     />
//   )
// })



describe('WorkoutFormContainer', () => {

  let wrapper,
  wrapper2,
  currentUser,
  handleSubmit,
  weekDropdown,
  toggleNewForm;

  beforeEach(() => {
    jasmineEnzyme();
    toggleNewForm = jasmine.createSpy('onClick spy');
    handleSubmit = jasmine.createSpy('onClick spy')
    wrapper = mount(
      <WorkoutFormContainer
        currentUser={1}
        handleSubmit={handleSubmit}
        toggleNewForm={toggleNewForm}
        showNewForm={true}
        weekDropdown={['Monday', 'Tuesday']}
      />
    );
    wrapper2 = mount(
      <WorkoutsIndexContainer
        currentUser={1}
      />
    )
    wrapper2.setState({ showNewForm: true});
  });

  it('should render an h3 tag', () => {
    expect(wrapper.find('h3').text()).toBe('Add A New Workout');
  })

  it('should render a button with the id of #add-new-workout-buttons with an onclick listener', () => {
    expect(wrapper.find('#add-new-workout-buttons')).toBePresent();
    wrapper.find('#add-new-workout-buttons').simulate('click');
    expect(toggleNewForm).toHaveBeenCalled();
  })

})
