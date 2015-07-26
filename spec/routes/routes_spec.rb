require 'rails_helper'

describe 'Routing', type: :routing do
  it { expect(get:"/").to route_to( controller: "home", action: 'index') }

end

