import WorkoutDetailTile from '../../../app/javascript/components/WorkoutDetailTile'

describe('WorkoutDetailTile', () => {
  let date,
  distance,
  time,
  notes,
  currentUser,
  creator,
  toggleDetailPage,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    toggleDetailPage = jasmine.createSpy('onClick spy')
    wrapper = mount(
      <WorkoutDetailTile
        date="Feb 6 2018"
        distance={4}
        time={30}
        notes="Today was a great run"
        currentUser={1}
        creator={1}
        toggleDetailPage={toggleDetailPage}
      />
    );
  });

  it('should render an h4 tag with the day of the week', () => {
    expect(wrapper.find('h4').text()).toBe('Tuesday');
  })

  it('should render an h1 tag with an id of #distance with the distance', () => {
    expect(wrapper.find('#distance').text()).toBe('4');
  })

  it('should render an h7 tag with a label of miles', () => {
    expect(wrapper.find('h7').text()).toBe('Miles');
  })

  it('renders a div with an onclick method', () => {
    expect(wrapper.find('div.run-card')).toBePresent();
    wrapper.find('div.run-card').simulate('click');
    expect(toggleDetailPage).toHaveBeenCalled();
  })

//   it('should render a p tag with an id of #time with the time', () => {
//     expect(wrapper.find('#time').text()).toBe('Time: 30 Minutes')
//   })
//   // it('should render a p tag with an id of #notes with the notes', () => {
//   //   expect(wrapper.find('#notes').text()).toBe('Notes: Today was a great run')
//   // })
});
