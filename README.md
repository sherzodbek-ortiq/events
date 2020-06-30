# Events

App for publishing events

## Information

Confirmation emails are not send, as I wasn't able to find free SMTP
Email and password are validated by devise default validator

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
