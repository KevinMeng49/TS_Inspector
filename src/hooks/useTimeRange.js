import { ref } from 'vue'

const timeRange = ref([])

const useTimeRange = () => {

    const setTimeRange = (newTimeRange) => {
        timeRange.value =  newTimeRange
    }

    return {
        timeRange,
        setTimeRange
    }
}

export default useTimeRange