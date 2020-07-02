class UpdateEventsStatusesJob < ApplicationJob
  queue_as :default

  def perform()
		Event.where("date >= :today AND date < :tomorrow", :today => Time.now.to_date,
								:tomorrow => Time.now.to_date + 2.day).update_all(status:"active")
	end
end
