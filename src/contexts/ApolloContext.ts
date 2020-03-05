import ApolloClient from 'apollo-boost';

const token = localStorage.getItem('token');

export const isBrowser = typeof window !== 'undefined';

export const client = isBrowser
  ? new ApolloClient({
      uri: `${process.env.MAGENTO_API}/graphql`,
      request: operation => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      },
    })
  : {};
