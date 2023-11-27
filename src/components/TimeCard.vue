<template>
    <div class="w-full h-1/5 rounded-md my-5 relative">
        <input type="file" id="fileInput" ref="fileInput" style="display: none;" @change="handleFileChange" />
        <font-awesome-icon 
            :icon="['fas', 'file-import']" 
            class="ml-2 mt-2 cursor-pointer absolute top-0 left-0 z-10 hover:bg-blue-200 p-1 rounded-md" 
            @click="triggerFileInput" />
        <svg 
        class="w-full h-full bg-blue-100 rounded-md" 
        ref="svgRef"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
        @mousemove="handleMouseMove"
        >
            <path 
                v-for="(num,index) in visibleVariables.length" 
                :key="num"
                :d="generatePath(Object.values(selectedData)[index],xScale,yScale)"
                fill="none"
                :stroke="interpolatePurples((index+1) / visibleVariables.length)"
                stroke-width="2"
                class="linechart cursor-pointer" 
            >
            </path>
            <g ref="xAxisRef" :transform="`translate(40, ${cardHeight - 20})`"></g>
            <g ref="yAxisRef" style="display: none;" transform="translate(10,0)"></g>
            <g>
                <line 
                v-if="dotLineVisible"
                :x1 = "mouseX"
                :y1 = yScale(0)
                :x2 = "mouseX"
                :y2 = getMax(selectedData)
                stroke = "#bdbdbd"
                stroke-width = "3"
                stroke-dasharray = "10"
                />
                <text></text>
            </g>
        

            
        </svg>
        <a-dropdown :open="isDropdownVisible" class="absolute top-0 right-0 mr-1 mt-1">
            <template #overlay>
                <a-menu class="overflow-y overflow-scroll max-h-300px">
                    <a-menu-item v-for="(variable, index) in variableCollection" :key="index">
                        <a-checkbox @change="handleCheckboxChange(variable, $event)">{{ variable }}</a-checkbox>
                    </a-menu-item>
                </a-menu>
            </template>
            <a-button @click="toggleDropdown">
                <template v-if="isDropdownVisible">
                    Select Branches <UpOutlined />
                </template>
                <template v-else>
                    Select Branches <DownOutlined />
                </template>
            </a-button>
        </a-dropdown>
    </div>
</template>

<script>
import { ref, computed, onMounted, watchEffect  } from 'vue'
import { Dropdown, Menu, Checkbox, Button } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'

import { scales } from "../scale/scale"
import { generatePath } from "../generator/generator"

import { interpolatePurples } from 'd3-scale-chromatic';
import * as d3 from "d3" 

import { getMax } from '../computation/computation'


export default {
    name: "TimeCard",
    components: {
        'a-dropdown': Dropdown,
        'a-menu': Menu,
        'a-menu-item': Menu.Item,
        'a-checkbox': Checkbox,
        'a-button': Button,
        DownOutlined, 
        UpOutlined
    },
    setup() {
        const fileInput = ref(null)
        const fileData = ref({})
        const visibleVariables = ref([])
        const isDropdownVisible = ref(false)

        const cardWidth = ref(0)
        const cardHeight = ref(0)
        const svgRef = ref(null)

        const xAxisRef = ref(null)
        const yAxisRef = ref(null)

        const dotLineVisible = ref(false)
        const mouseX = ref(0)

        onMounted(() => {
            if (svgRef.value) {
                cardWidth.value = svgRef.value.clientWidth
                cardHeight.value = svgRef.value.clientHeight
            }    
        })

        const triggerFileInput = () => {
            fileInput.value.click();
        };

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {              
                    const rawData = JSON.parse(e.target.result);

                    // Transform each metric series
                    Object.keys(rawData).forEach(metric => {
                        rawData[metric] = transformData(rawData[metric]);
                    });

                    fileData.value = rawData
                    console.log(fileData.value)
                    
                };
                reader.readAsText(file);
            }
        };

        const handleCheckboxChange = (variable, event) => {
            if (event.target.checked) {
                visibleVariables.value.push(variable);
            } else {
                const index = visibleVariables.value.indexOf(variable);
                if (index > -1) {
                    visibleVariables.value.splice(index, 1);
                }
            }
            // console.log("change!")
            // console.log(visibleVariables.value)
        };

        const toggleDropdown = () => {
            isDropdownVisible.value = !isDropdownVisible.value;
        };

        const handleMouseOver = (event) => {
            dotLineVisible.value = true
            const bounds = svgRef.value.getBoundingClientRect();
            mouseX.value = event.clientX - bounds.left;
        }

        const handleMouseMove = (event) => {
            const bounds = svgRef.value.getBoundingClientRect();
            mouseX.value = event.clientX - bounds.left;
        }

        const handleMouseLeave = () => {
            dotLineVisible.value = false
        }

        const variableCollection = computed(() => {
            return Object.keys(fileData.value??{})
        })

        const selectedData = computed(() => {
            let filteredData = {};
            if (visibleVariables.value.length > 0) {
                visibleVariables.value.forEach(variable => {
                    if (fileData.value[variable]) {
                        filteredData[variable] = fileData.value[variable];
                    }
                });
            }
            // filteredData = JSON.parse(JSON.stringify(filteredData))
            // console.log("filteredData")
            // console.log(filteredData)
            return filteredData;
        });


        const transformData = (rawData) => {
            return rawData.map(data => {
                data.Time = new Date(data.Time);
                data.value = data.value === '-' ? 0 : Number(data.value);
                return data;
            });
        }

        const xScale = computed(()=>{
                return scales(selectedData.value,cardWidth.value,cardHeight.value).xScale  
        })

        const yScale = computed(()=>{
                return scales(selectedData.value,cardWidth.value,cardHeight.value).yScale  
        })

        watchEffect(() => {
            if (xAxisRef.value) {
                const xAxis = d3.axisBottom(xScale.value);
                d3.select(xAxisRef.value).call(xAxis);
            }

            if (yAxisRef.value) {
                const yAxis = d3.axisRight(yScale.value);
                d3.select(yAxisRef.value).call(yAxis);
            }
        });

        return { 
            fileInput, 
            fileData, 
            svgRef,
            isDropdownVisible,
            triggerFileInput, 
            handleFileChange,
            handleCheckboxChange,
            toggleDropdown,
            variableCollection,
            visibleVariables,
            selectedData,
            cardHeight,
            xScale,
            yScale,
            xAxisRef,
            yAxisRef,
            mouseX,
            getMax,
            generatePath,
            interpolatePurples,
            handleMouseOver,
            handleMouseMove,
            handleMouseLeave,
            dotLineVisible
        }
    }
}
</script>

<style scoped>
.linechart:hover {
    stroke-width: 4;
    stroke:#F3C212

}
</style>


