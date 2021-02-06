autoseed:
    /**
     * The MongoDB tables are:
     *  - users
     * 
     * 
     * MongoDB ReadMe: https://erikolson186.github.io/zangodb
     */
    new zango.Db('goals_social_db').drop(); // Force Sync
var db = new zango.Db('goals_social_db', {
    users: ['_id'],
    posts: ['_id']
});

// <MAJOR: Users>
// Create users.testUser with password testUser
window.users = db.collection('users');

var udocs = [{
    username: "testUser",
    password: "testUser",
    avatar: "o"
}, {
    username: "testUser2",
    password: "testUser2",
    avatar: "m"
}, {
    username: "testUser3",
    password: "testUser3",
    avatar: "j"
}]

// Hash password
var myPlainPassword = udocs[0].password;
var bcrypt = dcodeIO.bcrypt; // Init bcrypt
var salt = bcrypt.genSaltSync(10); // Prepare salt based on how many rounds
var hashedPassword = bcrypt.hashSync(myPlainPassword, salt); // Finally, generate hashed password
udocs[0].password = hashedPassword; // Database will get hashed password instead

users.insert(udocs).then(() => {
    return users.find({
        username: { $eq: 'testUser' },
    }).forEach(doc => console.log('users/doc (password shown in prototype for debugging purposes):', doc));
});

// <MAJOR: Posts>
window.posts = db.collection('posts');

/**
 * Example goals:
 * 
 * Exercise more.
 * Lose weight.
 * Get organized.
 * Learn a new skill or hobby.
 * Live life to the fullest.
 * Save more money / spend less money.
 * Quit smoking.
 * Spend more time with family and friends.
 * 
 */


var pdocs = [{
    user_id: 1,
    goal: "Lose weight",
    detail: "I want to lose 50lb so I can look good and feel good",
    start: moment().format("M/D/YYYY H:m:SS"),
    end: moment().add(30, "days").format("M/D/YYYY H:m:SS")
}, {
    user_id: 1,
    goal: "Get organized with minimalism",
    detail: "I want to be less stressed by clutter by cleaning surroundings, emails, and pc, and developing habits to keep things minimal.",
    start: moment().format("M/D/YYYY H:m:SS"),
    end: moment().add(30, "days").format("M/D/YYYY H:m:SS")
}, {
    user_id: 1,
    goal: "Learn to play guitar",
    detail: "I want to pick up a new habit that I can learn to enjoy. I like the idea of making music tunes.",
    start: moment().format("M/D/YYYY H:m:SS"),
    end: moment().add(30, "days").format("M/D/YYYY H:m:SS")
}, {
    user_id: 1,
    goal: "Save more money",
    detail: "I want to save more money so I can feel good about the increasing savings on my bank account.",
    start: moment().format("M/D/YYYY H:m:SS"),
    end: moment().add(30, "days").format("M/D/YYYY H:m:SS")
}];

posts.insert(pdocs).then(() => {});