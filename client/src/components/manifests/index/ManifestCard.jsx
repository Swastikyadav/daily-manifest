import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import moment from "moment";

import NoDataImage from "../../../assets/nodata.svg";

function ManifestCard({ manifestsArray, filteredManifests, filterByDate }) {
  const customManifestsArray = filterByDate ? filteredManifests : manifestsArray;

  return (
    <div>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {customManifestsArray.map(mf => {
          return (
            <Link to={`/manifests/${mf.id}`} key={mf.id}>
              <li className="col-span-1 flex shadow-sm rounded-md">
                <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md">
                  Day {mf.day}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <p className="text-gray-900 font-medium">{moment(mf.date_of_manifest).format("dddd, MMM, Do, YYYY")}</p>
                    <p className="text-gray-500">Click to view</p>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>

      {!customManifestsArray.length && (
        <div className="flex flex-col">
          <Alert
            message="No manifests to show here."
            type="info"
            showIcon
          />
          <img width={400} src={NoDataImage} alt="No-Data" className="self-center mt-12" />
        </div>
      )}
    </div>
  );
}

export default ManifestCard;