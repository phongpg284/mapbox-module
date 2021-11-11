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
            console.log(nextIndex, pointsData.length)

            let convertData: any[] = []
            for (const point of pointsData) {
                convertData.push([point[1], point[0]])
            }

            updateTracking((prevState: any) => {
                if (prevState) {
                    return {
                        type: 'geojson',
                        data: turf.lineString(
                            prevState?.data.geometry.coordinates.concat(
                                convertData
                            )
                        ),
                    }
                } else
                    return {
                        type: 'geojson',
                        data: turf.lineString(convertData),
                    }
            })
            GetRealtimeData(nextIndex, url, query, updateTracking, mapRef)
        } else {
            setTimeout(() => {
                GetRealtimeData(lastIndex, url, query, updateTracking, mapRef)
            }, 700)
        }
    }
}

export default GetRealtimeData
