# TimeBlock

A small web app to log my day in 15-minute blocks. Built for the Web Technologies Basics module at CODE.

Live at: https://web-dev-basics-vbnm.onrender.com

## What it does

- Add a block by entering a time, an activity, and an optional project name.
- Blocks are stored in MongoDB and persist across restarts.
- Each row has a delete button that removes the block from both the page and the database.

## Stack

- Node.js + Express
- EJS for server-side templates
- MongoDB Atlas via Mongoose
- Plain CSS (no framework)
- Hosted on Render

## Run it locally

1. Clone the repo
2. npm install
3. Create a .env file (see .env.example) and put your own MongoDB connection string in it
4. npm start
5. Open http://localhost:3000

## Run the tests

npm test

There are a few small unit tests for the Block model.

## Project structure

- app.js - boot, middleware, mounts the routers
- models/block.js - Mongoose schema for a 15-min block
- routes/tracker.js - GET, POST, DELETE for /tracker
- routes/pages.js - GET / and /about
- views/ - EJS templates + partials
- public/ - style.css and main.js (client-side delete)
- tests/ - node:test unit tests


## What's not in scope

The very first version of the README listed a few extra features that ended up out of scope:

- Speech-to-text input
- Folder organisation for projects
- Day, week, month overview views

These are interesting follow-ups but they didn't fit in the time I had. The current version focuses on getting the basic create/read/delete loop working end-to-end with a real database and a deployment.