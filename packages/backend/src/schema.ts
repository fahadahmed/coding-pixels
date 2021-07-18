import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '.', 'generated/nexus-graphql.ts'),
    schema: join(__dirname, '.', 'generated/graphql.ts'),
  }
});
