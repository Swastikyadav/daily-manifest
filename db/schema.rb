# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_26_061028) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "goals", force: :cascade do |t|
    t.jsonb "macro", default: [], null: false
    t.jsonb "meezo", default: [], null: false
    t.bigint "manifest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manifest_id"], name: "index_goals_on_manifest_id"
  end

  create_table "habits", force: :cascade do |t|
    t.jsonb "good_habits", default: [], null: false
    t.jsonb "bad_habits", default: [], null: false
    t.bigint "manifest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manifest_id"], name: "index_habits_on_manifest_id"
  end

  create_table "manifests", force: :cascade do |t|
    t.integer "day"
    t.date "date_of_manifest"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["date_of_manifest", "user_id"], name: "index_manifests_on_date_of_manifest_and_user_id", unique: true
    t.index ["user_id"], name: "index_manifests_on_user_id"
  end

  create_table "microtasks", force: :cascade do |t|
    t.bigint "manifest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "task", default: [], null: false
    t.index ["manifest_id"], name: "index_microtasks_on_manifest_id"
  end

  create_table "readings", force: :cascade do |t|
    t.string "read", null: false
    t.bigint "manifest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manifest_id"], name: "index_readings_on_manifest_id"
  end

  create_table "reflections", force: :cascade do |t|
    t.jsonb "reflection", default: [], null: false
    t.bigint "manifest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manifest_id"], name: "index_reflections_on_manifest_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.time "day_starts_at"
    t.jsonb "time_entry", default: [], null: false
    t.bigint "manifest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manifest_id"], name: "index_schedules_on_manifest_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "goals", "manifests", on_delete: :cascade
  add_foreign_key "habits", "manifests", on_delete: :cascade
  add_foreign_key "manifests", "users", on_delete: :cascade
  add_foreign_key "microtasks", "manifests", on_delete: :cascade
  add_foreign_key "readings", "manifests", on_delete: :cascade
  add_foreign_key "reflections", "manifests", on_delete: :cascade
  add_foreign_key "schedules", "manifests", on_delete: :cascade
end
