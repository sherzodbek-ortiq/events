class Event < ApplicationRecord
	belongs_to :user
	before_validation :ensure_status_correctness
	validates :name, :date, :period, :status, :user_id, presence: true
	validate :is_date_valid?
	validates :period, inclusion: {in: :allowed_periods}
	validates :status, inclusion: {in: :allowed_statuses}

  def is_date_valid?
  	if date.present? && date.to_date <= Time.now.to_date && status != "past"
			errors.add(:title, "Selected date has already past")
		end
  end

	private

		def has_not_past?
			self.status != "past"
		end

		def ensure_status_correctness
			self.status = "upcoming" unless date.present? && date.to_date <= Time.now.to_date
		end

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
