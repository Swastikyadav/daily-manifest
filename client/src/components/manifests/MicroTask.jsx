import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";

function MicroTask({ microtask_attr, updateManifestForm }) {
  const [microTaskAttr, setMicroTaskAttr] = useState(microtask_attr);

  useEffect(() => {
    updateManifestForm({
      attr: "microtask_attributes",
      nestedAttr: "task",
      attrValue: microTaskAttr
    });
    // eslint-disable-next-line
  }, [microTaskAttr]);

  const handleChange = (idx, event) => {
    const { name, value } = event.target;
    const newMicroTask = microTaskAttr.map((mt, id) => {
      if (idx !== id) return mt;
      return {
        ...mt,
        [name]: value
      }
    });

    setMicroTaskAttr(newMicroTask);
  }

  return (
    <div className="border-2 border-black h-48 relative mt-12 md:mt-0">
      <div className="p-2 absolute -top-10 font-bold w-full flex justify-between">
        <Tooltip placement="top" title="Micro tasks to be done today">
          <p>MICRO (TASKS)</p>
        </Tooltip>
        <p>TODAY</p>
      </div>
      {microTaskAttr.map((mt, idx) => {
        return (
          <div key={idx} className="px-4 border-b-2 h-16 flex justify-between">
            <span className="self-center">{idx + 1}.</span>
            <input name="text" type="text" value={mt.text} onChange={(e) => handleChange(idx, e)} className="h-14 w-11/12 outline-none text-blue-600 font-mono" />
          </div>
        )
      })}
    </div>
  );
}

export default MicroTask;