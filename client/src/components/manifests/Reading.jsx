import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";

function Reading({ reading_attr, updateManifestForm }) {
  const [readingAttr, setReadingAttr] = useState(reading_attr);

  useEffect(() => {
    updateManifestForm({
      attr: "reading_attributes",
      nestedAttr: "read",
      attrValue: readingAttr
    });
    // eslint-disable-next-line
  }, [readingAttr]);

  const handleChange = (event) => {
    const { value } = event.target;
    setReadingAttr(value);
  }

  return (
    <div className="border-2 border-black px-4 relative mt-12 md:mt-0">
      <div className="p-2 absolute -top-10 left-0 font-bold w-full flex justify-between">
        <Tooltip placement="top" title="What you read today?">
          <p>READING</p>
        </Tooltip>
      </div>
      <input type="text" value={readingAttr.read} onChange={handleChange} className="h-14 w-11/12 outline-none" />
    </div>
  );
}

export default Reading;