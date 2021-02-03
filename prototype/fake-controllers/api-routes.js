// Check dependencies
if (!Handlebars) alert("Error Dependencies: Load Handlebars before this routing js file");
if (!signals) alert("Error Dependencies: Load signals before this routing js file")
if (!window.res.render) alert("Error Dependencies: Load res.render.js before this routing js file")

// Setup API routes
router.addRoute('api-post/login').matched.add(() => {
    const { username, password } = window.req.body;

    let users = window.users;
    debugger;


    // var myPlainPassword = "testUser2";
    // var hashedPassword = bcrypt.hashSync(myPlainPassword, salt);
    // var matchedHashToPlainPassword = bcrypt.compareSync(myPlainPassword, hashedPassword); // true
    // assert.true(matchedHashToPlainPassword, 'Hashed password should be associated with plain password');

    // await users.insert(docs);

    // var docs = await people.find().filter({ name: "Frank" }).toArray();
    // console.log("Context: ", { docs });
    // assert.equal(docs.length, 1, 'Querying database with filter MongoDB style');

});