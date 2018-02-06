import WorkoutDetailTile from '../../../app/javascript/components/WorkoutDetailTile'

describe('WorkoutDetailTile', () => {
  let date,
  distance,
  time,
  notes,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <WorkoutDetailTile
        date="Feb 6 2018"
        distance={4}
        time={30}
        notes="Today was a great run"
      />
    );
  });

  it('should render an h4 tag with the date', () => {
    expect(wrapper.find('h4').text()).toBe('Feb 06, 2018')
  })

  it('should render a p tag with an id of #distance with the distance', () => {
    expect(wrapper.find('#distance').text()).toBe('Distance: 4 Miles')
  })
  it('should render a p tag with an id of #time with the time', () => {
    expect(wrapper.find('#time').text()).toBe('Time: 30 Minutes')
  })
  it('should render a p tag with an id of #notes with the notes', () => {
    expect(wrapper.find('#notes').text()).toBe('Notes: Today was a great run')
  })
});
