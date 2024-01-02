import * as d3 from "d3"


const lineGenerator = (xScale, yScale) => {
    return d3.line()
    .x(d => xScale(d.Time))
    .y(d => yScale(d.value))
    // .curve(d3.curveBasis)
}

export const generatePath = (data,xScale, yScale) => {
    return lineGenerator(xScale,yScale)(data)
}

