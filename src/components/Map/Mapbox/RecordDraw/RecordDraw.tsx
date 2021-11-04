import { useContext, useEffect, useState } from 'react'
import { Layer, Marker, Source } from 'react-mapbox-gl'
import * as turf from '@turf/turf'

import PaintScaleView from '../../../../utils/PaintScaleView'
import { ViewIndexContext as TaskViewIndex } from '../../TaskMap/TaskMap'
import { ViewIndexContext as RecordViewIndex } from '../../RecordMap/RecordMap'

const RecordDraw = ({ data, zoom, multiple, viewIndexContextKey }: any) => {
    const [displayDrawData, setDisplayDrawData] = useState<any>({
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [],
            },
        },
    })
    const [deviceCoordinate, setDeviceCoordinate] = useState([100, 20])
    const { viewIndex, viewWidth } = useContext(
        viewIndexContextKey === 'record' ? RecordViewIndex : TaskViewIndex
    )

    useEffect(() => {
        if (data && data.length > 1)
            setDisplayDrawData({
                type: 'geojson',
                data: turf.lineString(data),
            })
        if (data && data.length >= 1) setDeviceCoordinate(data[data.length - 1])
    }, [])

    useEffect(() => {
        const showPoint = data.slice(0, viewIndex + 1)
        if (showPoint.length >= 2) {
            setDisplayDrawData({
                type: 'geojson',
                data: turf.lineString(showPoint),
            })
            setDeviceCoordinate(showPoint[viewIndex - 1])
        } else if (showPoint.length === 1) {
            setDisplayDrawData({
                type: 'geojson',
                data: turf.point(showPoint[0]),
            })
            setDeviceCoordinate(showPoint[0])
        }
    }, [viewIndex])

    return (
        <div>
            <Source id="view-device" geoJsonSource={displayDrawData} />
            <Layer
                type="line"
                id="view-device"
                sourceId="view-device"
                paint={PaintScaleView(viewWidth, zoom)}
            />
            <Marker coordinates={deviceCoordinate} anchor="center">
                <img
                    src="https://i.ibb.co/WP8VqMv/3.png"
                    style={{ height: '40px' }}
                />
            </Marker>
        </div>
    )
}

export default RecordDraw
