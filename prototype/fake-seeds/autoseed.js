/**
 * The MongoDB tables are:
 *  - users
 * 
 * 
 * MongoDB ReadMe: https://erikolson186.github.io/zangodb
 */
new zango.Db('goals_social_db').drop(); // Force Sync
var db = new zango.Db('goals_social_db', { users: ['_id'] });

// Create users.testUser with password testUser
window.users = db.collection('users');

var docs = [{
    username: "testUser",
    password: "testUser"
}]

// Hash password
var myPlainPassword = docs[0].password;
var bcrypt = dcodeIO.bcrypt; // Init bcrypt
var salt = bcrypt.genSaltSync(10); // Prepare salt based on how many rounds
var hashedPassword = bcrypt.hashSync(myPlainPassword, salt); // Finally, generate hashed password
docs[0].password = hashedPassword; // Database will get hashed password instead

users.insert(docs).then(() => {
    // debugger;
    return users.find({
        username: { $eq: 'testUser' },
    }).forEach(doc => console.log('doc:', doc));
});

// var myPlainPassword = "testUser2";
// var hashedPassword = bcrypt.hashSync(myPlainPassword, salt);
// var matchedHashToPlainPassword = bcrypt.compareSync(myPlainPassword, hashedPassword); // true
// assert.true(matchedHashToPlainPassword, 'Hashed password should be associated with plain password');

// await users.insert(docs);

// var docs = await people.find().filter({ name: "Frank" }).toArray();
// console.log("Context: ", { docs });
// assert.equal(docs.length, 1, 'Querying database with filter MongoDB style');