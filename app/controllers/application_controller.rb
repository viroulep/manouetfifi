class ApplicationController < ActionController::Base
  include ApplicationHelper
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  rescue_from ActiveRecord::RecordNotFound, with: -> { raise ActionController::RoutingError.new('Not Found') }

  before_action :set_locale
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options
    { locale: I18n.locale }
  end

  def current_user
    begin
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    rescue Exception => e
      nil
    end
  end

  def authenticate_user!
    if !current_user
      session[:return_to] ||= request.original_url
      redirect_to signin_url
    end
  end

  def redirect_unless_admin!
    unless current_user&.admin?
      redirect_to root_url, :alert => 'Seuls les administrateurs ont accès à cette page.'
    end
  end

  private :current_user, :authenticate_user!, :redirect_unless_admin!
end
