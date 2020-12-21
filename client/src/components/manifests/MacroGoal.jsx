import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { SmileTwoTone, ClockCircleTwoTone, DollarCircleTwoTone } from "@ant-design/icons";

function MacroGoal({ goal_attr, updateManifestForm }) {
  const [macroAttr, setMacroAttr] = useState(goal_attr);

  useEffect(() => {
    updateManifestForm({
      attr: "goal_attributes",
      nestedAttr: "macro",
      attrValue: macroAttr
    });
    // eslint-disable-next-line
  }, [macroAttr]);

  const handleChange = (idx, event) => {
    const { name, value } = event.target;
    const newMacroAttr = macroAttr.map((ma, id) => {
      if (idx !== id) return ma;
      return {
        ...ma,
        [name]: value,
      }
    });

    setMacroAttr(newMacroAttr);
  }

  const renderIcon = (idx) => {
    const icons = [
      <SmileTwoTone className="text-2xl" />,
      <ClockCircleTwoTone className="text-2xl" />,
      <DollarCircleTwoTone className="text-2xl" />
    ];

    const title = ["Goal for happiness", "Goal for time", "Goal for finance"];
    return (
      <Tooltip placement="left" title={title[idx]}>
        <span className="self-center">{icons[idx]}</span>
      </Tooltip>
    );
  }

  return (
    <div className="border-2 border-black h-48 relative mt-12 md:mt-0">
      <div className="p-2 absolute -top-10 font-bold w-full flex justify-between">
        <Tooltip placement="top" title="Next 90 days goal">
          <p>MACRO (GOALS)</p>
        </Tooltip>
        <p>90 DAYS</p>
      </div>
      {macroAttr.map((ma, idx) => {
        return (
          <div key={idx} className="px-4 border-b-2 h-16 flex justify-between">
            {renderIcon(idx)}
            <input name="text" value={ma.text} onChange={(e) => handleChange(idx, e)} type="text" className="h-14 w-11/12 outline-none text-blue-600 font-mono" />
          </div>
        );
      })}
    </div>
  );
}

export default MacroGoal;