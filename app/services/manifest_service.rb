class ManifestService
  def initialize(manifest)
    @manifest = manifest
  end

  def process
    { 
      manifest: @manifest,
      reading: @manifest.reading,
      reflection: @manifest.reflection,
      microtask: @manifest.microtask,
      goal: @manifest.goal,
      habit: @manifest.habit,
      schedule: {
        day_starts_at: @manifest.schedule.day_starts_at.strftime("%I:%M %p"),
        entries: @manifest.schedule
      }
    }
  end
end