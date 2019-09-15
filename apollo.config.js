module.exports = {
  client: {
    service: {
      name: 'Diary',
      localSchemaFile: './app/graphql/schema.json',
      includes: ['./app/javascript/**/*.ts'],
      addTypename: true,
    },
  },
};
