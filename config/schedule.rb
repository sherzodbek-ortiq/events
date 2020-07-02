set :output, "log/cron.log"
set :environment, "development"

every 1.minute do
	rake "events:update_events_statuses"
end