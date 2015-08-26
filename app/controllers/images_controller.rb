class ImagesController < ApplicationController
  layout 'print'

  def show
    @image = Image.find(params[:id])
  end
end
