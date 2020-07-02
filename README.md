# Events

App for publishing events

## Information

Confirmation emails are not send, as I wasn't able to find free SMTP
Email and password are validated by devise default validator
Webpacker is used to serve css, importing bootstrap
Additional feature: the account is locked after 5 unsuccessful attempts of login. The account is unlocked after 1 hour
Authorization is handled by cancancan
App's front end built with reacts js as single page app.
skip_before_action :verify_authenticity_token is added
Events are sorted by date
There is small problem with datepicker, it sometemis picks wrong data. For example: It can set today's date if you
pick tomorrow's
Guest can see all event but not allowed to edit them
Registered user can see all events, but can edit only it's own
Status =  Card background color

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

	rails s

## Features to be implemented

1. Add restrictions in events controller index action to avoid guest to see events of particular user

2. Add restrictions to prevent user from deleting it's own account