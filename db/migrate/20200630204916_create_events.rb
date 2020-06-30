class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :date
      t.string :period, length: 15      
      t.string :status, length: 15
      t.belongs_to :user

      t.timestamps
    end
  end
end
