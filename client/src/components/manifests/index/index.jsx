import React, { useState, useEffect, useContext } from "react";
import { Space, DatePicker, Tooltip } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import axios from "axios";

import ManifestCard from "./ManifestCard";
import { errorMessageFormat } from "../../../utils/common";

import UserContext from "../../../context/UserContext";

function ManifestsIndex({ setError }) {
  const [manifests, setManifests] = useState(null);
  const [filterByDate, setFilterByDate] = useState("");
  const [filteredManifests, setFilteredManifests] = useState(null);

  const user = useContext(UserContext);

  useEffect(() => {
    fetchAndSetManifests();
    // eslint-disable-next-line
  }, []);

  const fetchAndSetManifests = async () => {
    try {
      const { data } = await axios.get(`/api/v1/registrations/${user.id}/manifests`, {withCredentials: true});
      setManifests(data.manifests);
    } catch ({ response }) {
      const errMsg = errorMessageFormat(response.data.errors);
      setError(errMsg);
    }
  }

  const handleDateChange = (date, dateString) => {
    const filteredArray = manifests.filter(mf => {
      return mf.date_of_manifest === dateString
    })
    
    setFilterByDate(dateString);
    setFilteredManifests(filteredArray);
  }

  const clearSearch = () => {
    setFilterByDate("");
  }

  return (
    <>
      {manifests && (
        <>
          <div className="flex justify-end mb-12">
            <Space direction="vertical" size={12}>
              <DatePicker placeholder="Search by date" onChange={handleDateChange} />
            </Space>
            {filterByDate && <Tooltip title="Clear Search">
              <CloseCircleTwoTone className="text-3xl ml-4 cursor-pointer" onClick={clearSearch} />
            </Tooltip>}
          </div>
          <ManifestCard
            manifestsArray={manifests}
            filteredManifests={filteredManifests}
            filterByDate={filterByDate}  
          />
        </>
      )}
    </>
  );
}

export default ManifestsIndex;