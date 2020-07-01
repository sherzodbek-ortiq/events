class Event < ApplicationRecord
	belongs_to :user
	validates :name, :date, :period, :status, :user_id, presence: true
	validate :is_date_valid?
	validates :period, inclusion: {in: :allowed_periods}
	validates :status, inclusion: {in: :allowed_statuses}

  def is_date_valid?
		errors.add(:title, "Selected date has already past") if date.to_date <= Time.now.to_date
  end

	private

		def allowed_periods
			[
				"daily",
				"weekly",
				"monthly",
				"yearly",
				"no repeat"
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
