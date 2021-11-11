import { createContext, useEffect, useRef, useState } from 'react'
import Mapbox from '../Mapbox'

import * as turf from '@turf/turf'
import { useParams } from 'react-router'
import GetRealtimeData from '../../../utils/GetRealtimeData'
import RealtimeDraw from '../../Map/Mapbox/RealtimeDraw'
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

    const [trackingData, setTrackingData] = useState<any>({
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [],
            },
        },
    })

    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        return () => {
            setTrackingData({})
        }
    }, [])

    useEffect(() => {
        console.log(trackingData)
    })

    useEffect(() => {
        GetRealtimeData(0, endpoint, query, setTrackingData, mapRef)
    }, [])

    const [center, setCenter] = useState<[number, number]>()


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
