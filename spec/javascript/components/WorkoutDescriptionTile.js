import WorkoutDescriptionTile from '../../../app/javascript/components/WorkoutDescriptionTile'

describe('WorkoutDescriptionTile', () => {
  let date,
  distance,
  time,
  notes,
  currentUserId,
  creator,
  toggleEditForm,
  pace,
  handleDelete,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    toggleEditForm = jasmine.createSpy('onClick spy')
    handleDelete = jasmine.createSpy('onClick spy')
    wrapper = mount(
      <WorkoutDescriptionTile
      date="Feb 6 2018"
      distance={4}
      time={30}
      notes="Today was a great run"
      currentUserId={1}
      creator={1}
      pace='7:15'
      toggleEditForm={toggleEditForm}
      handleDelete={handleDelete}
      />
    );
  })

  it('should render an h2 tag with the date', () => {
    expect(wrapper.find('h2').text()).toBe('Feb 06, 2018');
  })

  it('should render an h4 tag with the header Workout Details', () => {
    expect(wrapper.find('h4').text()).toBe('Workout Details');
  })

  it('should render a p tag with an id of description-distance with the distance of the workout: Distance: # Miles', () => {
    expect(wrapper.find('#description-distance')).toHaveText("Distance: 4 Miles");
  });

  it('should render a p tag with an id of description-time with the time of the workout: Time: # Minutes', () => {
    expect(wrapper.find('#description-time')).toHaveText("Time: 30 Minutes");
  });

  it('should render a p tag with an id of description-pace with the pace of the workout: Pace: #/mi', () => {
    expect(wrapper.find('#description-pace')).toHaveText("Pace: 7:15/mi");
  });

  it('should render a p tag with an id of description-notes with the notes of the workout: Notes:...', () => {
    expect(wrapper.find('#description-notes')).toHaveText("Notes: Today was a great run");
  });

  it('should render a button with an id of delete-workout-button with an onclick method', () => {
    expect(wrapper.find('#delete-workout-button')).toBePresent();
    wrapper.find('#delete-workout-button').simulate('click');
    expect(handleDelete).toHaveBeenCalled();
  });

  it('should render a button with an id of delete-workout-button with an onclick method', () => {
    expect(wrapper.find('#edit-workout-button')).toBePresent();
    wrapper.find('#edit-workout-button').simulate('click');
    expect(toggleEditForm).toHaveBeenCalled();
  });


})
