import React from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { merge } from 'lodash';
import { ApolloLink, InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import * as options from '{{{OptionsFile}}}';
import remoteLink from './remote-link';
import pageTypeDefs from './pageSchema';
import {
  resolvers as pageResolvers,
  defaults as pageDefaults,
} from './pageResolvers';

const mainTypeDefs = gql`
  type Query {
    _void: String
  }

  type Mutation {
    _void: String
  }
`;

const mainDefaults = {
  _void: '_void',
};

const mainResolvers = {};

const typeDefs = [print(mainTypeDefs), print(pageTypeDefs)];
const defaults = merge(mainDefaults, pageDefaults);
const resolvers = merge(mainResolvers, pageResolvers);

const cacheOptions = options.cacheOptions || {};
const stateLinkOptions = options.stateLinkOptions || {};
const clientOptions = options.clientOptions || {};
const providerOptions = options.providerOptions || {};
const extraLinks = options.extraLinks || [];

const cache = options.makeCache
  ? options.makeCache({ cacheOptions })
  : new InMemoryCache({ ...cacheOptions });

const link = options.makeLink
  ? options.makeLink({ remoteLink, extraLinks })
  : ApolloLink.from([...extraLinks, remoteLink]);

export  const client = options.makeClient
  ? options.makeClient({ link, cache, clientOptions })
  : new ApolloClient({ link, cache, ...clientOptions });

export const provider = options.makeProvider
  ? options.makeProvider({ client, providerOptions })
  : ({ children }: any) => (
      <ApolloProvider client={client} {...providerOptions}>
        {children}
      </ApolloProvider>
    );
