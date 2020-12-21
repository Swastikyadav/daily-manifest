import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { SmileTwoTone, ClockCircleTwoTone, DollarCircleTwoTone } from "@ant-design/icons";

function MeezoGoal({ goal_attr, updateManifestForm }) {
  const [meezoAttr, setMeezoAttr] = useState(goal_attr);

  useEffect(() => {
    updateManifestForm({
      attr: "goal_attributes",
      nestedAttr: "meezo",
      attrValue: meezoAttr
    });
    // eslint-disable-next-line
  }, [meezoAttr]);

  const handleChange = (idx, event) => {
    const { name, value } = event.target;
    const newMeezoAttr = meezoAttr.map((ma, id) => {
      if (idx !== id) return ma;
      return {
        ...ma,
        [name]: value
      }
    })

    setMeezoAttr(newMeezoAttr);
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
        <Tooltip placement="top" title="Next 30 days goals">
          <p>MEEZO (MILESTONES)</p>
        </Tooltip>
        <p>30 DAYS</p>
      </div>
      {meezoAttr.map((ma, idx) => {
        return (
          <div key={idx} className="px-4 border-b-2 h-16 flex justify-between">
            {renderIcon(idx)}
            <input name="text" value={ma.text} onChange={(e) => handleChange(idx, e)} type="text" className="h-14 w-11/12 outline-none text-blue-600 font-mono" />
          </div>
        )
      })}
    </div>
  );
}

export default MeezoGoal;