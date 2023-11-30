<template>
<div class="w-screen h-screen p-10">
  <div class="w-full h-full bg-stone-100">
    <div class="w-full h-full p-5 overflow overflow-scroll">
      <TimeCard 
      v-for="index in cardNum" 
      :key="index"
      />
      <div class="flex">
        <!-- FontAwesome icon component -->
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

export default {
  name: 'App',
  components: {
    TimeCard
  },
  setup() {
    const cardNum = ref(0)

    const addCard = () => {
      cardNum.value++;
    }

    const removeCard = () => {
      cardNum.value--;
    }

    return {
      cardNum,
      addCard,
      removeCard
    }
  }
}
</script>

