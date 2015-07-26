class Links::RedirectController < ApplicationController
    def show
      @slug = Url.where(slug: params[:slug]).first
      redirect_to @slug.url
    end
end
