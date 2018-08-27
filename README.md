# records-test
Simple CRUD with authentication

## How to use it
* Install Redis
* Rename local_env.example to local_env.sh and change as needed (local_env.sh file is already ignored in .gitignore)

## Run local
* Need to have nodemod installed 
    * To install it run **npm --global install nodemon** 
* Run **npm install** in order to install all dependencies
* Edit the local_env.sh file and add the environment variables needed to run the application.
* Run **./migrate_local.sh** to set up the database structure 
* Run **./seed_local.sh** to seed the database with an admin user
* Run locally with **./run_local.sh**
* This will start **nodemon** and watch for changes to the filesystem and restart the local server as changes happen

### Environment variables
There are a few env vars that need to be added for this to work. They are for connecting to your database (Postgresql) and creating your admin user. 
* RDS_HOSTNAME
* RDS_USERNAME
* RDS_PASSWORD
* RDS_DB_NAME
* REDIS_HOST
* REDIS_PORT
* ADMIN_EMAIL
* ADMIN_USERNAME
* ADMIN_PASSWORD
* HOST
* SESSION_SECRET