<template>
  <div class="w-screen h-screen p-10">
    <div class="w-full h-full bg-stone-100">
      <div class="w-full h-full p-5 overflow-scroll">
        <!-- vuedraggable component -->
        <vuedraggable 
          :list="cards" 
          item-key="id" 
          group="timecards"
          @end="updateCards">
          <template #item="{element}">
            <TimeCard :key="element.id" :cardID = "element.id"/>
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
  import { computed } from 'vue'
  import { useStore } from "vuex"
  import vuedraggable from 'vuedraggable'
  
  export default {
    name: 'App',
    components: {
      TimeCard,
      vuedraggable
    },
    setup() {
      const store = useStore()
      const cards = computed({
        get: () => store.getters.Cards,
        set: newValue => store.dispatch('updateCards', newValue)
      })

      const updateCards = (event) => {
        store.dispatch('updateCards',event)
      }
  
      const addCard = () => {
        store.dispatch("addCard")
      }
  
      const removeCard = () => {
        store.dispatch("removeCard")
      }

      return {
        cards,
        addCard,
        removeCard,
        updateCards,

      }
    }
  }
</script>


  