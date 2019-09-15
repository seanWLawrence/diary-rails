schema-fetch = yarn apollo-codegen introspect-schema \
	http://localhost:3000/graphql --output app/graphql/schema.json \

schema-generate = yarn apollo-codegen generate **/*.graphql \
	--schema app/graphql/schema.json --target typescript \
	--output app/javascript/types/graphql-schema.d.ts --addTypename

schema-types = $(schema-fetch) && $(schema-generate)

test-start:
	$(schema-types)
	bundle exec rails db:reset RAILS_ENV=test
	bundle exec rails db:schema:load RAILS_ENV=test
	bundle exec rails db:migrate RAILS_ENV=test
	foreman start -f Procfile.test -p 3000

start:
	$(schema-types)
	foreman start -f Procfile.dev -p 3000

