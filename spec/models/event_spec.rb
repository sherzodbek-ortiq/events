require 'rails_helper'

RSpec.describe Event, type: :model do

	before(:all) do
		@user_1 = User.create(full_name:"test_user_1", email:"test_user_1@test_user_1.com",
													password:"jdasdjpasd", password_confirmation:"jdasdjpasd")
	end

	after(:all) do
	  @user_1.destroy # all the related events will be deleted too
	end

	describe ".create" do

		context "when date is equal to current date or it has already past" do

			let (:event_today) {Event.new(name:"Hello", date:Time.now, period:"yearly",
													status:"active", user_id:@user_1.id)} # let block is run only when the variable is called, before(:each) block is run whenever exaple is run
			let (:event_yesterday) {Event.new(name:"Hello", date:DateTime.yesterday, period:"yearly",
															status:"active", user_id:@user_1.id)}
	
			it "should not be valid" do
				expect(event_today.valid?).to be false
			end	

			it "should not be valid" do
				expect(event_yesterday.valid?).to be false
			end	

		end

		context "when date is equal to current date or it has already past and status is past" do

			let (:event_today) {Event.new(name:"Hello", date:Time.now, period:"yearly",
													status:"past", user_id:@user_1.id)}
			
			it "should be valid" do
				expect(event_today.valid?).to be true
			end	

		end

		context "when date is equal to tomorrow or greater" do

			let (:event_tomorrow) {Event.new(name:"Hello", date:Date.tomorrow, period:"yearly", status:"active", user_id:@user_1.id)}
	
			it "should be valid" do
				expect(event_tomorrow.valid?).to be true
			end

		end

		context "when period value does not match allowed values" do

			let (:event) {Event.new(name:"Hello", date:Date.tomorrow, period:"yearl",
										status:"active", user_id:@user_1.id)}
	
			it "should not be valid" do
				expect(event.valid?).to be false
			end	

		end
	
		context "when status value does not match allowed values" do

			let (:event) {Event.new(name:"Hello", date:Date.tomorrow, period:"year",
										status:"actives", user_id:@user_1.id)}
	
			it "should not be valid" do
				expect(event.valid?).to be false
			end
	
		end

	end

end
