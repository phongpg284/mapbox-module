import { useEffect, useState } from 'react'
import * as turf from '@turf/turf'

interface IQuery {
    task_id: number
    device_id: number
}

interface IResData {
    gnss: string
    last_id: number
    positions: [[number, number, number, number, number, number]] | []
}

interface ITrackingData {
    coordinates: [number, number][]
    speed: number[]
    accuracy: number[]
    timestamp: number[]
}

async function getTrack(url: string, query: IQuery, lastIndex: number) {
    let data: IResData | undefined = undefined
    try {
        data = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                ...query,
                last_id: lastIndex,
            }),
        }).then((res) => res.json())
    } catch (error) {
        console.log(error)
    }
    return data
}

const useRealtimeFetch = (url: string, query: IQuery, mapRef: React.MutableRefObject<any>) => {
    const [fetchNext, setFetchNext] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [lastIndex, setLastIndex] = useState(0)
    const [newData, setNewData] = useState<any>()
    const [trackingData, setTrackingData] = useState<ITrackingData>({
        coordinates: [],
        speed: [],
        accuracy: [],
        timestamp: [],
    })

    useEffect(() => {
        if (isFetching) {
            getTrack(url, query, lastIndex).then((data) => {
                console.log('Data: ', data)
                setNewData(data)
            })
        }
    }, [isFetching, fetchNext])

    useEffect(() => {
        return () => {
            setTrackingData({
                coordinates: [],
                speed: [],
                accuracy: [],
                timestamp: [],
            })
            console.log('exit')
            setIsFetching(false)
        }
    }, [])

    useEffect(() => {
        if (newData) {
            const pointsData = newData?.positions
            if (pointsData && pointsData?.length !== 0) {
                const nextIndex = newData.last_id + 1

                let convertData: [number, number][] = []
                let convertStatistic: {
                    speed: number[]
                    accuracy: number[]
                    timestamp: number[]
                } = {
                    speed: [],
                    accuracy: [],
                    timestamp: [],
                }

                for (const point of pointsData) {
                    const latitude = point[0]
                    const longitude = point[1]
                    const accuracy = point[3]
                    const speed = point[4]
                    const timestamp = point[5]

                    convertData.push([longitude, latitude])
                    convertStatistic.accuracy.push(accuracy)
                    convertStatistic.speed.push(speed)
                    convertStatistic.timestamp.push(timestamp)
                }
                if (convertData.length > 20) {
                    setTrackingData((prevState: any) => {
                        if (prevState) {
                            return {
                                coordinates: [...prevState.coordinates, ...convertData],
                                accuracy: [...prevState.accuracy, ...convertStatistic.accuracy],
                                speed: [...prevState.speed, ...convertStatistic.speed],
                                timestamp: [...prevState.timestamp, ...convertStatistic.timestamp],
                            }
                        } else
                            return {
                                coordinates: convertData,
                                accuracy: convertStatistic.accuracy,
                                speed: convertStatistic.speed,
                                timestamp: convertStatistic.timestamp,
                            }
                    })
                    mapRef?.current?.flyTo({
                        center: convertData[convertData.length - 1],
                        essential: true,
                    })
                } else {
                    for (let i = 0; i < convertData.length; i++) {
                        setTrackingData((prevState: any) => {
                            if (prevState) {
                                return {
                                    coordinates: [...prevState.coordinates, convertData[i]],
                                    accuracy: [...prevState.accuracy, convertStatistic.accuracy[i]],
                                    speed: [...prevState.speed, convertStatistic.speed[i]],
                                    timestamp: [...prevState.timestamp, convertStatistic.timestamp[i]],
                                }
                            } else
                                return {
                                    coordinates: convertData,
                                    accuracy: convertStatistic.accuracy,
                                    speed: convertStatistic.speed,
                                    timestamp: convertStatistic.timestamp,
                                }
                        })
                        mapRef?.current?.flyTo({
                            center: convertData[i],
                            essential: true,
                        })
                    }
                }
                setLastIndex(nextIndex)
                setFetchNext(!fetchNext)
            } else {
                setTimeout(() => {
                    setFetchNext(!fetchNext)
                }, 1000)
            }
        }
    }, [newData])
    return [trackingData]
}

export default useRealtimeFetch
