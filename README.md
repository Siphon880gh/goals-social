Goals Social
====
![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/goals-social/master)

Description
---
By Aidan Meyer, Angela Kao, Weng Fei Fung. A social network based around people’s goals. Find inspiration and help others complete similar goals. Look into their milestones, leave helpful comments, and chat with like-minded driven users.

Demo
---
https://goals-social-network.herokuapp.com/

Screenshots
---
Plan:

![Goal Planner](/README/goal-planner.png)

Interact:

![Posts](/README/posts.png)

Table of Contents
---
- [Description](#description)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Tests](#tests)

Installation
---
1. Run `npm install` to install the node module dependencies.
2. Make sure you have mysql cli installed. Run `mysql -u <USERNAME> -p` and enter password to access the mysql on your localhost or server.
3. Create the database with `source db/schema.sql`. You `quit` now.
4. Optionally, you can run `npm run seed` if you want to have some generic posts and users to demo the app, but first you had to have ran `npm run start` or `node ./models` to create the tables in the database. The sample accounts can be logged in with the username the same as password. So testUser/testUser is a login.

Usage
---
1. Run `npm start`
2. It will mention the port being listened at. Open your web-browser and go to the localhost:port, eg. localhost:3001
3. Or you can also deploy to other servers such as Heroku (you need the JawsDB addon).

Architecture
---
If you want to contribute, you may want to know the architecture and methodology. 

The database relies on a live MySQL server, rather that is on your localhost computer or an online server. The node module uses Sequelize which connects to the MySql server and can recreate tables, however it cannot recreate databases (hence you had to manually create the database from db/schema.sql at the MySql shell. My MySql server credentials will likely differ from yours but you will need to create an .env file at the root to assign the variables:
```
DB_NAME=goals_social_db
DB_USER=<YOUR_MYSQL_SERVER_USERNAME>
DB_PW=<YOUR_MYSQL_SERVER_PASSWORD>
DB_PORT=8889
```

Again, you will need to create the .env file at the root of the app because for security reasons we did not upload ours.

The PORT is up to you, as long as it is not an used port. I am using 8889 because I have MAMP installed but another port option is 3006, and my team members have a different port than me because they have their own .env files.

Again, Sequelize connects to the MySQL server. It creates these models that the app interacts with. This is a node server with Express setting up routes. The routes will connect to the models and Express-Handlebars templating engine to send HTML code to the client's browser to render (`/path/to/resource`). At other times, the Express routes send JSON information (`/api/path/to/resource`).

When developing this app, we initially used a TDD methodology to mock login and signup API routes, but then decided part way that this approach is not agile enough. 

We went from TDD to prototyping a complete single page application using frontend Handlebars JS that employed a similar templating language to Express-Handlebars. PHP was used to break those templates into separate files using the PHP's include function. The plan was after templating on the frontend, we would move the frontend Handlebars templates to the backend Express-Handlebars templates. By using this Rapid Prototyping approach, we can quickly style and play with the HTML without rerunning a node application. Furthermore, we also used Compass and SASS initially to easily style using nested CSS rules.

We also dynamically changed the webpage's layout by changing the URL pathname with a combination of Crossroads JS, Hasher JS, and Signals. This allowed us to mock what would happen with an Express app where the URL changes and that affects the HTML delivered to the browser, except we never left the page because the layout is changed dynamically with the URL. The URL change's default behavior of loading another page was stopped by those libraries. We also mocked the functionality of backend code like `res.render` and `req.body` using the global scope. What made this approach fast was less trial and error with getting information to send correctly to/from the backend and frontend, and because `res` and `req` worked and because the dynamic routes closely matched what we would have for a full-stack app, then later we could refactor our dynamic routes into Express routes.

We also mocked Sequelize on the frontend by using a completely front-end tool: ZangoDB. It was frontend by using the web browser's IndexedDB. The advantage was later we could refactor the modeling code into Sequelize. Another advantage was that ZangoDB was inspired by MongoDB. Unlike Sequelize where we must have an idea of the database schema and relationships, MongoDB allowed us to create tables (aka collections) on the fly without being strict on the schema. There were countless times when we realized that a table needed more columns, and we could adjust the frontend ZangoDB easily. After a fully functional Prototype, we refactored the ZangoDB into Sequelize, implemented the associations, and made it a full SQL database.

After developing a rapid Prototype, we refactored the PHP-include files, frontend Handlebar templates, the dynamic routes, and ZangoDB into a full stack app. Because of how similar they are to the backend technology, we refactored them into Express-Handlebar templates, Express Routes, and Sequelize with relative ease.

The testing and prototyping are in the folders __test__, __test2__, and prototype/ folders, and therefore you can ignore those folders when it concerns how the app actually works. But if you want to add more features, you can use the same methodology with these testing and prototyping folders. The following is how you can work with the prototype version before refactoring your features into production code.

### Contributing with the Prototype version

The Prototype is a functional version of the app that we made before dividing the code into Express. It is mostly unstyled and uses no backend (except PHP, but it's used to divide frontend handlebar js into PHP templating files). You can choose to contribute features by working with the prototype first.

1. The Prototype uses extra js libraries compared to production in order to mimic handlebar templates, database modeling, and routes. Some of these libraries were installed with bower, so to run prototype, you have to install the bower libraries: 
```
bower install
```

If you do not have bower, you will have to install it on your system. On macs, you run `brew install bower`. More information on [bower](https://bower.io/).

Running `npm install` is not necessary but you can if you want to use hotloading via livereload and sass via compass. However, these are developer only tools and not necessary with Prototype to run. Remember that the whole point of rapidly prototyping the app is so we can have all the working parts before we move them over to Express or involve any node in production. If you choose to use these node developer tools, you will develop the prototype even faster. If you choose, then running `npm run watch` at /prototype will refresh the webpage via the Chrome extension livereload whenever you make code changes. It will also automatically use compass to transpile sass code from /prototype/assets/css/scss into css code at /prototype/assets/css, allowing you to use the faster to code SASS over CSS. So the watch script runs both livereload and compass concurrently. For compass to work, you will have to install ruby and compass. For livereload, you have to install the Chrome extension. Visit their websites for installation instructions.

2. Next, you run the prototype on a PHP server. There are many ways. An easy way is to open `/prototype/index.php` in Visual Code with the extension PHP server, then right click the code and click 
"PHP Server: Serve project". The PHP page will open in your web browser. Clicking different links and buttons will open different URLs as if there's an Express serving HTML routes, but the webpage layout is actually dynamically changed without refreshing the page when the URL changes. 

Frontend version Handlebars is used to incorporate templating to the Prototype. The data is modeled with ZangoDB which is similar to MongoDB that allowed us to try different tables without redoing schemas like in Sequelize, and the database is stored locally on your webbrowser's IndexedDB. This will allow future developers to try new database ideas more easily. However, joining tables is much more difficult and you can find that we implemented our own way of joining tables.

3. You can code using the .php files much like you would with .handlebars files and link them to js files. PHP knowledge is not necessary. The controllers are in `/fake-controllers/` which follow a similar syntax to Express JS but is really using a combination of Crossroads JS, Hasher, and Signals libraries and mocked window.req and window.res utilities. Databases are modeled easily and seeded in `fake-seeds/autoseeds.js` and they save to your web browser's IndexedDB; however, we have the database reset everytime we refresh the webpage so we can test features with consistent data. You can decide to reimplement this so there's no forced syncing. 

Once you are satisfied with the features you contribute, you can start refactoring your prototype code into production code at `/models`, `/views`, `/controllers`, `server.js`, and `/public`, which are the actual production code. Notice these folder sare not preceded with the word "fake".

Tests
---
There are two test folders: __test__ and __test2__. You can run them respectively, `npm run test` and `npm run test2 <name.of.the.test>`. 

We separated the tests because the former test is meant to run all test suites in __test__, which is what you expect of Jest. 

But if you run all test suites at the second one, __test2__, the tests likely will fail. Each test suite will have to run after dropping and recreating the database (with `source schema/db.sql` in the MySQL shell). This is because of Sequelize itself not being able to drop databases and that the test suites each needed different table data.

The Jest file matching patterns for __test__ are in package.json, whereas those for __test2__ are in the file ./jest.test2.config.json.

However, this app was not made with a heavy emphasis on Test Driven Development because part way through we switched to a Prototype-first approach when we realized that may be faster. So there are not many test files because of time constraints.
