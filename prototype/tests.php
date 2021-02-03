<!-- QUnit Test Suites -->
<script src="tests/bcrypt.js"></script>
<script src="tests/mongodb.js"></script>

<!-- QUnit logging to the browser console instead of DOM -->
<script>
QUnit.log(details => {
    if (!details.result) {
        console.error(`Failed test:\nExpected: ${details.expected}\nActual:${details.actual}\nAt message: ${details.message}\n\n`);
    } else {
        console.log(`%cPassed Test at ${details.message}`, "color:green;");
    }
});
</script>