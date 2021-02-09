// import all models
// const User = require('./User');

const Sequelize = require("sequelize")
const { Model, DataTypes } = require('sequelize');
const sequelizeConnection = require('../config/connection');
const moment = require("moment");
const bcrypt = require('bcrypt');

const Chatroom = require("./Chatroom");
const Session = require("./Session");
const User = require("./User");
const Posts = require("./Posts");
const Comments = require("./Comments")
const Milestones = require("./Milestones")
const UserInfos = require("./UserInfos")
// TODO: create associations
// create fields/columns for User model

// Deleting User sets NULL on a field in Post -> User has Post, Post belongs to User
// One user, many posts 
// One post, one user

User.hasMany(Posts, {
    foreignKey: 'user_id'
});
Posts.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Deleting Post sets NULL on a field in Milestone -> Post has Milestone, Milestone belongs to Post
// One milestone, one post
// One post, many milestones
Posts.hasMany(Milestones, {
    foreignKey: 'post_id'
});
Milestones.belongsTo(Posts, {
    // through: "PM",
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// Deleting Post sets NULL on a field in Comment -> Post has Comment, Comment belongs to Post
// One comment, one post
// One post, many comments
Posts.hasMany(Comments, {
    foreignKey: 'post_id'
});
Comments.belongsTo(Posts, {
    // through: "PC",
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// Deleting User sets NULL on a field in Comment -> User has Comment, Comment belongs to User
// One user, many comments
// One comment, one user
User.hasMany(Comments, {
    foreignKey: 'user_id'
});
Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Deleting User deletes record on UserInfo -> User has UserInfo, UserInfo belongs to User
// One user, one user info
// One user info, one user
User.hasOne(UserInfos, {
    foreignKey: 'uid'
});
UserInfos.belongsTo(User, {
    foreignKey: 'uid',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Posts,
    Comments,
    Milestones,
    UserInfos,
    Chatroom,
    Session
};