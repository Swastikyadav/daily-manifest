import React, { useState, useEffect } from "react";
import { Tooltip, Checkbox } from "antd";

function Habits({ habit_attr, updateManifestForm }) {
  const [goodHabitAttr, setGoodHabitAttr] = useState(habit_attr.good_habits);
  const [badHabitAttr, setBadHabitAttr] = useState(habit_attr.bad_habits);

  useEffect(() => {
    updateManifestForm({
      attr: "habit_attributes",
      nestedAttr: "good_habits",
      attrValue: goodHabitAttr
    });
    // eslint-disable-next-line
  }, [goodHabitAttr]);

  useEffect(() => {
    updateManifestForm({
      attr: "habit_attributes",
      nestedAttr: "bad_habits",
      attrValue: badHabitAttr
    });
    // eslint-disable-next-line
  }, [badHabitAttr]);

  const handleChange = (idx, habitAttr, setHabitAttr, event) => {
    const { name, value } = event.target;
    const newHabits = habitAttr.map((habit, id) => {
      if (idx !== id) return habit;
      return {
        ...habit,
        [name]: value,
      }
    });

    setHabitAttr(newHabits);
  }

  const handleCheckBox = (idx, habitAttr, setHabitAttr, checkBoxAttr) => {
    const newHabits = habitAttr.map((habit, id) => {
      if (idx !== id) return habit;
      return {
        ...habit,
        [checkBoxAttr]: !habit[checkBoxAttr],
      }
    });

    setHabitAttr(newHabits);
  }

  return (
    <div className="block md:flex col-span-1 gap-1">
      <div className="border-2 border-black h-48 relative md:w-1/2">
        <div className="p-2 absolute -top-10 font-bold w-full flex justify-between">
          <Tooltip placement="top" title="Habits maintened">
            <p>GOOD HABITS</p>
          </Tooltip>
        </div>
        {goodHabitAttr.map((gh, idx) => {
          return (
            <div key={idx} className="px-4 border-b-2 h-16 flex justify-between">
              <span className="self-center">
                <Checkbox onChange={() => handleCheckBox(idx, goodHabitAttr, setGoodHabitAttr, "maintened")} checked={gh.maintened}></Checkbox>
              </span>
              <input name="habit" type="text" value={gh.habit} onChange={(e) => handleChange(idx, goodHabitAttr, setGoodHabitAttr, e)} className="h-14 w-11/12 outline-none" />
            </div>
          );
        })}
      </div>

      <div class="border-2 border-black h-48 relative md:w-1/2 mt-12 md:mt-0">
        <div className="p-2 absolute -top-10 font-bold w-full flex justify-between">
          <Tooltip placement="top" title="Habits resisted">
            <p>BAD HABITS</p>
          </Tooltip>
        </div>
        {badHabitAttr.map((bh, idx) => {
          return (
            <div key={idx} className="px-4 border-b-2 h-16 flex justify-between">
              <span className="self-center">
                <Checkbox onChange={() => handleCheckBox(idx, badHabitAttr, setBadHabitAttr, "resisted")} checked={bh.resisted}></Checkbox>
              </span>
              <input name="habit" type="text" value={bh.habit} onChange={(e) => handleChange(idx, badHabitAttr, setBadHabitAttr, e)} className="h-14 w-11/12 outline-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Habits;