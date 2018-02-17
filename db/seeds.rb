# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.new(email: 'usain@bolt.com', first_name: 'Usain', last_name: 'Bolt', password: 'Running')
workouts = [{user_id: 37, distance: 6, time: 40, notes: 'felt pretty good today', workout_date: 'Feb 18 2018'},
  {user_id: 37, distance: 8, time: 67, notes: 'felt really fast today', workout_date: 'Feb 17 2018'},
  {user_id: 37, distance: 4, time: 25, notes: 'felt really tired today', workout_date: 'Feb 16 2018'},
  {user_id: 37, distance: 10, time: 112, notes: 'It is cold today', workout_date: 'Feb 15 2018'},
  {user_id: 37, distance: 8, time: 53, notes: 'Had a really tough run today', workout_date: 'Feb 14 2018'},
  {user_id: 37, distance: 4, time: 30, notes: 'Recovery Day', workout_date: 'Feb 13 2018'},
  {user_id: 37, distance: 8, time: 56, notes: 'Long Run Day', workout_date: 'Feb 12 2018'},
  {user_id: 37, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Feb 11 2018'},
  {user_id: 37, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Feb 10 2018'},
  {user_id: 37, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Feb 9 2018'},
  {user_id: 37, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Feb 8 2018'},
  {user_id: 37, distance: 10, time: 79, notes: 'Had a really tough run today', workout_date: 'Feb 7 2018'},
  {user_id: 37, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Feb 6 2018'},
  {user_id: 37, distance: 15, time: 105, notes: 'Long Run Day', workout_date: 'Feb 5 2018'},
  {user_id: 37, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Feb 4 2018'},
  {user_id: 37, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Feb 3 2018'},
  {user_id: 37, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Feb 2 2018'},
  {user_id: 37, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Feb 1 2018'},
  {user_id: 37, distance: 10, time: 79, notes: 'Had a really tough run today', workout_date: 'Jan 31 2018'},
  {user_id: 37, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Jan 30 2018'},
  {user_id: 37, distance: 10, time: 79, notes: 'Long Run Day', workout_date: 'Jan 29 2018'},
  {user_id: 37, distance: 8, time: 60, notes: 'Had a really tough run today', workout_date: 'Jan 28 2018'},
  {user_id: 37, distance: 5, time: 35, notes: 'Recovery Day', workout_date: 'Jan 27 2018'},
  {user_id: 37, distance: 7, time: 52, notes: 'Had a good run today', workout_date: 'Jan 27 2018'},
  {user_id: 37, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Jan 25 2018'},
  {user_id: 37, distance: 10, time: 75, notes: 'Had a really tough run today', workout_date: 'Jan 24 2018'},
  {user_id: 37, distance: 2, time: 17, notes: 'Recovery Day', workout_date: 'Jan 23 2018'},
  {user_id: 37, distance: 10, time: 79, notes: 'Long Run Day', workout_date: 'Jan 22 2018'},
  {user_id: 37, distance: 5, time: 35, notes: 'felt pretty good today', workout_date: 'Jan 21 2018'},
  {user_id: 37, distance: 3.5, time: 22, notes: 'felt really fast today', workout_date: 'Jan 20 2018'},
  {user_id: 37, distance: 2, time: 18, notes: 'felt really tired today', workout_date: 'Jan 19 2018'},
  {user_id: 37, distance: 5, time: 37, notes: 'It is cold today', workout_date: 'Jan 18 2018'},
  {user_id: 37, distance: 7, time: 44, notes: 'It is cold today and snowy', workout_date: 'Jan 17 2018'},
  {user_id: 37, distance: 10, time: 68, notes: 'Sunny and Cold', workout_date: 'Jan 16 2018'},
  {user_id: 37, distance: 3, time: 22, notes: 'Wow! what a great run', workout_date: 'Jan 15 2018'},
  {user_id: 37, distance: 6, time: 50, notes: 'It is cold today', workout_date: 'Jan 14 2018'}
]

# user.save!
workouts.each do |workout|
  Workout.create!(workout)
end
