class Commuter < ApplicationRecord
  has_one :home
  has_many :destinations
end
