import "./index.css"
import { createContext, useEffect, useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import * as turf from "@turf/turf";

import Mapbox from "../Mapbox";
import RecordInfo from "./RecordInfo";
import CustomizeDot from "./CustomizeDot";

export const ViewIndexContext = createContext<any>(null);

const RecordMap = ({match}: any) => {
  const [recordData, setRecordData] = useState<any>();
  const [drawData, setDrawData] = useState<any>();
  const [viewIndex, setViewIndex] = useState(0);

  useEffect(() => {
    const getRecordData = async () => {
      let data;
      try {
        data = await fetch(
          // process.env.REACT_APP_API_URL +
          //   "/get_track?last_index=0&track_id=0&short=true",
          "http://localhost:4000/api/bounds/" + match.params.id,
          {
            method: "GET",
          }
        ).then((data) => data.json());
      } catch (error) {
        console.log(error);
      }
      if (data) {
        console.log(data)
        const points = data.points;
        const multiplier = data.multiplier;
        const startPoint = data.start_point;
        let convertData: any[] = [];
        let graphData = [
          {
            distance: 0,
            height: 0,
          },
        ];
        let from;
        let to = [0, 0];
        for (let i = 0; i < points.length/20; i += 2) {
          const currentCoord = [
            startPoint[1] + points[i + 1] * multiplier,
            startPoint[0] + points[i] * multiplier,
          ];
          convertData.push(currentCoord);
          from = to;
          to = currentCoord;
          if (i > 0) {
            graphData.push({
              distance: graphData[graphData.length - 1].distance + turf.distance(turf.point(from), turf.point(to)) * 1000,
              height: Math.random() *1000
            });
          }
        }
        setRecordData(graphData);
        setDrawData(convertData);
        setViewIndex(convertData.length);
      }
    };
    getRecordData();
  }, []);

  const handleClick = (e: any) => {
    setViewIndex(e.activeLabel);
    console.log(viewIndex);
    console.log("click");
  };

  return (
    <div className="record-view">
      <div className="record-control-container">
        <div className="record-map">
          <ViewIndexContext.Provider value={viewIndex}>
            <Mapbox
              height="calc(70vh - 70px)"
              width="100%"
              viewDrawData={drawData}
              center={drawData ? drawData[0] : undefined}
            ></Mapbox>
          </ViewIndexContext.Provider>
        </div>

        <div className="record-control-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
            onClick={handleClick}
              margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
              data={recordData}
            >
              <Line
                yAxisId="1"
                stroke="#8884d8"
                strokeWidth={3}
                dataKey="distance"
                type="monotone"
                dot={<CustomizeDot color="#8884d8"/>}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="3"
                stroke="#FFAD46"
                strokeWidth={3}
                dataKey="height"
                type="monotone"
                dot={<CustomizeDot color="#FFAD46"/>}
                activeDot={{ r: 5 }}
              />
              {/* <CartesianGrid stroke="#ccc" /> */}
              {/* <XAxis dataKey="name" /> */}
              {/* <YAxis /> */}
              {/* <Tooltip /> */}
              <Legend verticalAlign="top" align="left" iconSize={30} height={45} />
              <Tooltip />
            </LineChart>        
          </ResponsiveContainer>
        </div>
      </div>

      <div className="record-graph">
        <RecordInfo />
      </div>
    </div>
  );
};

export default RecordMap;
