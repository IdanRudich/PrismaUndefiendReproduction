a reproduction of sql queries not generating correctly when using undefiend on mssql.  
Forked directly from https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql  
And modified to use mssql with the help of: https://github.com/prisma/prisma-examples/tree/latest/databases/sql-server

Also changed to use apollo-server primaraly and not graphql nexus.

# Setup:
```bash
npm i
docker-compose up -d
docker ps # see db is really up and working on port 1443
npm run generate
npx prisma migrate deploy
npm run create-data
node script.js

or 

npm run dev (and then the queries from below)
```

# Running the queries
First, we would run the resolver without the undefiend side affect by going to http://localhost:4000/ and runnign the following query:
```graphql
query ExampleQuery {
  getPosts(id: 1) {
    id
  }
}
```

As we could see from the console output, a simple SELECT WHERE was executed:
```
Query: SELECT [dbo].[Post].[id], [dbo].[Post].[createdAt], [dbo].[Post].[title], [dbo].[Post].[content], [dbo].[Post].[published], [dbo].[Post].[authorId] FROM [dbo].[Post] WHERE [dbo].[Post].[id] = @P1
Duration: 0ms
```


Now, we sould go again and run the following query which has a undeifiend side affect:
```graphql
query ExampleQuery {
  getPostsUndefiend(id: 1) {
    id
  }
}
```

As we could see, this would lead to an unecessery JOIN on the porvided undefiend TAGS tables:

```bash
Query: SELECT [dbo].[Post].[id], [dbo].[Post].[createdAt], [dbo].[Post].[title], [dbo].[Post].[content], [dbo].[Post].[published], [dbo].[Post].[authorId] FROM [dbo].[Post] WHERE ([dbo].[Post].[id] = @P1 AND ([dbo].[Post].[id]) IN (SELECT [t0].[A] FROM [dbo].[_TagToPost] AS [t0] INNER JOIN [dbo].[Tag] AS [j0] ON (([j0].[id] = [t0].[B])) WHERE (1=1 AND [t0].[A] IS NOT NULL)))
Duration: 1ms
```
