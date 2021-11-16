/* eslint-disable react/jsx-no-comment-textnodes */
import * as turf from '@turf/turf'
import { memo, useContext, useEffect, useState } from 'react'
import { Feature, Image, Layer, Popup, Source } from 'react-mapbox-gl'

import PaintScaleView from '../../../../utils/PaintScaleView'
import { TrackingDataContext } from '../../RealtimeMap/RealtimeMap'

import dayjs from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')

var utc = require('dayjs/plugin/utc')
dayjs.extend(customParseFormat)
dayjs.extend(utc)
interface IRealtimeDrawWrapperProps {
    zoom?: number
}

const RealtimeDrawWrapper: React.FC<IRealtimeDrawWrapperProps> = memo(({ zoom }: any) => {
    const trackingData = useContext(TrackingDataContext)
    const [data, setData] = useState<any>({
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
        if (trackingData?.coordinates?.length > 1)
            setData({
                type: 'geojson',
                data: turf.lineString(trackingData?.coordinates),
            })
    }, [trackingData])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
        <div>
            <Source id={`device`} geoJsonSource={data} />
            <Layer type="line" id={`device`} sourceId={`device`} paint={PaintScaleView(1, zoom || 16)} />

            <Image id={`device-icon`} url="https://i.ibb.co/WP8VqMv/3.png" options={{ pixelRatio: 4 }} />

            {data?.data?.geometry?.coordinates.length > 0 && (
                <div>
                    <Layer type="symbol" id={`marker`} layout={{ 'icon-image': `device-icon` }}>
                        <Feature
                            coordinates={trackingData?.coordinates[trackingData?.coordinates?.length - 1]}
                            onMouseEnter={() => setShowPopup(true)}
                            onMouseLeave={() => setShowPopup(false)}
                        />
                    </Layer>
                    {showPopup && (
                        <Popup coordinates={trackingData?.coordinates[trackingData?.coordinates?.length - 1]}>
                            <div className="text-start">
                                <li>Kinh độ: {trackingData?.coordinates[trackingData?.coordinates.length - 1][1]}</li>
                                <li>Vĩ độ: {trackingData?.coordinates[trackingData?.coordinates.length - 1][0]}</li>
                                <li>Tốc độ: {trackingData?.speed[trackingData?.speed.length - 1]} km/h</li>
                                <li>Độ chính xác: {trackingData?.accuracy[trackingData?.accuracy.length - 1]} cm</li>
                                <li>
                                    Thời gian:{' '}
                                    {dayjs
                                        .utc(trackingData?.timestamp[trackingData?.timestamp.length - 1].toString(), 'DDMMYYHHmmss')
                                        .local()
                                        .format('DD/MM/YYYY HH:mm:ss')}
                                </li>
                            </div>
                        </Popup>
                    )}
                </div>
            )}
        </div>
    )
})

export default RealtimeDrawWrapper
