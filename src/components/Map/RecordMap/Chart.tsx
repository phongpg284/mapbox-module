import { memo } from 'react'
import ReactECharts from 'echarts-for-react'
import customTooltip from './customTooltip'

const Chart = memo(({ taskData, setViewIndex, onEvents }: any) => {
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
                name: 'Vận tốc',
                data: taskData.speed || [],
                type: 'line',
                smooth: true,
            },
            {
                name: 'Quãng đường',
                yAxisIndex: 1,
                data: taskData.distance || [],
                type: 'line',
                smooth: true,
            },
            {
                name: 'Độ chính xác',
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
                return customTooltip(params)
            },
        },
        legend: {
            data: [
                { name: 'Quãng đường', textStyle: { fontFamily: 'sans-serif' } },
                { name: 'Vận tốc', textStyle: { fontFamily: 'sans-serif' } },
                { name: 'Độ chính xác', textStyle: { fontFamily: 'sans-serif' } },
            ],
            top: 10,
            left: 10,
            itemHeight: 20,
        },
    }

    return <ReactECharts style={{ height: '100%', width: '100%' }} option={options} onEvents={onEvents} />
})

export default Chart
