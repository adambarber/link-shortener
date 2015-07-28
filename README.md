# Running Locally

- Run ```bundle install``` to install gems
- Rename config/database-example.yml to config/database.yml
- Edit config/database.yml to match the settings for your local postgres instance
- Run ```bundle exec rake db:create``` to create a new postgres DB
- Run ```bundle exec rake db:migrate``` to migrate DB schema
- Run ```rails s --port 5000 -b 0.0.0.0``` to start the webserver
- Go to [http://lvh.me:5000](http://lvh.me:5000)

