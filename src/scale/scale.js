import * as d3 from "d3"
import { getMax, getMin } from "../computation/computation"

export const scales = (data,width,height) => {
    //the format of data(single or multiple series):
    // {
    //     "Metric1": [
    //         {
    //             "Time": "2022-11-27",
    //             "value": 3
    //         },
    //         {
    //             "Time": "2022-11-28",
    //             "value": 4
    //         },
    //         {
    //             "Time": "2022-11-29",
    //             "value": 5
    //         }
    //     ],
    //     "Metric2": [
    //         {
    //             "Time": "2022-11-27",
    //             "value": 5
    //         },
    //         {
    //             "Time": "2022-11-28",
    //             "value": 6
    //         },
    //         {
    //             "Time": "2022-11-29",
    //             "value": 8
    //         }
    //     ]
    // }
    //suppose we have the same time range
    // console.log("check data")
    // console.log(data)
    const max = getMax(data)
    const min = getMin(data)
    //console.log(max)
    //console.log(min)

    const xScale = d3.scaleTime()
    .domain(d3.extent(Object.values(data)[0], d => d.Time)) 
    .range([40, width -10])

    const yScale = d3.scaleLinear()
        .domain([min, max])
        .range([height - 20, 10])

    return { xScale,yScale }
}