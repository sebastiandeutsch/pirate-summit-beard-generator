class ImagesController < ApplicationController
  layout 'print'

  def index
    @images = Image.all.where(dontshow: false)
  end

  def show
    @image = Image.find(params[:id])
  end

  def dontshow
    @image = Image.find(params[:id])
    @image.dontshow = true
    @image.save

    redirect_to images_path
  end
end
