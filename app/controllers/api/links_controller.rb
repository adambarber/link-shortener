class Api::LinksController < ApiController
  def create
    @url = Url.new(url_params)
    if @url.save
      render json: @url, root: false
    else
      payload = { errors: @url.errors, url: @url }
      render json: payload, status: 400
    end
  end

  private

  def url_params
    params.permit(:url)
  end
end
