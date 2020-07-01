require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do

	before(:all) do
		@user_1 = User.create(full_name:"test_user_1", email:"test_user_1@test_user_1.com", password:"jdasdjpasd", password_confirmation:"jdasdjpasd")
		@user_2 = User.create(full_name:"test_user_2", email:"test_user_2@test_user_2.com", password:"jdasdjpasd", password_confirmation:"jdasdjpasd")

		@event_1 = @user_1.events.create(name: "event_1", date: Time.now, period: "yearly", status: "active")
	end

	after(:all) do
	  @user_1.destroy # all the related events will be deleted too
	  @user_2.destroy
	end

  describe ".create" do

		context "when user is registered_user" do

	    it "event is successfully created" do
	    	sign_in @user_1
				post :create, params: {event: {name: "event", date: Time.now, period: "yearly", status: "active"}}, format: :json
				expect(response.body["errors"].present?).to be(false)
	    end
	
	  end

	end

  describe ".update" do

		context "when the signed in user is not the owner of event" do

	    it "event is not updated" do
	    	sign_in @user_2
				patch :update, params: {id: @event_1, event: { name: "event_2", date: Time.now, period: "yearly", status: "active"}}, format: :json
				expect(response.status).to eq(403)
	    end
	
	  end

		context "when the signed in user is the owner of event" do

	    it "event is updated" do
	    	sign_in @user_1
				patch :update, params: {id: @event_1, event: { name: "event_2", date: Time.now, period: "yearly", status: "active"}}, format: :json
				expect(response.status).to eq(200)
	    end
	
	  end

	end

  describe ".destroy" do

		context "when the signed in user is not the owner of event" do

	    it "event is not deleted" do
	    	sign_in @user_2
				delete :destroy, params: {id: @event_1}, format: :json
				expect(response.status).to eq(403)
	    end
	
	  end

		context "when the signed in user is the owner of event" do

	    it "event is deleted" do
	    	sign_in @user_1
				delete :destroy, params: {id: @event_1}, format: :json
				expect(response.status).to eq(200)
	    end
	
	  end

	end

end
