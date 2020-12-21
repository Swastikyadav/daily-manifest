import React, { useState, useEffect } from "react";
import { Tooltip, Checkbox } from "antd";

function Reflection({ reflection_attr, updateManifestForm }) {
  const [reflectionAttr, setReflectionAttr] = useState(reflection_attr);

  useEffect(() => {
    updateManifestForm({
      attr: "reflection_attributes",
      nestedAttr: "reflection",
      attrValue: reflectionAttr
    });
    // eslint-disable-next-line
  }, [reflectionAttr]);

  const handleChange = (idx, event) => {
    const { name, value } = event.target;
    const newReflectionAttr = reflectionAttr.map((rf, id) => {
      if (idx !== id) return rf;
      return {
        ...rf,
        [name]: value
      }
    });

    setReflectionAttr(newReflectionAttr);
  }

  const handleCheckBox = (idx) => {
    const newReflectionAttr = reflectionAttr.map((rf, id) => {
      if (idx !== id) return rf;
      return {
        ...rf,
        achieved: !rf.achieved
      }
    })

    setReflectionAttr(newReflectionAttr);
  }

  return (
    <div className="border-2 border-black h-48 relative col-span-1 relative mt-12 md:mt-0">
      <div className="p-2 absolute -top-10 font-bold w-full flex justify-between">
        <Tooltip placement="top" title="Reflection of the day, reflect 3 things from today">
          <p>REFLECTION</p>
        </Tooltip>
      </div>
      {reflectionAttr.map((rf, idx) => {
        return (
          <div key={idx} className="px-4 border-b-2 h-16 flex justify-between">
            <span className="self-center"><Checkbox checked={rf.achieved} onChange={() => handleCheckBox(idx)}></Checkbox></span>
            <input name="text" type="text" value={rf.text} onChange={(e) => handleChange(idx, e)} className="h-14 w-11/12 outline-none text-blue-600 font-mono" />
          </div>
        );
      })}
    </div>
  );
}

export default Reflection;