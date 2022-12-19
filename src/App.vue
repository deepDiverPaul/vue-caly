<template>
  <div class="w-full max-w-screen-sm mx-auto">
    <div class="text-center p-8 text-2xl">vue-caly</div>
    <div class="">
      <vue-caly v-model="date" />
    </div>
    <div class="">
      Date: {{date}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const date = ref<string | null>(null)

</script>

<style>

</style>
