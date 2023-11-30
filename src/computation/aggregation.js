export const aggregate_hourly = (data)=>{
    const result = {};

    for (const metric in data) {
        data[metric].forEach(entry => {
            const date = new Date(entry.Time);
            const hourKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;

            if (!result[metric]) {
                result[metric] = {};
            }

            if (!result[metric][hourKey]) {
                result[metric][hourKey] = { sum: 0, count: 0 };
            }

            result[metric][hourKey].sum += parseFloat(entry.value);
            result[metric][hourKey].count++;
        });
    }

    // Calculating average
    for (const metric in result) {
        for (const key in result[metric]) {
            result[metric][key] = result[metric][key].sum / result[metric][key].count;
        }
    }

    return result;
}


export const aggregate_daily = (data) => {
    const result = {};

    for (const metric in data) {
        data[metric].forEach(entry => {
            const date = new Date(entry.Time);
            const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

            if (!result[metric]) {
                result[metric] = {};
            }

            if (!result[metric][dayKey]) {
                result[metric][dayKey] = { sum: 0, count: 0 };
            }

            result[metric][dayKey].sum += parseFloat(entry.value);
            result[metric][dayKey].count++;
        });
    }

    // Calculating average
    for (const metric in result) {
        for (const key in result[metric]) {
            result[metric][key] = result[metric][key].sum / result[metric][key].count;
        }
    }

    return result;
}


