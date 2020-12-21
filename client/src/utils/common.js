export const errorMessageFormat = (errors) => {
  if (typeof errors === "string") {
    return errors;
  } else {
    return errors[0];
  }
}

export const initialManifestData = {
  manifest: {
    day: "",
    date_of_manifest: "",
    reading_attributes: {read: ""},
    reflection_attributes: {
      reflection: [{text: "", achieved: false}, {text: "", achieved: false}, {text: "", achieved: false}]
    },
    microtask_attributes: {task: [{text: ""}, {text: ""}, {text: ""}]},
    goal_attributes: {
      macro: [{text: "", tag: ""}, {text: "", tag: ""}, {text: "", tag: ""}],
      meezo: [{text: "", tag: ""}, {text: "", tag: ""}, {text: "", tag: ""}]
    },
    habit_attributes: {
      good_habits: [{habit: "", maintened: false}, {habit: "", maintened: false}, {habit: "", maintened: false}],
      bad_habits: [{habit: "", resisted: false}, {habit: "", resisted: false}, {habit: "", resisted: false}]
    },
    schedule_attributes: {
      day_starts_at: "06:30",
      time_entry: [
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""},
        {first_half: "", second_half: ""}
    ]}
  }
}