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

const useRealtimeFetch = (
    url: string,
    query: IQuery,
    mapRef: React.MutableRefObject<any>
) => {
    const [fetchNext, setFetchNext] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [lastIndex, setLastIndex] = useState(0)
    const [newData, setNewData] = useState<any>()
    const [trackingData, setTrackingData] = useState<any>({
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [],
            },
        },
    })

    async function getTrack() {
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

    useEffect(() => {
        if (isFetching) {
            getTrack().then((data) => {
                console.log('Data: ', data)
                setNewData(data)
            })
        }
    }, [isFetching, fetchNext])

    useEffect(() => {
        return () => {
            console.log("exit")
            setIsFetching(false)
        }
    }, [])

    useEffect(() => {
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

            setTrackingData((prevState: any) => {
                if (prevState) {
                    return {
                        type: 'geojson',
                        data: turf.lineString(
                            prevState?.data.geometry.coordinates.concat(
                                convertData
                            ),
                            {
                                accuracy: [
                                    prevState?.data?.properties?.accuracy,
                                    ...convertStatistic.accuracy,
                                ],
                                speed: [
                                    prevState?.data?.properties?.speed,
                                    ...convertStatistic.speed,
                                ],
                                timestamp: [
                                    prevState?.data?.properties?.timestamp,
                                    ...convertStatistic.timestamp,
                                ],
                            }
                        ),
                    }
                } else
                    return {
                        type: 'geojson',
                        data: turf.lineString(convertData, {
                            accuracy: convertStatistic.accuracy,
                            speed: convertStatistic.speed,
                            timestamp: convertStatistic.timestamp,
                        }),
                    }
            })
            mapRef?.current?.flyTo({
                center: [pointsData[0][1], pointsData[0][0]],
                essential: true,
            })
            setLastIndex(nextIndex)
            setFetchNext(!fetchNext)
        } else {
            setTimeout(() => {
                setLastIndex(lastIndex)
                setFetchNext(!fetchNext)
            }, 1000)
        }
    }, [newData])
    return [trackingData]
}

export default useRealtimeFetch
