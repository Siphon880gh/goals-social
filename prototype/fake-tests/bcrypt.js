/**
 * Test bcrypt hashing unhashing for password
 * README: https://github.com/dcodeIO/bcrypt.js
 */

// Init bcrypt, and init salt from number of rounds
var bcrypt = dcodeIO.bcrypt;
var salt = bcrypt.genSaltSync(10);

QUnit.module('Testing Bcrypt', function() {
    // console.group("%cTesting Bcrypt", "font-weight: bold");

    // Generate hash for encrypted password
    var myPlainPassword = "testUser2";
    var hashedPassword = bcrypt.hashSync(myPlainPassword, salt);

    QUnit.test('Test Bcrypt hashing', function(assert) {
        assert.ok(hashedPassword.length > myPlainPassword.length, 'Hashing should return a string with string length greater than the plain password');
    });
    QUnit.test('Test Bcrypt comparing hash to plain password', function(assert) {

        // User logins in, so we check password
        var matchedHashToPlainPassword = bcrypt.compareSync(myPlainPassword, hashedPassword); // true

        assert.true(matchedHashToPlainPassword, 'Hashed password should be associated with plain password');
    });
});

// QUnit.done(dat => {
//     console.groupEnd();
// });