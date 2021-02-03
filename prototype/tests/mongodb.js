/**
 * Prototype MongoDB like testing:
 * Figure out how MongoDB works. ZangoDB makes MongoDB all frontend.
 * This will let us create tables on the fly especially since we don't know how they look yet.
 * README: https://erikolson186.github.io/zangodb/Cursor.html
 */

async function beforeEach() {

    return new Promise(async(resolve, reject) => {
        // Init Fake Database
        new zango.Db('goals_social_test_db').drop(); // Force Sync
        var db = new zango.Db('goals_social_test_db', { people: ['id'] });
        // var db = new zango.Db('goals_social_test_db');
        var people = db.collection('people');

        var docs = [
            { name: 'Frank', age: 20 },
            { name: 'Thomas', age: 33 },
            { name: 'Todd', age: 33 },
            { name: 'John', age: 28 },
            { name: 'Peter', age: 33 },
            { name: 'George', age: 28 }
        ];

        await people.insert(docs);

        resolve(people);
    })

}

QUnit.module('Testing Zango DB', async function(assert) {
    // console.group("%cTesting Zango DB (Similiar to MongoDB)", "font-weight: bold");

    QUnit.test('Test table is seeded', async function(assert) {
        // Control when test finishes with async and done QUnit methods, 
        // or else test will finish before database finishes
        const done = assert.async();

        return beforeEach().then(async function(data) {
            var people = data; // new collection
            var docs = await people.find().filter({ name: "Frank" }).toArray();
            console.log("Context: ", { docs });
            assert.equal(docs.length, 1, 'Querying database with filter MongoDB style');

            done();
        }); // beforeEach
    });
});

// QUnit.done(dat => {
//     console.groupEnd();
// });