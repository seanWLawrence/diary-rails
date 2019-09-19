schema-path = app/graphql/schema.json

# Downloads GraphQL schema
schema-fetch = apollo client:download-schema $(schema-path) \
	--config apollo.config.js

# Parses the downloaded GraphQL schema and creates TypeScript types
schema-run-generator = yarn apollo client:codegen  \
	--config apollo.config.js \
	--localSchemaFile $(schema-path) \
	--tsFileExtension d.ts \
	--target typescript \
	--tagName gql \
	--includes app/javascript/**/*.graphql.ts

# Generates TypeScipt GraphQL types based on our schema
schema-generate-types = $(schema-fetch) && $(schema-run-generator)

# Docker commands to start Rails in production environment
production-start:
	$(schema-generate-types)
 	bundle exec rails db:create db:migrate RAILS_ENV=production
	bundle exec rails assets:precompile
	bundle exec rails server -e production -p 3000

# Docker commands to start Rails in development environment
development-start:
	$(schema-generate-types)
	foreman start -f Procfile.dev -p 3000

# Docker commands to start Rails in test environment
test-start:
	$(schema-generate-types)
	bundle exec rails db:reset RAILS_ENV=test
	bundle exec rails db:schema:load RAILS_ENV=test
	bundle exec rails db:migrate RAILS_ENV=test
	foreman start -f Procfile.test -p 3000

# Starts Rails in production environment
production:
	docker-compose up

# Starts Rails in development environment
start:
	docker-compose up -f docker-compose.development.yml

# Starts Rails in test environment
test:
	docker-compose up -f docker-compose.test.yml

# Lints and formats TypeScript files
lint:
	yarn tslint \
	--fix \
	--project tsconfig.json \
	--exclude cypress



