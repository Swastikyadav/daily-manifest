class SingleRecordValidator < ActiveModel::Validator
  def validate(record)
    manifest = Manifest.where(id: record.manifest_id).first

    def record_exists?(manifest)
      case options[:name]
      when "readings"
        manifest.readings.size > 0
      when "reflections"
        manifest.reflections.size > 0
      when "microtasks"
        manifest.microtasks.size > 0
      when "goals"
        manifest.goals.size > 0
      when "habits"
        manifest.habits.size > 0
      when "schedules"
        manifest.schedules.size > 0
      end
    end

    record.errors.add(:base, "Manifest can have only one #{options[:name]}") if record_exists? manifest
  end
end
