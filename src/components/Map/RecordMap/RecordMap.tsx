import './index.css'
import { createContext, useEffect, useState } from 'react'
import * as turf from '@turf/turf'

import Mapbox from '../Mapbox'
import RecordInfo from './RecordInfo'
import useFetch from '../../../hooks/useFetch'
import Chart from './Chart'

export const ViewIndexContext = createContext<any>(null)

const RecordMap = ({ match }: any) => {
    const [recordData, setRecordData] = useState<any>([])
    const [drawData, setDrawData] = useState<any>()
    const [viewIndex, setViewIndex] = useState(0)

    const [singleTaskResponse, isFetchingSingleTask, setRequestSingleTask] =
        useFetch({} as any)

    useEffect(() => {
        const query = {
            action: 'read',
            pk: match.params.id,
        }
        setRequestSingleTask({
            endPoint: 'https://dinhvichinhxac.online/api/task/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            requestBody: query,
        })
    }, [])

    useEffect(() => {
        if (
            !isFetchingSingleTask &&
            singleTaskResponse &&
            singleTaskResponse.data &&
            !singleTaskResponse.hasError
        ) {
            let graphData = {
                distance: [0],
                accuracy: [0],
                speed: [0],
                xAxis: [0],
            }
            let from
            let to = [0, 0]
            const points = singleTaskResponse.data?.positions || []
            let convertData: any[] = []
            points.forEach((point: any, index: number) => {
                const latitude = point[0];
                const longitude = point[1];
                const accuracy = point[3];
                const speed = point[4];
                const timestamp = point[5];

                const currentCoord = [longitude, latitude]
                convertData.push(currentCoord)
                from = to
                to = currentCoord
                if (index > 0) {
                    graphData.speed.push(speed)
                    graphData.accuracy.push(accuracy)
                    graphData.distance.push(
                        graphData.distance[graphData.distance.length - 1] +
                            turf.distance(turf.point(from), turf.point(to)) *
                                1000
                    )
                    graphData.xAxis.push(index)
                }
            })
            setRecordData(graphData)
            setDrawData(convertData)
            setViewIndex(convertData.length)
        }
    }, [singleTaskResponse])

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
                            viewIndexContextKey={"record"}
                        ></Mapbox>
                    </ViewIndexContext.Provider>
                </div>

                <div className="record-control-chart">
                    <Chart taskData ={recordData} setViewIndex={setViewIndex} />
                </div>
            </div>

            <div className="record-graph">
                <RecordInfo data={recordData} />
            </div>
        </div>
    )
}

export default RecordMap
