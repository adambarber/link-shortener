class Url < ActiveRecord::Base
  validates :url, presence: true
  validates :url, uniqueness: { message: 'URL has already been shorted.' }

  before_save :set_domain_name
  after_commit :set_slug, on: :create

  def shorted_url
    "http://l.lvh.me:3000/#{slug}"
  end

  private

  def set_domain_name
    self.domain = URI.parse(self.url).host
  end

  def set_slug
    self.update_columns slug: self.id.to_s(36)
  end
end
