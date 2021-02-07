<style>

.edit-profile-page {
  font-family: Arial Narrow, sans-serif;
  font-weight: 100;
  color: #220C10;
  padding: 0 10px 0 10px;
  background: hsla(177, 87%, 79%, 1);
  background: linear-gradient(
    90deg,
    hsla(177, 87%, 79%, 1) 0%,
    hsla(235, 89%, 70%, 1) 100%
  );
}
.edit-profile {
  width: 400px;
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 2%;
  transition: opacity 1s;
  -webkit-transition: opacity 1s;
}
.edit-profile h1 {
  background: #77CBB9;
  padding: 20px 0;
  font-size: 140%;
  font-weight: 300;
  text-align: center;
  color: #fff;
}
div .edit-profile .container {
  background: transparent;
  padding: 6% 4%;
}
div.edit-profile input[type="email"],
div.edit-profile input[type="text"],
div.edit-profile input[type="password"], div.edit-profile select, div.edit-profile textarea {
  width: 92%;
  background: #fff;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  padding: 4%;
  font-family: 'Open Sans', sans-serif;
  font-size: 95%;
  color: #220C10;
}
div.edit-profile select {
  width: 100%;
}
div.edit-profile textarea {
  height: 100px;
}
div.edit-profile input[type="submit"] {
  width: 100%;
  background: #77CBB9;
  border: 0;
  padding: 4%;
  font-family: 'Open Sans', sans-serif;
  font-size: 100%;
  color: #fff;
  cursor: pointer;
  transition: background .3s;
  -webkit-transition: background .3s;
}
div.edit-profile input[type="submit"]:hover {
  box-shadow: inset 0 0 0 25px #81d7c3;
}
.inputs-wrapper {
  text-align:center;
}
.bio {
  resize: none;
}
</style>


    <div class="edit-profile-page">
        <div class="edit-profile">
          <div class="container">
            <h1 class="mb-4">Edit Profile Information</h1>
            <div class="inputs-wrapper">
              <input type="text" class="full-name" value="{{name}}" placeholder="Full Name" />
              <input type="text" class="abb-name" value="{{abbr}}" placeholder="Abbreviated Name" maxlength="3"/>
              <input type="text" class="email" value="{{email}}" placeholder="Change Email Address" />
              <input type="text" class="location" value="{{location}}" placeholder="City, State" />
              <input type="text" class="occupation" value="{{occupation}}" placeholder="Occupation" />
              <textarea class="bio" placeholder="Bio"/>{{bio}}</textarea>
              <input type="text" class="link-facebook" value="{{linkFacebook}}" placeholder="Facebook Profile URL" />
              <input type="text" class="link-instagram"value="{{linkInstagram}}" placeholder="Instagram Profile URL" />
              <input type="text" class="link-linkedin" value="{{linkLinkedin}}" placeholder="LinkedIn Profile URL" />
              <a href="#" onclick="event.preventDefault(); updateUserInfo();"><button class="btb btn-primary btn-lg">Update</button></a>
          </div>
        </div>
    </div>

<script>
function updateUserInfo() {

  var $context = $(".edit-profile");
  var userInfoData = {
    name: $context.find(".full-name").val(),
    abbr: $context.find(".abb-name").val(),
    email: $context.find(".email").val(),
    location: $context.find(".location").val(),
    occupation: $context.find(".occupation").val(),
    bio: $context.find(".bio").val(),
    linkFacebook: $context.find(".link-facebook").val(),
    linkInstagram: $context.find(".link-instagram").val(),
    linkLinkedin: $context.find(".link-linkedin").val()
  }

  window.req.body = userInfoData;
  hasher.setHash("patch-api/users")
}
</script>


<!-- Remove line when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>