class Image < ActiveRecord::Base
  mount_uploader :file, PhotoUploader
end
