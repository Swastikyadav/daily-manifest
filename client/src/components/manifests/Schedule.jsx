import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import moment from "moment";
import { MobileOutlined, LineOutlined } from "@ant-design/icons";

function Schedule({ schedule_attr, updateManifestForm }) {
  const { day_starts_at, time_entry } = schedule_attr;
  const [timeEntryAttr, setTimeEntryAttr] = useState(time_entry);

  useEffect(() => {
    updateManifestForm({
      attr: "schedule_attributes",
      nestedAttr: "time_entry",
      attrValue: timeEntryAttr
    });
    // eslint-disable-next-line
  }, [timeEntryAttr]);

  const handleChange = (idx, event) => {
    const { name, value } = event.target;
    const newTimeEntry = timeEntryAttr.map((te, id) => {
      if (idx !== id) return te;
      return {
        ...te,
        [name]: value
      }
    })
    setTimeEntryAttr(newTimeEntry);
  }

  return (
    <div className="md:col-span-1 border-t-2 relative">
      <div className="p-2 absolute -top-10 font-bold w-full flex justify-between">
        <Tooltip placement="top" title="Prepare your schedule the day before">
          <p>SCHEDULE</p>
        </Tooltip>
        <div className="relative">
          <MobileOutlined className="text-2xl" />
          <Tooltip placement="top" title="Avoid phone for few hours after waking up">
            <LineOutlined rotate={45} className="text-2xl absolute left-0" />
          </Tooltip>
        </div>
      </div>
      {timeEntryAttr.map((te, idx) => {
        return (
          <div key={idx} className="px-4 h-16 border-b-2 flex justify-between">
            <span className="self-center">
              {moment(day_starts_at, "HH:mm a").add(idx, "hours").format("h:mm a")}
            </span>
            <div className="w-10/12">
              <input name="first_half" value={te.first_half} onChange={(e) => handleChange(idx, e)} className="pt-2 w-full outline-none border-b-2 border-gray-900 text-blue-600 font-mono" />
              <input name="second_half" value={te.second_half} onChange={(e) => handleChange(idx, e)} className="w-full outline-none text-blue-600 font-mono" />
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Schedule;