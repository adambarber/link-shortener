class CreateUrls < ActiveRecord::Migration
  def change
    create_table :urls do |t|
      t.string :domain
      t.string :url
      t.string :slug

      t.timestamps null: false
    end
    add_index :urls, :slug
  end
end
