export const getUserInfo = (userName: string) => ({
  query: `{
    search(query: "${userName}", type: USER, first: 1) {
      userCount,
      edges {
        node {
          ... on User {
            name,
            login,
            avatarUrl,
            email,
            company,
            twitterUsername,
            followers(first: 20) {
              totalCount,
              edges {
                node {
                  login
                }
              }
            },
            following(first: 20) {
              totalCount,
              edges {
                node {
                  login
                }
              }
            }
          }
        }
      }
    }
  }`
});

export const searchForUser = (userName: string, after: string) => ({
  query: `{
    search(query: "${userName}", type: USER, first: 50, after: "${after}") {
      userCount,
      edges {
        node {
          ... on User {
            login
          }
        },
        cursor
      },
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }`
});
