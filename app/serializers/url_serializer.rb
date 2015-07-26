class UrlSerializer < ActiveModel::Serializer
  attributes :id, :url, :slug, :shorted_url
end
