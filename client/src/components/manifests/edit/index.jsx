import React, { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert } from "antd";

import { errorMessageFormat } from "../../../utils/common";
import UserContext from "../../../context/UserContext";

import Form from "../Form";

function EditManifest({ setError }) {
  const user = useContext(UserContext);
  const params = useParams();

  const [successAlert, setSuccessAlert] = useState("");

  const handleSubmit = async (payload) => {
    try {
      await axios.patch(
        `/v1/registrations/${user.id}/manifests/${params.id}`,
        payload,
        {withCredentials: true}
      );

      setSuccessAlert("Changes Saved");
    } catch({ response }) {
      const errMsg = errorMessageFormat(response.data.errors);
      setError(errMsg);
    }
  }

  return (
    <div className="relative">
      {successAlert && (
        <div className="w-full absolute -top-7 flex justify-center z-10">
          <Alert
            message={successAlert}
            type="success"
            showIcon
            className="w-96"
            closable
          />
        </div>
      )}
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default EditManifest;