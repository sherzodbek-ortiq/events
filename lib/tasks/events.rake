namespace :events do
  desc "update events statuses"
  task update_events_statuses: :environment do
  	UpdateEventsStatusesJob.perform_later
  end
end
