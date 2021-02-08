/**
 * Insert some sample posts, comments, and users for testing purposes.
 */

const moment = require("moment");
const sequelizeConnection = require('../config/connection');

// This inits the models or tables:
const controllers = require("../models");

const {
    User,
    Posts,
    Comments,
    Milestones,
    UserInfos,
    Chatroom,
    Session
} = require("../models");

async function seedAll() {

    // To create these users in order with specific Id's, we can't use bulkCreate because it sometimes creates out of order.
    await User.create({
            username: "testUser",
            password: "testUser"
        }, { individualHooks: true })
        .catch(err => { console.log(err); });

    await User.create({
            username: "testUser2",
            password: "testUser2",
            avatar: "o"
        }, { individualHooks: true })
        .catch(err => { console.log(err); });

    await User.create({
            username: "testUser3",
            password: "testUser3",
            avatar: "j"
        }, { individualHooks: true })
        .catch(err => { console.log(err); });

    await Posts.bulkCreate([{
        user_id: 1,
        goal: "Lose weight",
        detail: "I want to lose 50lb so I can look good and feel good",
        start: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        end: moment(new Date()).add(30, "days").format("YYYY-MM-DD hh:mm:ss")
    }, {
        user_id: 1,
        goal: "Get organized with minimalism",
        detail: "I want to be less stressed by clutter by cleaning surroundings, emails, and pc, and developing habits to keep things minimal.",
        start: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        end: moment(new Date()).add(30, "days").format("YYYY-MM-DD hh:mm:ss")
    }, {
        user_id: 1,
        goal: "Learn to play guitar",
        detail: "I want to pick up a new habit that I can learn to enjoy. I like the idea of making music tunes.",
        start: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        end: moment(new Date()).add(30, "days").format("YYYY-MM-DD hh:mm:ss")
    }, {
        user_id: 1,
        goal: "Save more money",
        detail: "I want to save more money so I can feel good about the increasing savings on my bank account.",
        start: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        end: moment(new Date()).add(30, "days").format("YYYY-MM-DD hh:mm:ss")
    }]);

    await Comments.bulkCreate([{
        post_id: 2,
        user_id: 2,
        comment: "Comment on post 2"
    }, {
        post_id: 2,
        user_id: 2,
        comment: "Comment again on post 2"
    }]).catch(err => { console.log(err); });


    await Milestones.bulkCreate([{
        post_id: 1,
        milestone: "Log daily on MyFitnessPal",
        detail: "Make the app available on your phone's first screen",
        done: 1
    }, {
        post_id: 1,
        milestone: "Check weight every Sunday",
        detail: "Remember when testing new diets, may take 2 weeks before seeing weight changes.",
        done: 0
    }]).catch(err => { console.log(err); });

    var takenOutMilestones = [{
        post_id: null,
        milestone: "Throw away or donate items you don't need.",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Clean emails",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Clean computer",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Memorize chords",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Learn music theory on the intervals",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Learn music theory on the scales",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Buy a guitar",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Buy a synthesizer",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Look over bank statements and differentiate needs vs wants.",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Create a budget in different areas of life.",
        detail: "",
        done: 0
    }, {
        post_id: null,
        milestone: "Purchase a running training program.",
        detail: "",
        done: 0
    }]; // obsolete for now]

    await UserInfos.bulkCreate([{
        uid: 1,
        name: "Weng Fei Fung",
        abbr: "WFF",
        email: "weffung@ucdavis.edu",
        location: "Los Angeles",
        occupation: "Web Developer",
        bio: "I like to eat, code, and sleep",
        linkFacebook: "https://www.facebook.com/weng.fung",
        linkInstagram: "https://www.instagram.com/siphon880tw/",
        linkLinkedin: "https://www.linkedin.com/in/weng-fung/"
    }]).catch(err => { console.log(err); });

    process.exit(0);
} // seedAll

seedAll();