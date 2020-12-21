import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DatePicker, Space } from "antd";
import moment from "moment";
import axios from "axios";

import Schedule from "./Schedule";
import MacroGoal from "./MacroGoal";
import MeezoGoal from "./MeezoGoal";
import MicroTask from "./MicroTask";
import Reading from "./Reading";
import Habits from "./Habits";
import Reflection from "./Reflection";

import UserContext from "../../context/UserContext";

function Form({ buttonText }) {
  let params = useParams();
  const user = useContext(UserContext);

  const [manifestForm, setManifestForm] = useState({});

  useEffect(() => {
    fetchManifestDetails();
    // eslint-disable-next-line
  }, []);

  const fetchManifestDetails = async () => {
    const { data:
      { manifest, reading, reflection, microtask, goal, habit, schedule }
    } = await axios.get(`/api/v1/registrations/${user.id}/manifests/${params.id}`, {withCredentials: true})
    setManifestForm({
      manifest: {
        day: manifest.day,
        date_of_manifest: manifest.date_of_manifest,
        reading_attributes: { read: reading.read },
        reflection_attributes: {
          reflection: reflection.reflection,
        },
        microtask_attributes: {
          task: microtask.task
        },
        goal_attributes: {
          macro: goal.macro,
          meezo: goal.meezo
        },
        habit_attributes: {
          good_habits: habit.good_habits,
          bad_habits: habit.bad_habits
        },
        schedule_attributes: {
          day_starts_at: schedule.day_starts_at,
          time_entry: schedule.entries.time_entry
        }
      }
    });
  }

  const updateManifestForm = ({attr, nestedAttr="", attrValue}) => {
    const newManifestForm = { ...manifestForm };
    newManifestForm.manifest[attr][nestedAttr] = attrValue;

    setManifestForm(newManifestForm);
  }

  return (
    <>
      {manifestForm.manifest &&
        <>
          <div className="flex justify-end mb-12">
            <Space direction="vertical" size={12}>
              <DatePicker value={moment(manifestForm.manifest.date_of_manifest)} format="dddd, MMM Do" disabled />
            </Space>
            <button className="ml-4 bg-blue-400 p-1 px-2 rounded text-white font-bold">{buttonText}</button>
          </div>
          <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-2">
            <Schedule schedule_attr={manifestForm.manifest.schedule_attributes} updateManifestForm={updateManifestForm} />
            <div className="grid gap-1 grid-rows-3">
              <MacroGoal
                goal_attr={manifestForm.manifest.goal_attributes.macro}
                updateManifestForm={updateManifestForm}
              />
              <MeezoGoal
                goal_attr={manifestForm.manifest.goal_attributes.meezo}
                updateManifestForm={updateManifestForm}
              />
              <MicroTask
                microtask_attr={manifestForm.manifest.microtask_attributes.task}
                updateManifestForm={updateManifestForm}
              />
              <Reading
                reading_attr={manifestForm.manifest.reading_attributes.read}
                updateManifestForm={updateManifestForm}
              />
            </div>
          </div>
          
          <div className="block md:grid md:grid-cols-2 mt-20 gap-4">
            <Habits
              habit_attr={manifestForm.manifest.habit_attributes}
              updateManifestForm={updateManifestForm}
            />
            <Reflection
              reflection_attr={manifestForm.manifest.reflection_attributes.reflection}
              updateManifestForm={updateManifestForm}
            />
          </div>
        </>
      }
    </>
  );
}

export default Form;