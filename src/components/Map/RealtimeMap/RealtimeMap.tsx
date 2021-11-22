import './index.scss'
import { createContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router'

import Mapbox from '../Mapbox'

import useRealtimeFetch from './useRealtimeFetch'
import useFetch from '../../../hooks/useFetch'
import { ENDPOINT_URL } from '../../../app/config'

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN_ACCESS

export const TrackingDataContext = createContext<any>(null)

const RealtimeMap = () => {
    const mapRef = useRef()
    //@ts-ignore
    const { device, task } = useParams()

    const [deviceResponse, isFetchingDevice, setRequestDevice] = useFetch({} as any)

    useEffect(() => {
        setRequestDevice({
            endPoint: ENDPOINT_URL + '/device/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            requestBody: {
                action: 'read',
                pk: device,
            },
        })
    },[])

    const query = {
        device_id: device,
        task_id: task,
    }
    const endpoint = ENDPOINT_URL + '/task-online/'

    const [trackingData] = useRealtimeFetch(endpoint, query, mapRef)

    return (
        <div className="realtime-map-wrapper">
            <div className="realtime-map-content">
                <div className="realtime-map-title">
                    <div>Hoạt động của thiết bị {deviceResponse?.data?.name}</div>
                </div>
                <div className="realtime-map-mapbox-container">
                    <TrackingDataContext.Provider value={trackingData}>
                        <Mapbox accessToken={accessToken} maxWidth="100%" height="calc(100vh - 150px)" realtimeMode mapInstance={mapRef} />
                    </TrackingDataContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default RealtimeMap
