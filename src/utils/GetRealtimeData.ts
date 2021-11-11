// @ts-ignore
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

/**
 *
 * @param lastIndex Last index fetch from api
 * @param url URL
 * @param query task_id and device_id
 * @param updateTracking update updateTracking state
 * @param deviceId deviceID
 */
async function GetRealtimeData(
    lastIndex: number,
    url: string,
    query: IQuery,
    updateTracking: any,
    mapRef: any
) {
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
    if (data) {
        console.log(data)
        const pointsData = data.positions
        if (pointsData && pointsData?.length !== 0) {
            const nextIndex = data.last_id + 1

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

            updateTracking((prevState: any) => {
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
            if (lastIndex === 0) {
                mapRef?.current?.flyTo({
                    center: [pointsData[0][1], pointsData[0][0]],
                    essential: true,
                })
            }
            GetRealtimeData(nextIndex, url, query, updateTracking, mapRef)
        } else {
            setTimeout(() => {
                GetRealtimeData(lastIndex, url, query, updateTracking, mapRef)
            }, 700)
        }
    }
}

export default GetRealtimeData
