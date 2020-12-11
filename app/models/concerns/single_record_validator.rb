class SingleRecordValidator < ActiveModel::Validator
  def validate(record)
    manifest = Manifest.where(id: record.manifest_id).first

    def record_exists?(manifest)
      if !!manifest
        case options[:name]
        when "reading"
          !!manifest.reading
        when "reflection"
          !!manifest.reflection
        when "microtask"
          !!manifest.microtask
        when "goal"
          !!manifest.goal
        when "habit"
          !!manifest.habit
        when "schedule"
          !!manifest.schedule
        end
      end
    end

    record.errors.add(:base, "Manifest can have only one #{options[:name]}") if record_exists? manifest
  end
end
