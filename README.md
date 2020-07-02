# Events

App for publishing events

## Requrements

Ruby version:

	ruby = 2.6.3

Rails version:

	rails '~> 6.0.3'

Database:

	Postgresql

## Configuration for local and test environments

1. Create postgresql user **events**

2. Create postgresql databases **events_development** and **events_test** by user **events**

3. Install dependencies

		bundle install

4. Run migrations

		rails db:migrate

## Run tests

	rspec

## Run app

The app uses Sidekiq, Redis for backgroung jobs for updating the statuses of events
Run with foreman:

	foreman start -f Procfile.dev

Run each command separately:

	redis-server
	sidekiq
	rails server -p 3000
