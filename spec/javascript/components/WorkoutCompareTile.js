import WorkoutCompareTile from '../../../app/javascript/components/WorkoutCompareTile'

describe('WorkoutCompareTile', () => {
  let distance,
  time,
  notes,
  date,
  pace,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <WorkoutCompareTile
        date="Feb 6 2018"
        distance={4}
        time={30}
        notes="Today was a great run"
        pace='7:15'
      />
    );
  })


  it('renders a div with an class name of team-workout-date', () => {
    expect(wrapper.find('div.team-workout-date')).toBePresent();
  })

  it('should render an h3 tag with an id of #distance with the distance', () => {
    expect(wrapper.find('#distance').text()).toBe('4');
  })

  it('should render a p tag with a label of miles', () => {
    expect(wrapper.find('p').text()).toBe('Miles');
  })
})
