# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.new(email: 'usain@bolt.com', first_name: 'Usain', last_name: 'Bolt', password: 'Running')
workouts = [{user_id: 1, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Feb 12 2018'},
  {user_id: 1, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Jan 13 2018'},
  {user_id: 1, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Jan 14 2018'},
  {user_id: 1, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Feb 15 2018'},
  {user_id: 1, distance: 10, time: 75, notes: 'Had a really tough run today', workout_date: 'Feb 16 2018'},
  {user_id: 1, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Feb 17 2018'},
  {user_id: 1, distance: 15, time: 17, notes: 'Long Run Day', workout_date: 'Feb 18 2018'},
  {user_id: 2, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Feb 12 2018'},
  {user_id: 2, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Feb 13 2018'},
  {user_id: 2, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Feb 14 2018'},
  {user_id: 2, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Feb 15 2018'},
  {user_id: 2, distance: 10, time: 75, notes: 'Had a really tough run today', workout_date: 'Feb 16 2018'},
  {user_id: 2, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Feb 17 2018'},
  {user_id: 2, distance: 15, time: 17, notes: 'Long Run Day', workout_date: 'Feb 18 2018'},
  {user_id: 3, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Feb 12 2018'},
  {user_id: 3, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Feb 13 2018'},
  {user_id: 3, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Feb 14 2018'},
  {user_id: 3, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Feb 15 2018'},
  {user_id: 3, distance: 10, time: 75, notes: 'Had a really tough run today', workout_date: 'Feb 16 2018'},
  {user_id: 3, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Feb 17 2018'},
  {user_id: 3, distance: 15, time: 17, notes: 'Long Run Day', workout_date: 'Feb 18 2018'}
]

# user.save!
workouts.each do |workout|
  Workout.create!(workout)
end
