class Event < ApplicationRecord
	belongs_to :user
	validates :name, :date, :period, :status, presence: true
	validates :period, inclusion: {in: :allowed_periods}
	validates :status, inclusion: {in: :allowed_statuses}

	private

		def allowed_periods
			[
				"daily",
				"weekly",
				"monthly",
				"yearly"
			]
		end

		def allowed_statuses
			[
				"active",
				"upcoming",
				"past"
			]
		end

end
