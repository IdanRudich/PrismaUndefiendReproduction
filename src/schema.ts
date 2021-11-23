import { gql } from "apollo-server";

export const schema = gql`
  type Post {
    id: Int!
    title: String!
    content: String
    
    tags: [Tag]
  }

  type Tag {
    id: Int!
    tag: String!
  }

  type Query {
    getPosts(id: Int!): [Post]
    getPostsUndefiend(id: Int!): [Post]
  }
`