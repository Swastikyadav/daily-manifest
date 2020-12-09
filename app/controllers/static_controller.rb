class StaticController < ApplicationController
  def home
    render json: {msg: "It is working!"}, status: :ok
  end
end