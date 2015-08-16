class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
  end

  def print
  end

  def upload
    decodedImage = params[:data_url].split(',', 2)[1].unpack('m')[0]

    f = Tempfile.open('image', Rails.root.join('tmp') )
    f.binmode
    f.print(decodedImage)
    f.close

    @image = Image.create(file: f)
    render :json => { url: image_path(@image) }
  end
end
