import { memo } from 'react'
import ReactECharts from 'echarts-for-react'
import customTooltip from './customTooltip'
import dayjs from "dayjs"
var customParseFormat = require('dayjs/plugin/customParseFormat')

var utc = require('dayjs/plugin/utc')
dayjs.extend(customParseFormat)
dayjs.extend(utc)

const Chart = memo(({ taskData, setViewIndex, onEvents }: any) => {
    console.log(taskData);
    
    const options = {
        grid: { top: 70, right: 10, bottom: 24, left: 22 },
        xAxis: {
            data: taskData.timestamp?.map((time: number) => dayjs.utc(time.toString(),"DMMYYHHmmss").local().format("HH:mm:ss")) || [],
            // show: false,
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
            {
                show: false,
                name: 'timestamp',
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
            {
                name: 'Thời gian',
                yAxisIndex: 3,
                data: taskData.timestamp || [],
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                itemStyle: {
                    opacity: 0
                }
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
