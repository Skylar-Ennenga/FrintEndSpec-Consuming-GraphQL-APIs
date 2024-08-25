import { gql } from "urql";


export const GET_POSTS = gql`
query getPosts {
  posts {
    data {
      id
      title
      body
      user{
        id
        username
      }
    }
  }
}

`;

export const GET_POST = gql`
query getPost($id: ID!){
  post(id: $id){
    id
    title
    body
    user{
      id
      username
    }
  }
}
`;

