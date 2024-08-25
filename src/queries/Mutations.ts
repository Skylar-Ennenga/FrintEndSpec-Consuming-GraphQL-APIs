
import { gql } from '@apollo/client';




export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost (input: {title: $title, body: $body}){
      id
      title
      body
    }
  }
`;

export const UPDATE_POST = gql`

mutation uspdatePost($id: ID!, $title: String!, $body: String!) {
  updatePost(id: $id, input: {title: $title, body: $body}){
    id
    title
    body
  }
}
`;


export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;