class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password
      t.string :hair_type
      t.string :hair_width
      t.string :hair_porosity
      t.string :hair_density

      t.timestamps
    end
  end
end
