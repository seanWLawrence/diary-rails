return unless Rails.env.test?

require('database_cleaner')

DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean

puts '-----------------------------------------'
puts '--- Successfully cleaned the database ---'
puts '-----------------------------------------'
