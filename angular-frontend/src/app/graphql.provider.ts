import { Apollo, APOLLO_FLAGS, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

const uri = 'http://localhost:8080/query'; // <-- add the URL of the GraphQL server here
export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_FLAGS,
    useValue: {
      useMutationLoading: true,
      useInitialLoading: true,
    },
  },
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },

];
