<span class="page-title-dynamic d-none">{{pageTitle}}</span> <!-- Remove line when refactored into production code -->
<div class="form-wrapper">
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
                <button class="standout" type="submit" onclick="alert('Prototype: Would login');" data-route="/login">Login</button>
                <a href="javascript:void(0);" onclick="hasher.setHash('signup/')" data-route="/signup">Sign up instead</a>
            </div>
            </form>
    </div> <!-- form-body -->
</div> <!-- form-wrapper -->