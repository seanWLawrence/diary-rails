schema-generate:
	yarn apollo client:download-schema \
		--config apollo.config.js \
		--endpoint http://localhost:3000/graphql \
	&& yarn apollo client:codegen  \
		--config apollo.config.js \
		--tsFileExtension d.ts \
		--target typescript \
		--endpoint http://localhost:3000/graphql \
		--includes app/javascript/**/*.graphql.ts

lint:
	yarn tslint \
	--fix \
	--project tsconfig.json \
	--exclude cypress

test-start:
	bundle exec rails db:reset RAILS_ENV=test
	bundle exec rails db:schema:load RAILS_ENV=test
	bundle exec rails db:migrate RAILS_ENV=test
	foreman start -f Procfile.test -p 3000

start:
	foreman start -f Procfile.dev -p 3000

