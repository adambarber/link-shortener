class Url < ActiveRecord::Base
  validates :url, presence: true
  validates :url, uniqueness: { message: 'URL has already been shorted.' }

  before_save :clean_url, :set_domain_name
  after_commit :set_slug, on: :create

  def shorted_url
    "http://l.lvh.me:5000/#{slug}"
  end

  private

  def clean_url
    downcase_url = self.url.downcase
    self.url = downcase_url.gsub(/\/$/, '')
  end

  def set_domain_name
    self.domain = URI.parse(self.url).host.downcase
  end

  def set_slug
    self.update_columns slug: self.id.to_s(36)
  end
end
