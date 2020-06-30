require 'rails_helper'

RSpec.describe Event, type: :model do

	describe ".create" do

		context "when period value does not match allowed values" do
			let (:event) {Event.new(name:"Hello", date:"Wed, 01 Jul 2020 00:16:14 +0300", period:"yearl",
										status:"active", user_id:1)} # let block is run only when the variable is called, before(:each) block is run whenever exaple is run
	
			it "should not be valid" do
				expect(event.valid?).to be false
			end	

		end
	
		context "when status value does not match allowed values" do
			let (:event) {Event.new(name:"Hello", date:"Wed, 01 Jul 2020 00:16:14 +0300", period:"year",
										status:"actives", user_id:1)}
	
			it "should not be valid" do
				expect(event.valid?).to be false
			end
	
		end

	end

end
