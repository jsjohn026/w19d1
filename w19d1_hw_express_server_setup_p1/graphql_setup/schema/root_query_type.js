const graphql = require("graphql");
const { 
  GraphQLObjectType, 
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLID 
} = graphql;
const mongoose = require("mongoose");
const User = mongoose.model("user");
const UserType = require("./user_type");
const Post = mongoose.model("post");
const PostType = require("./post_type");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType", 
  fields: {
    users: {
      type: new GraphQLList(UserType), 
      resolve() {
        return User.find({});
      } 
    },
    user: {
      type: UserType, 
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) { //id is destructured from args
        return User.findById(id)  //so that we can write id instead of args.id here
      }
    },
    posts: {
      type: new GraphQLList(PostType), 
      resolve() {
        return Post.find({});
      }
    }, 
    post: {
      type: PostType, 
      args: { id: { type: new GraphQLNonNull(GraphQLID) } }, 
      resolve(parentValue, args) {
        return Post.findById(args.id)
      }
    }
  }
});

module.exports = RootQuery;