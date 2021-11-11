import { memo, useContext, useEffect, useRef, useState } from 'react'
import { Feature, Image, Layer, Popup, Source } from 'react-mapbox-gl'
import * as turf from '@turf/turf'

import TrackingInfo from '../TrackingInfo/TrackingInfo'

import PaintScaleView from '../../../../utils/PaintScaleView'
import GetRealtimeData from '../../../../utils/GetRealtimeData'
import { TrackingDataContext } from '../../RealtimeMap/RealtimeMap'

interface IRealtimeDrawWrapperProps {
    endpoint: string
    query: {
        device_id: number
        task_id: number
    }
    zoom?: number
}

const RealtimeDrawWrapper = memo(({ zoom }: any) => {
    const data = useContext(TrackingDataContext)
    return (
        <div>
            <Source id={`device`} geoJsonSource={data} />
            <Layer
                type="line"
                id={`device`}
                sourceId={`device`}
                paint={PaintScaleView(1, zoom || 16)}
            />

            <Image
                id={`device-icon`}
                url="https://i.ibb.co/WP8VqMv/3.png"
                options={{ pixelRatio: 4 }}
            />

            {data?.data?.geometry?.coordinates.length > 0 && (
                <div>
                    <Layer
                        type="symbol"
                        id={`marker`}
                        layout={{ 'icon-image': `device-icon` }}
                    >
                        <Feature
                            coordinates={
                                data.data.geometry.coordinates[
                                    data.data.geometry.coordinates.length - 1
                                ]
                            }
                            // onClick={() => setShowPopup(!showPopup)}
                        />
                    </Layer>
                    {/* {showPopup && (
                        <Popup
                            coordinates={
                                trackingData.data.geometry.coordinates[
                                    trackingData.data.geometry.coordinates
                                        .length - 1
                                ]
                            }
                        >
                            <div>
                                Coordinates:
                                {
                                    trackingData.data.geometry.coordinates[
                                        trackingData.data.geometry.coordinates
                                            .length - 1
                                    ]
                                }
                            </div>
                        </Popup>
                    )} */}
                </div>
            )}
        </div>
    )
})

export default RealtimeDrawWrapper
