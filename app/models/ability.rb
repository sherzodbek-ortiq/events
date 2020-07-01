# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    if user.role == "admin"
      can :manage, :all
    elsif user.role == "registered_user"
      can [:read, :create], Event
      can [:update, :destroy], Event, user_id: user.id
    else 
      can :read, Event
    end
  end

end
