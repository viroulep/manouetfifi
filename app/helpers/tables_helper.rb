module TablesHelper
  def guests_to_options
    Guest.all.map { |g| { value: g.id, name: g.name, thumb: g.avatar.mini_thumb.url, invited_by: g.invited_by } }.to_json.html_safe
  end
end
