<template>
  <div class="w-screen h-screen p-10">
    <div class="w-full h-full bg-stone-100">
      <div class="w-full h-full p-5 overflow-scroll">
        <!-- vuedraggable component -->
        <vuedraggable 
          v-model="cards" 
          item-key="id" 
          group="timecards">
          <template #item="{element}">
            <TimeCard :key="element.id" />
          </template>
        </vuedraggable>
        <div class="flex">
          <font-awesome-icon :icon="['fas', 'plus']" @click="addCard"/>
          <font-awesome-icon :icon="['fas', 'minus']" @click="removeCard" class="ml-2"/>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import TimeCard from "./components/TimeCard.vue"
  import { ref } from 'vue'
  import vuedraggable from 'vuedraggable'
  
  export default {
    name: 'App',
    components: {
      TimeCard,
      vuedraggable
    },
    setup() {
      const cards = ref([])
  
      const addCard = () => {
        cards.value.push({ id: cards.value.length + 1 });
      }
  
      const removeCard = () => {
        cards.value.pop();
      }

      

  
      return {
        cards,
        addCard,
        removeCard,

      }
    }
  }
</script>


  