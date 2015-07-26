class Api::LinksController < ApiController
  def index
    render json: {
      id: 1,
      domain: 'example.com',
      link: 'http://example.com',
      slug: 'aHR0cDovL'
    }
  end

  def create
    render json: {
      id: 1,
      domain: 'example.com',
      link: 'http://example.com',
      slug: 'aHR0cDovL'
    }
  end
end
