import './index.css'
import { createContext, useEffect, useState } from 'react'
import * as turf from '@turf/turf'

import Mapbox from '../Mapbox'
import RecordInfo from './RecordInfo'
import useFetch from '../../../hooks/useFetch'
import Chart from './Chart'
import { ENDPOINT_URL } from '../../../app/config'
import { InputNumber } from 'antd'

export const ViewIndexContext = createContext<any>(null)

const RecordMap = ({ match }: any) => {
    const [recordData, setRecordData] = useState<any>([])
    const [drawData, setDrawData] = useState<any>()
    const [viewIndex, setViewIndex] = useState(0)
    const [viewWidth, setViewWidth] = useState(1)

    const [singleTaskResponse, isFetchingSingleTask, setRequestSingleTask] = useFetch({} as any)

    useEffect(() => {
        const query = {
            action: 'read',
            pk: match.params.id,
        }
        setRequestSingleTask({
            endPoint: ENDPOINT_URL + '/task/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            requestBody: query,
        })
    }, [])

    useEffect(() => {
        if (!isFetchingSingleTask && singleTaskResponse && singleTaskResponse.data && !singleTaskResponse.hasError) {
            let graphData: any = {
                distance: [],
                accuracy: [],
                timestamp: [],
                speed: [],
                xAxis: [],
            }
            let from
            let to = [0, 0]
            const points = singleTaskResponse.data?.positions || []
            let convertData: any[] = []
            points.forEach((point: any, index: number) => {
                const latitude = point[0]
                const longitude = point[1]
                const accuracy = point[3]
                const speed = point[4]
                const timestamp = point[5]

                const currentCoord = [longitude, latitude]
                convertData.push(currentCoord)
                from = to
                to = currentCoord
                if (index > 0) {
                    graphData.speed.push(speed)
                    graphData.accuracy.push(accuracy)
                    graphData.timestamp.push(timestamp)
                    graphData.distance.push(graphData.distance[graphData.distance.length - 1] ?? 0 + turf.distance(turf.point(from), turf.point(to)) * 1000)
                    graphData.xAxis.push(index)
                }
            })
            setRecordData(graphData)
            setDrawData(convertData)
            setViewIndex(convertData.length)
        }
    }, [singleTaskResponse])

    const handleChangeWidth = (value: number) => {
        setViewWidth(value)
    }

    return (
        <div className="record-view">
            <div className="record-control-container">
                <div className="record-map">
                    <ViewIndexContext.Provider value={{ viewIndex: viewIndex, viewWidth: viewWidth }}>
                        <Mapbox height="calc(70vh - 90px)" width="100%" viewDrawData={drawData} center={drawData ? drawData[0] : undefined} viewIndexContextKey={'record'}></Mapbox>
                    </ViewIndexContext.Provider>
                </div>

                <div className="record-control-chart">
                    <div className="record-map-select">
                        <span>Width: </span>
                        <InputNumber value={viewWidth} style={{ width: 100 }} onChange={handleChangeWidth} />
                    </div>
                    <Chart taskData={recordData} setViewIndex={setViewIndex} />
                </div>
            </div>

            <div className="record-graph">
                <ViewIndexContext.Provider value={{ viewWidth: viewWidth, setViewWidth: setViewWidth }}>
                    <RecordInfo data={recordData} taskData={singleTaskResponse?.data} />
                </ViewIndexContext.Provider>
            </div>
        </div>
    )
}

export default RecordMap
