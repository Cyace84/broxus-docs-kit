<template>
  <div class="demo">
    <div>
      <label for="name">Name:</label>
      <input id="name" type="text" v-model="user.name" />
    </div>
    <div>
      <label for="age">Age:</label>
      <input id="age" type="number" v-model="user.age" />
    </div>
    <button @click="packData">Pack Data</button>
    <pre v-if="packedData">{{ packedData }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const user = ref({
      name: "",
      age: null,
    });

    const packedData = ref("");

    function packData() {
      packedData.value = JSON.stringify(user.value, null, 2);
    }

    return {
      user,
      packedData,
      packData,
    };
  },
});
</script>
