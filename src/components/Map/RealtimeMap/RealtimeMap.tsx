import { createContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import Mapbox from '../Mapbox'

import GetRealtimeData from '../../../utils/GetRealtimeData'
import useRealtimeFetch from './useRealtimeFetch'

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN_ACCESS
export const TrackingDataContext = createContext<any>(null)

const RealtimeMap = () => {
  const mapRef = useRef();
  //@ts-ignore
    const { device, task } = useParams()
    const query = {
        device_id: device,
        task_id: task,
    }
    const endpoint = process.env.REACT_APP_API_URL + '/task-online/'

    // const [trackingData, setTrackingData] = useState<any>({
    //     type: 'geojson',
    //     data: {
    //         type: 'Feature',
    //         geometry: {
    //             type: 'LineString',
    //             coordinates: [],
    //         },
    //     },
    // })

    // useEffect(() => {
    //     return () => {
    //         setTrackingData({})
    //     }
    // }, [])

    // useEffect(() => {
    //     GetRealtimeData(0, endpoint, query, setTrackingData, mapRef)
    //     return (() => {
    //       console.log("exit")
    //     })
    // }, [])

    const [trackingData] = useRealtimeFetch(endpoint, query, mapRef);

    return (
        <div className="wrapper">
            <div className="content">
                <div className="title fw-bold fs-3 mb-4 d-flex">
                    <div>Hoạt động của thiết bị ID {device}</div>
                </div>
            </div>
            <div className="mapbox-container">
                <TrackingDataContext.Provider value={trackingData}>
                    <Mapbox
                        accessToken={accessToken}
                        maxWidth="100%"
                        height="calc(100vh - 175px)"
                        realtimeMode
                        mapInstance={mapRef}
                    />
                </TrackingDataContext.Provider>
            </div>
        </div>
    )
}

export default RealtimeMap
