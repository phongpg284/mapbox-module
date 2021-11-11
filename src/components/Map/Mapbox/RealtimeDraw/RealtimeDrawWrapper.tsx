/* eslint-disable react/jsx-no-comment-textnodes */
import { memo, useContext, useState } from 'react'
import { Feature, Image, Layer, Popup, Source } from 'react-mapbox-gl'

import PaintScaleView from '../../../../utils/PaintScaleView'
import { TrackingDataContext } from '../../RealtimeMap/RealtimeMap'

import dayjs from "dayjs"
var customParseFormat = require('dayjs/plugin/customParseFormat')
var utc = require('dayjs/plugin/utc')
dayjs.extend(customParseFormat,)
dayjs.extend(utc)
interface IRealtimeDrawWrapperProps {
    zoom?: number
}

const RealtimeDrawWrapper: React.FC<IRealtimeDrawWrapperProps> = memo(
    ({ zoom }: any) => {
        const data = useContext(TrackingDataContext)
        const [showPopup, setShowPopup] = useState(false)
        
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
                                    data?.data?.geometry?.coordinates[
                                        data?.data?.geometry?.coordinates
                                            ?.length - 1
                                    ]
                                }
                                onMouseEnter={() => setShowPopup(true)}
                                onMouseLeave={() => setShowPopup(false)}
                            />
                        </Layer>
                        {showPopup && (
                            <Popup
                                coordinates={
                                    data?.data?.geometry?.coordinates[
                                        data?.data?.geometry?.coordinates
                                            .length - 1
                                    ]
                                }
                            >
                                <div className="text-start">
                                    <li>
                                        Kinh độ: {data?.data?.geometry?.coordinates[data?.data?.geometry?.coordinates.length - 1][1]}
                                    </li>
                                    <li>
                                        Vĩ độ: {data?.data?.geometry?.coordinates[data?.data?.geometry?.coordinates.length - 1][0]}
                                    </li>
                                    <li>
                                        Tốc độ: {data?.data?.properties?.speed[data?.data?.properties?.speed.length - 1]} km/h
                                    </li>
                                    <li>
                                        Độ chính xác: {data?.data?.properties?.accuracy[data?.data?.properties?.accuracy.length - 1]} cm
                                    </li>
                                    <li>
                                        Thời gian: {dayjs.utc(data?.data?.properties?.timestamp[data?.data?.properties?.timestamp.length - 1].toString(),"DDMMYYHHmmss").local().format('DD/MM/YYYY HH:mm:ss')} 
                                    </li>
                                </div>
                            </Popup>
                        )}
                    </div>
                )}
            </div>
        )
    }
)

export default RealtimeDrawWrapper
