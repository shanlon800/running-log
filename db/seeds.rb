# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.new(email: 'shanlon2@runninglog.com', first_name: 'Sean', last_name: 'Hanlon', password: 'Running')
workouts = [{user_id: 1, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Feb 5 2018'},
  {user_id: 1, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Jan 6 2018'},
  {user_id: 1, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Jan 7 2018'},
  {user_id: 1, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Feb 8 2018'},
  {user_id: 1, distance: 10, time: 75, notes: 'Had a really tough run today', workout_date: 'Feb 9 2018'},
  {user_id: 1, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Feb 10 2018'},
  {user_id: 1, distance: 15, time: 17, notes: 'Long Run Day', workout_date: 'Feb 11 2018'},
  {user_id: 2, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Feb 5 2018'},
  {user_id: 2, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Jan 6 2018'},
  {user_id: 2, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Jan 7 2018'},
  {user_id: 2, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Feb 8 2018'},
  {user_id: 2, distance: 10, time: 75, notes: 'Had a really tough run today', workout_date: 'Feb 9 2018'},
  {user_id: 2, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Feb 10 2018'},
  {user_id: 2, distance: 15, time: 17, notes: 'Long Run Day', workout_date: 'Feb 11 2018'},
  {user_id: 8, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Feb 5 2018'},
  {user_id: 8, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Jan 6 2018'},
  {user_id: 8, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Jan 7 2018'},
  {user_id: 8, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Feb 8 2018'},
  {user_id: 8, distance: 10, time: 75, notes: 'Had a really tough run today', workout_date: 'Feb 9 2018'},
  {user_id: 8, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Feb 10 2018'},
  {user_id: 8, distance: 15, time: 17, notes: 'Long Run Day', workout_date: 'Feb 11 2018'}
]

# user.save!
workouts.each do |workout|
  Workout.create!(workout)
end
