import './index.css'
import { createContext, useEffect, useState } from 'react'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import * as turf from '@turf/turf'

import Mapbox from '../Mapbox'
import RecordInfo from '../RecordMap/RecordInfo'
import { useLocation } from 'react-router'
import CustomizeDot from '../RecordMap/CustomizeDot'
import useFetch from '../../../hooks/useFetch'

export const ViewIndexContext = createContext<any>(null)

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
            let graphData = [
                {
                    distance: 0,
                    accuracy: 0,
                    speed: 0,
                },
            ]
            let from
            let to = [0, 0]
            const points = singleTaskResponse.data?.positions || [];
            let convertData: any[] = []
            points.forEach((point: any, index: number) => {
                const currentCoord = [point.longitude, point.latitude]
                convertData.push(currentCoord)
                from = to
                to = currentCoord
                if (index > 0) {
                    graphData.push({
                        distance:
                            graphData[graphData.length - 1].distance +
                            turf.distance(turf.point(from), turf.point(to)) *
                                1000,
                        speed: point.speed,
                        accuracy: point.accuracy,
                    })
                }
            })            
            setTaskData(graphData)
            setDrawData(convertData)
            setViewIndex(convertData.length)
        }
    }, [singleTaskResponse])

    // useEffect(() => {
    //     const getTasks = async () => {
    //         let data
    //         try {
    //             const res = await fetch(
    //                 'https://dinhvichinhxac.online/api/task/',
    //                 {
    //                     method: 'GET',
    //                 }
    //             )
    //             data = await res.json()
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         return data.response
    //     }

    //     const tasks = await getTasks()
    //     let tasksId: any[] = []
    //     tasks.forEach((task: any) => {
    //         if (task.device_id.toString() === id) {
    //             tasksId.push(task.id)
    //         }
    //     })

    //     const getTaskData = async () => {
    //         // let asyncJob: any[] = []
    //         // try {
    //         //     tasksId.forEach((id: number) => {
    //         //         const query = {
    //         //             action: 'read',
    //         //             pk: id,
    //         //         }
    //         //         const job = fetch(
    //         //             'https://dinhvichinhxac.online/api/task/',
    //         //             {
    //         //                 method: 'POST',
    //         //                 body: JSON.stringify(query),
    //         //                 headers: {
    //         //                     'Content-Type': 'application/json',
    //         //                 },
    //         //             }
    //         //         ).then((res) => res.json())
    //         //         asyncJob.push(job)
    //         //     })
    //         // } catch (error) {
    //         //     console.log(error)
    //         // }
    //         // const result = await Promise.all(asyncJob)
    //         setTaskIdOption(tasksId)
    //     }
    //     getTaskData()
    // }, [])

    const handleClick = (e: any) => {
        if (e.isTooltipActive) setViewIndex(e.activeLabel)
        // console.log(e)
        // console.log('click')
    }

    return (
        <div className="task-view">
            <div className="task-control-container">
                <div className="task-map">
                    <ViewIndexContext.Provider value={viewIndex}>
                        <Mapbox
                            height="calc(70vh - 70px)"
                            width="100%"
                            viewDrawData={drawData}
                            multiple
                            center={drawData?.[0]}
                        ></Mapbox>
                    </ViewIndexContext.Provider>
                </div>
                <div className="task-control-chart">
                    <ResponsiveContainer width="100%" height="100%">
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

                            {/* <CartesianGrid stroke="#ccc" /> */}
                            {/* <XAxis dataKey="name" /> */}
                            {/* <YAxis /> */}
                            {/* <Tooltip /> */}
                            <Legend
                                verticalAlign="top"
                                align="left"
                                iconSize={30}
                                height={50}
                            />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="task-graph">
                <RecordInfo
                    data={taskData}
                    options={taskIdOption}
                    changeSelectTask={setSelectedTask}
                />
            </div>
        </div>
    )
}

export default TaskMap
