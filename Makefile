test-start:
	bundle exec rails db:reset RAILS_ENV=test
	bundle exec rails db:schema:load RAILS_ENV=test
	bundle exec rails db:migrate RAILS_ENV=test
	foreman start -f Procfile.test -p 3000

start:
	foreman start -f Procfile.dev -p 3000