export const getMax = (manySeries) => {
    let max = -Infinity;

    for (const series in manySeries) {
        const seriesMax = Math.max(...manySeries[series].map(item => item.value));
        if (seriesMax > max) {
            max = seriesMax;
        }    
    }
    return max;
}

export const filterDataByTimeRange = (data,timeRange) => {
    let filteredData = {}
    Object.keys(data).forEach(metric => {
        filteredData[metric] = data[metric].filter(d => {
            return d.Time >= timeRange[0] && d.Time <= timeRange[1]
        })
    })

    return filteredData
}






export const getTimeStamp = (xCoordinate, xScale) => {
    return xScale.invert(xCoordinate - 40 ) 
}


//to be debugged
export const getValues = (data, timeStamp) => {
    const values = {}
    values["TimeStamp"] = timeStamp


    const timeStampDate = new Date(timeStamp);

    for(const variable in data) {
        const obj = data[variable].filter(item => {
            const itemDate = new Date(item.Time)
            return itemDate == timeStampDate;
        })
        console.log("check obj")
        console.log(obj)
        values[variable] = obj[0]?.value??""
    }

    console.log("check values");
    console.log(values);
    return values;
}
