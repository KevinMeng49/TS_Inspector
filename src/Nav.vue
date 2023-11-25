<template>
    <input type="file" ref="fileInput" @change="handleFileChange"/>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Nav',
    setup() {
        const fileInput = ref(null);

        const handleFileChange = () => {
            if (fileInput.value && fileInput.value.files.length > 0) {
                const file = fileInput.value.files[0];
                const reader = new FileReader();

                reader.onload = (e) => {
                    try {
                        const json = JSON.parse(e.target.result);
                        // Now 'json' contains your JSON object
                        console.log(json);
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                };

                reader.onerror = (error) => {
                    console.error("Error reading file:", error);
                };

                reader.readAsText(file);
            }
        };

        return { fileInput, handleFileChange };
    }
}
</script>
