import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Calendar, DatePicker, Space, Alert, Select, Col, Row, Badge, Button } from "antd";
import axios from "axios";
import moment from "moment";

import { errorMessageFormat, initialManifestData } from "../../../utils/common";

import UserContext from "../../../context/UserContext";

function NewManifest({ setError }) {
  let history = useHistory();
  const [availableDateArray, setAvailableDateArray] = useState([]);
  const [initialManifestForm, setInitialManifestForm] = useState(initialManifestData);
  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    buildAvailableDateArray();
    // eslint-disable-next-line
  }, []);

  const onSelect = (value) => {
    console.log(value.format("YYYY-MM-DD"));
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/v1/registrations/${user.id}/manifests`,
        initialManifestForm,
        {withCredentials: true}
      );
      setLoading(false);
      history.push(`/manifests/${data.manifest.id}`);
    } catch({ response }) {
      const errMsg = errorMessageFormat(response.data.errors);
      setLoading(false);
      setError(errMsg);
    }
  }

  const buildAvailableDateArray = async () => {
    try {
      const { data } = await axios.get(`/v1/registrations/${user.id}/manifests`, {withCredentials: true});
      const arr = data.manifests.map(mf => {
        return mf.date_of_manifest;
      })

      setAvailableDateArray(arr);
    } catch ({ response }) {
      const errMsg = errorMessageFormat(response.data.errors);
      setError(errMsg);
    }
  }

  const headerRender = ({ value, onChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let index = start; index < end; index++) {
      monthOptions.push(
        <Select.Option className="month-item" key={`${index}`}>
          {months[index]}
        </Select.Option>
      );
    }
    const month = value.month();

    const year = value.year();
    const options = [];
    for (let i = year; i < year + 5; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>
      );
    }
    return (
      <div style={{ padding: 8 }} className="flex justify-end mt-4">
        <Row gutter={8}>
          <Col>
            <Select
              size="large"
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              onChange={newYear => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              size="large"
              dropdownMatchSelectWidth={false}
              value={String(month)}
              onChange={selectedMonth => {
                const newValue = value.clone();
                newValue.month(parseInt(selectedMonth, 10));
                onChange(newValue);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </div>
    );
  }

  const dateCellRender = (value) => {
    if (value < moment().startOf("day")) return (
      <Badge color="blue" text="NA" />
    );

    if (availableDateArray.includes(value.format("YYYY-MM-DD"))) {
      return <Badge color="red" text="Manifest Exists" />
    } else {
      return <Badge color="green" text="Slot Available" />
    }
  }

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  }

  const handleDayChange = (event) => {
    const { value } = event.target;

    let dummyManifestForm = { ...initialManifestForm };
    dummyManifestForm.manifest.day = value;
    setInitialManifestForm(dummyManifestForm);
  }

  const handleDateChange = (date, dateString) => {
    let dummyManifestForm = { ...initialManifestForm };
    dummyManifestForm.manifest.date_of_manifest = dateString;
    setInitialManifestForm(dummyManifestForm);
  }

  return (
    <div className="relative">
      <div className="flex justify-end mb-12">
        <Space direction="vertical" size={12}>
          <DatePicker
            placeholder="Select date for manifest"
            disabledDate={disabledDate}
            onChange={handleDateChange}
          />
        </Space>
        <input
          type="number"
          placeholder="Day"
          value={initialManifestForm.manifest.day}
          onChange={handleDayChange}
          className="ml-4 border-2 w-1/12"
        />
        <Button type="primary" loading={loading} className="ml-4" onClick={handleSubmit}>+ Add Manifest</Button>
      </div>
      <Alert
        message="Check in below calander which dates are available to create a new manifest, and which dates already have a manifest."
        type="info"
        showIcon
      />
      <Calendar
        onSelect={onSelect}
        headerRender={headerRender}
        dateCellRender={dateCellRender}
      />
    </div>
  );
}

export default NewManifest;