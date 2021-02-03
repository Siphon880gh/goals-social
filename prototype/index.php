<!--
    WARNING: Not meant for production. This is a prototype to help the developer divide html into templates, 
    to come up with routes for the app's features, and to figure out the JS logic and CSS. Here Handlebars is
    a frontend version that shares similar templating language to Express-Handlebars. Here ZangoDB is a 
    MongoDB-like database that lets the developer create tables on the fly especially when the datatypes and 
    schemas are not planned ahead.
    
    Production code is in /public.
-->
    <!-- Disable caching because we are prototyping -->
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="-1">

    <!-- Handlebars JS frontend version -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js"></script>

    <!-- Routing system using Hashers and Crossroads. Dependency: Signals JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hasher/1.2.0/hasher.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crossroads/0.12.2/crossroads.min.js"></script>

    <!-- Prototype visual cue  -->
    <div class="prototype-php-engine"><?php echo "PHP Prototype engine running!" ?></div>

    <!-- bcrypt JS frontend version  -->
    <script src="bower_components/bcryptjs/dist/bcrypt.min.js"></script>

    <!-- MongoDB-like database for prototyping databases -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js"></script>
    <script src="https://unpkg.com/zangodb@latest/dist/zangodb.min.js"></script>

    <!-- Unit Testing with QUnit -->
    <!-- README: https://api.qunitjs.com/callbacks/QUnit.log/ -->
    <!-- README: https://api.qunitjs.com/assert/equal/ -->
    <script src="bower_components/qunit/qunit/qunit.js"></script>
    <link rel="stylesheet" href="bower_components/qunit/qunit/qunit.css"></link>

    <!-- Unit Test Suites autoloaded -->
    <?php include("./fake-tests/autotest.php"); ?>

    <!-- Seeds autoloaded -->
    <script src="./fake-seeds/autoseed.js"></script>

    <!-- Mimick loading main layout like in Express Handlebars -->
    <?php include("./fake-views/layouts/main.php"); ?>

    <!-- Prototype engine. Must place below the main layout -->
    <script src="assets/js/prototype.js"></script>

    <!-- Mimick HTML and API controllers -->
    <script src="fake-controllers/html-routes.js"></script>
    <script src="fake-controllers/api-routes.js?v=2"></script>
    <script src="fake-controllers/index-end.js"></script>