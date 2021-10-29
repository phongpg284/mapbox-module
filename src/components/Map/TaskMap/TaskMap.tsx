import './index.css'
import { createContext, useCallback, useEffect, useState } from 'react'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import * as turf from '@turf/turf'

import Mapbox from '../Mapbox'
import RecordInfo from '../RecordMap/RecordInfo'
import { useLocation } from 'react-router'
import useFetch from '../../../hooks/useFetch'
import Chart from '../RecordMap/Chart'

export const ViewIndexContext = createContext<any>(null)

const fakeData = []
const fakeData1 = []
const fakeData2 = []
const fakeAxis = []

for (let i = 0; i < 700; i++) {
    fakeData.push(i)
    fakeData1.push(1000 * Math.random())
    fakeData2.push(2)
    fakeAxis.push('')
}

const TaskMap = ({ match }: any) => {
    const location = useLocation()
    const arr = location.pathname.split('/')
    const id = arr[arr.length - 2]

    const [taskData, setTaskData] = useState<any>([])
    const [taskIdOption, setTaskIdOption] = useState<any[]>([])
    const [drawData, setDrawData] = useState<any>([])
    const [viewIndex, setViewIndex] = useState(0)

    

    const [selectedTask, setSelectedTask] = useState(-1)

    const [tasksResponse, isFetchingAllTask, setRequestAllTask] = useFetch(
        {} as any
    )
    const [singleTaskResponse, isFetchingSingleTask, setRequestSingleTask] =
        useFetch({} as any)

    useEffect(() => {
        setRequestAllTask({
            endPoint: 'https://dinhvichinhxac.online/api/task/',
            method: 'GET',
        })
    }, [])

    useEffect(() => {
        if (
            !isFetchingAllTask &&
            tasksResponse &&
            tasksResponse.data &&
            !tasksResponse.hasError
        )
            setTaskIdOption(
                tasksResponse.data
                    .map((task: any) => ({
                        id: task.id,
                        deviceId: task.device_id,
                    }))
                    .filter((taskId: any) => taskId.deviceId.toString() === id)
                    .map((task: any) => task.id)
            )
    }, [tasksResponse])

    useEffect(() => {
        const query = {
            action: 'read',
            pk: selectedTask,
        }
        if (selectedTask >= 0)
            setRequestSingleTask({
                endPoint: 'https://dinhvichinhxac.online/api/task/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                requestBody: query,
            })
    }, [selectedTask])

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
                const currentCoord = [point.longitude, point.latitude]
                convertData.push(currentCoord)
                from = to
                to = currentCoord
                if (index > 0) {
                    graphData.speed.push(point.speed)
                    graphData.accuracy.push(point.accuracy)
                    graphData.distance.push(
                        graphData.distance[graphData.distance.length - 1] +
                            turf.distance(turf.point(from), turf.point(to)) *
                                1000
                    )
                    graphData.xAxis.push(index)
                }
            })
            setTaskData(graphData)
            setDrawData(convertData)
            setViewIndex(convertData.length)
        }
    }, [singleTaskResponse])

    return (
        <div className="task-view">
            <div className="task-control-container">
                <div className="task-map">
                    <ViewIndexContext.Provider value={viewIndex}>
                        <Mapbox
                            height="calc(70vh - 85px)"
                            width="100%"
                            viewDrawData={drawData}
                            multiple
                            center={drawData?.[0]}
                        ></Mapbox>
                    </ViewIndexContext.Provider>
                </div>
                <div className="task-control-chart">
                    {/* <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            onMouseMove={handleClick}
                            margin={{
                                top: 20,
                                bottom: 30,
                                left: 20,
                                right: 20,
                            }}
                            data={taskData}
                        >
                            <Line
                                yAxisId="1"
                                stroke="#8884d8"
                                strokeWidth={3}
                                dataKey="distance"
                                type="monotone"
                                dot={<CustomizeDot color="#8884d8" />}
                                activeDot={{ r: 5 }}
                            />
                            <Line
                                yAxisId="2"
                                stroke="#FFAD46"
                                strokeWidth={3}
                                dataKey="speed"
                                type="monotone"
                                dot={<CustomizeDot color="#FFAD46" />}
                                activeDot={{ r: 5 }}
                            />
                            <Line
                                yAxisId="3"
                                stroke="#00ff08"
                                strokeWidth={3}
                                dataKey="accuracy"
                                type="monotone"
                                dot={<CustomizeDot color="#00ff08" />}
                                activeDot={{ r: 5 }}
                            />
                            <CartesianGrid stroke="#ccc" /> 
                            <XAxis dataKey="name" /> 
                            <YAxis /> 
                            <Tooltip /> 
                            <Legend
                                verticalAlign="top"
                                align="left"
                                iconSize={30}
                                height={50}
                            />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer> */}
                    <Chart taskData ={taskData} setViewIndex={setViewIndex} />
                </div>
            </div>
            <div className="task-graph">
                <RecordInfo
                    data={taskData}
                    options={taskIdOption}
                    changeSelectTask={setSelectedTask}
                    isFetching={isFetchingSingleTask}
                />
            </div>
        </div>
    )
}

export default TaskMap
