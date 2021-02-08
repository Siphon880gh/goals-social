// import all models
// const User = require('./User');

const Sequelize = require("sequelize")
const { Model, DataTypes } = require('sequelize');
const sequelizeConnection = require('../config/connection');
const moment = require("moment");
const bcrypt = require('bcrypt');

const Chatroom = require("./Chatroom");
const Session = require("./Session");

// TODO: create associations
// create fields/columns for User model
class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default"
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
}, {
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },

        // Future updating password feature
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize: sequelizeConnection,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

class Posts extends Model {}
Posts.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    goal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "default"
    },
    start: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    end: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
            // defaultValue: moment(new Date()).add(30, "days").format("M/D/YYYY H:m:SS")
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
}, {
    sequelize: sequelizeConnection,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts'
});

class Comments extends Model {}
Comments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
}, {
    sequelize: sequelizeConnection,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments'
});

class Milestones extends Model {}
Milestones.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    milestone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "default"
    },
    done: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    }
}, {
    sequelize: sequelizeConnection,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'milestones'
});


class UserInfos extends Model {}
UserInfos.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    abbr: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    linkFacebook: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    linkInstagram: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    linkLinkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    }
}, {
    sequelize: sequelizeConnection,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'userInfos'
});

/**
 * Example:
    Comment.belongsTo(Post, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL'
    });
 */

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