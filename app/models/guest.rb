class Guest < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
end
