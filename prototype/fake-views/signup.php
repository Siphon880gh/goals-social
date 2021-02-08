<style>

.sign-up {
    background-color: transparent;
}

.form-wrapper .form-header {
    background-color: #77CBB9;
    color: white;
}

.sign-up .form-body {
    border: 2px solid;
    border-color: #220C10;
}

.form-body .standout {
    background-color:#77CBB9;
}

.form-body .login-instead {
    color: #220C10;
    text-decoration: underline;
}


</style>


<div class="sign-up">
<div class="form-wrapper">
    <header class="form-header">
        Sign up
    </header>
    <div class="form-body">
        <form class="signup-form">
            <div class="input-group">
            <label for="username-signup">Username:</label>
            <input type="text" id="username-signup" />
            </div>
            <div class="input-group">
            <label for="password-signup">Password:</label>
            <input type="password"  id="password-signup" />
            </div>
            <div>
            <button class="standout" type="submit" onclick="alert('No need to prototype signup because it works in production code.');" data-route="/signup">Sign Up!</button>
            <a href="/login" class="login-instead" onclick="prototypeHooksLink(event);" data-route="/login">Login instead</a>
            </div>
        </form>
    </div> <!-- form-body -->
</div> <!-- form-wrapper -->
</div> <!-- sign-up -->

<!-- Remove line when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>