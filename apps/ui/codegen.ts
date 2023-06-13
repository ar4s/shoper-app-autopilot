import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3001/graphql',
  documents: ['src/**/*.gql'],
  debug: true,
  verbose: true,
  generates: {
    './src/graphql-operations.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    }
  },
  ignoreNoDocuments: true,
};

export default config;
