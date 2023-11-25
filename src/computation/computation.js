export const getMax = (manySeries) => {
    let max = -Infinity;

    for (const series in manySeries) {
        if (manySeries.hasOwnProperty(series)) {
            const seriesMax = Math.max(...manySeries[series].map(item => item.value));
            if (seriesMax > max) {
                max = seriesMax;
            }
        }
    }
    return max;
};
