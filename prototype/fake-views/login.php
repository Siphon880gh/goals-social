<style>
.login-page {
    background-color: transparent;
}

.form-wrapper .form-header {
    background-color: #77CBB9;
    color: white;
}

.login-page .form-body {
    border: 2px solid;
    border-color: #220C10;
}

.form-body .standout {
    background-color:#77CBB9;
}

.form-body .signup-instead {
    color: #220C10;
    text-decoration: underline;
}

</style>




<div class="login-page form-wrapper">
    <header class="form-header">
        Login
    </header>
    <div class="form-body">
        <form class="login-form">
            <div class="input-group">
                <label for="username-login">Username:</label>
                <input type="text" id="username-login" />
            </div>
            <div class="input-group">
                <label for="password-login">Password:</label>
                <input type="password" id="password-login" />
            </div>
            <div>
                <button class="standout" type="submit" data-route="/login">Login</button>
                <a href="signup/" class="signup-instead" onclick="prototypeHooksLink(event);" data-route="/signup">Sign up instead</a>
            </div>
            </form>
    </div> <!-- form-body -->
</div> <!-- form-wrapper -->

<!-- Remove in production code -->
<div class="mt-2"><strong>Reminder: </strong>You can login with username and password: <a href="javascript:void(0)" onclick="useSampleLogin()">testUser/testUser</a>. This was added at autoseed.js</div>

<script>
$(".login-form").on("submit", async(event)=>{
    event.preventDefault();
    let username = $("#username-login").val();
    let password = $("#password-login").val();

    // Pass login data to api post route
    window.req.body.username = username;
    window.req.body.password = password;
    hasher.setHash("api-post/login");
    
    // Mimick request to response delay
    setTimeout(()=>{
        if(!window.req.session.loggedIn) {
            alert("Wrong username or password");
        }
    }, 100);
});
</script>

<!-- Remove when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>
<script>
    function useSampleLogin() {
        $("#username-login").val("testUser");
        $("#password-login").val("testUser");
    }
</script>