class AddPositionsToWikipages < ActiveRecord::Migration
  def self.up
    add_column :wiki_pages, :position, :integer
  end

end

