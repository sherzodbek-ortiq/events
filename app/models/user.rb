class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :timeoutable, :trackable, :recoverable and :omniauthable
  validates_uniqueness_of :email
  validates :password, :password_confirmation, :email, :full_name, presence: true
  has_many :events, dependent: :destroy
  devise :database_authenticatable, :registerable,
    :rememberable, :validatable, :lockable
	before_create :set_defaults

	def set_defaults
		self.role = "registered_user"
	end

end
