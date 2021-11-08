import ReactECharts from 'echarts-for-react'
import { memo, useEffect } from 'react'
import customTooltip from './customTooltip'

const Chart = memo(({ taskData, setViewIndex, onEvents }: any) => {
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
    const options = {
        grid: { top: 70, right: 10, bottom: 24, left: 10 },
        xAxis: {
            data: taskData.xAxis || [],
            show: false,
        },
        yAxis: [
            {
                name: 'speed',
                show: false,
            },
            {
                show: false,
                name: 'distance',
            },
            {
                show: false,
                name: 'accuracy',
            },
        ],

        series: [
            {
                name: 'speed',
                data: taskData.speed || [],
                type: 'line',
                smooth: true,
            },
            {
                name: 'distance',
                yAxisIndex: 1,
                data: taskData.distance || [],
                type: 'line',
                smooth: true,
            },
            {
                name: 'accuracy',
                yAxisIndex: 2,
                data: taskData.accuracy || [],
                type: 'line',
                smooth: true,
            },
        ],
        tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {
                console.log(params[0].dataIndex)
                setViewIndex(params[0].dataIndex)
                return customTooltip(params);
            },
        },
        legend: {
            data: ['distance', 'speed', 'accuracy'],
            top: 10,
            left: 10,
            itemHeight: 20,
        },
    }

    return (
        <ReactECharts
            style={{ height: '100%', width: '100%' }}
            option={options}
            onEvents={onEvents}
        />
    )
})

export default Chart
