class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :redirect_unless_admin!

  def index
  end
end
