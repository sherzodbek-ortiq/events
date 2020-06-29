# Events

App for publishing events

## Requrements

Ruby version:

	ruby = 2.6.3

Rails version:

	rails '~> 6.0.3'

Database:

	Postgresql

## Configuration

1. Create postgresql user **events**

2. Create postgresql database by user **events**

3. Install dependencies

		bundle install

4. Run migrations

		rails db:migrate

## Run tests

	rspec

## Run app

	rails s
