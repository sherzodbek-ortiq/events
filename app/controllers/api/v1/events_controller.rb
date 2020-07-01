class Api::V1::EventsController < ApplicationController

  before_action :authenticate_user!, only: [:create, :update, :destroy]
	load_and_authorize_resource :event, only: [:update, :destroy]

	def index
		if params[:user_id].present?
			render json: Event.all.where(user_id: params[:user_id])
		else
			render json: Event.all
		end			
	end

	def create
		event = Event.new(event_params)
		event.user_id = current_user.id
		if event.save
			render json: event
		else
			render json: {errors: event.errors.messages}
		end
	end

	def update
		event = Event.find(params[:id])
		if event.update(event_params)
			render json: {status: 200}
		else
			render json: {errors: event.errors.messages}
		end
	end

	def destroy
		Event.destroy(params[:id])
		render json: {status: 200}
	end

	private

		def event_params
			params.require(:event).permit(:name, :date, :period, :status)
		end

end

