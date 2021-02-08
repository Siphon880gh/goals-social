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
#profile {
  width: 400px;
  margin: auto;
  margin-top: 8px;
  margin-bottom: 2%;
  transition: opacity 1s;
  -webkit-transition: opacity 1s;

  
}
#profile h1 {
  background: #77CBB9;
  padding: 20px 0;
  font-size: 140%;
  font-weight: 300;
  text-align: center;
  color: #fff;
}
div #profile .container {
  background: transparent;
  padding: 10% 4%;

}
div#profile input[type="email"],
div#profile input[type="text"],
div#profile input[type="password"], div#profile select, div#profile textarea {
  width: 92%;
  background: #fff;
  margin: 0 10px 10px 15px;
  border: 1px solid #ccc;
  padding: 4%;
  font-family: 'Open Sans', sans-serif;
  font-size: 95%;
  color: #220C10;
}
div#profile select {
  width: 100%;
}
div#profile textarea {
  height: 100px;
}
div#profile input[type="submit"] {
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
div#profile input[type="submit"]:hover {
  box-shadow: inset 0 0 0 25px #81d7c3;
}

</style>
    <div class="edit-profile-page">
        <div id="profile">
          <div class="container">
            <h1>Edit Profile Information</h1>
            <div>
            <input type="text" id="full-name" placeholder="Full Name" />
            <input type="text" id="abb-name"placeholder="Abbreviated Name" />
            <input type="text" id="Email"placeholder="Email Address" />
            <input type="password" id="password" placeholder="Password" />
            <input type="text" id="city-state"placeholder="City, State" />
            <input type="text" id="Occupation"placeholder="Occupation" />
            <textarea id="bio"placeholder="Bio"/></textarea>
            <input type="text" id="facebook"placeholder="Facebook Profile URL" />
            <input type="text" id="instagram"placeholder="Instagram Profile URL" />
            <input type="text" id="linkedin" placeholder="LinkedIn Profile URL" />
            <input type="submit" value="Register" id="upload"/>
          </div>
        </div>
        <script src="" async defer></script>
    </div>




<!-- Remove line when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>