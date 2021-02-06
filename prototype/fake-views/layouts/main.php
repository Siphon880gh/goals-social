<!--
    WARNING: Not meant for production. This is a prototype to help the developer divide html into templates, to come up with routes for the app's features, and to figure out the JS logic and CSS. Mock data is being used. The Handlebars in this prototype is similar to Express-Handlebars but is a frontend version.
    WARNING: Production code is in /public.
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Prototype Only - Goals Social</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta http-equiv="expires" content="0">

    <!-- CSS vendors -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

    <!-- CSS from my app -->
    <link rel="stylesheet" href="assets/css/index.css">
    <link rel="stylesheet" href="assets/css/rapid-prototype.css">

    <!-- Font Awesome 5 -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">
    
    <!-- JS vendors: Moment JS -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>

    <!-- JS Vendors: jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

</head>

<body>
    <header class="site-header">
        <nav>
            <ul>
                <li>
                    <a class="d-none-off" href="/" onclick="prototypeHooksLink(event);">World</a>
                </li>
                <li>
                    <a class="d-none-off" href="chatroom" onclick="prototypeHooksLink(event);">Chatroom</a>
                </li>
                <li>
                    <a class="d-none-off" href="dashboard/" onclick="prototypeHooksLink(event);">Dashboard</a>
                </li>
                <li>
                    <a class="d-none-off" href="login/" onclick="prototypeHooksLink(event);">Login</a>
                </li>
                <li>
                    <a class="d-none-off" href="api/logout/" onclick="prototypeHooksLink(event);">Logout</a>
                </a>
                </li>            
            </ul>
        </nav>

        <h1 class="page-title"></h1>
        <!-- Goal Social | etc -->

    </header>
    <main class="container mt-3" data-main>
        <section id="world" class="d-none" data-view data-route="/">
            <article></article>
            <template>
                    <?php include("fake-views/world.php"); ?>
            </template>
        </section>
        <section id="login" class="d-none" data-view data-route="/login, POST">
            <article></article>
            <template>
                    <?php include("fake-views/login.php"); ?>
            </template>
        </section>
        <section id="chatroom" class="d-none" data-view data-route="/signup">
            <article></article>
            <template>
                    <?php include("fake-views/chatroom.php"); ?>
            </template>
        </section>
        <section id="dashboard" class="d-none" data-view data-route="/signup">
            <article></article>
            <template>
                    <?php include("fake-views/dashboard.php"); ?>
            </template>
        </section>
        <section id="profile" class="d-none" data-view data-route="/signup">
            <article></article>
            <template>
                    <?php include("fake-views/profile.php"); ?>
            </template>
        </section>
        <section id="edit-profile" class="d-none" data-view data-route="/signup">
            <article></article>
            <template>
                    <?php include("fake-views/edit-profile.php"); ?>
            </template>
        </section>
        <section id="goal-planner" class="d-none" data-view data-route="/signup">
            <article></article>
            <template>
                    <?php include("fake-views/goal-planner.php"); ?>
            </template>
        </section>
        <section id="signup" class="d-none" data-view data-route="/signup">
            <article></article>
            <template>
                    <?php include("fake-views/signup.php"); ?>
            </template>
        </section>
    
        <!-- QUnit -->
        <!-- <div id="qunit"></div>
        <div id="qunit-fixture"></div> -->

    </main>
    <!-- container -->
    <div class="prototype-php-engine"><?php echo "PHP Prototype engine running!" ?></div>

    <!-- JS vendor: Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js " integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW " crossorigin="anonymous ">
    </script>

    <!-- JS Vendors: Jquery UI -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js "></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.min.css "></link>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js "></script>

    <!-- App JS -->
    <script src="assets/js/app.js"></script>

</body>

</html>