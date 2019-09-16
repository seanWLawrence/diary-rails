schema-path = app/graphql/schema.json

schema-fetch = apollo client:download-schema $(schema-path) \
	--config apollo.config.js

schema-generate = yarn apollo client:codegen  \
	--config apollo.config.js \
	--localSchemaFile $(schema-path) \
	--tsFileExtension d.ts \
	--target typescript \
	--tagName gql \
	--includes app/javascript/**/*.graphql.ts

schema-types = $(schema-fetch) && $(schema-generate)

schema-generate:
	$(schema-generate)

lint:
	yarn tslint \
	--fix \
	--project tsconfig.json \
	--exclude cypress

test-start:
	$(schema-types)
	bundle exec rails db:reset RAILS_ENV=test
	bundle exec rails db:schema:load RAILS_ENV=test
	bundle exec rails db:migrate RAILS_ENV=test
	foreman start -f Procfile.test -p 3000

start:
	$(schema-types)
	foreman start -f Procfile.dev -p 3000

