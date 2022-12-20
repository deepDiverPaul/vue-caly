<template>
  <div class="w-full max-w-screen-sm mx-auto">
    <div class="text-center p-8 text-2xl">
      vue-caly
    </div>
    <div class="">
      <vue-caly v-model="date" />
    </div>
    <div class="">
      Date: {{date?.string}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {VueCalyObject} from "@/plugin/VueCaly.types";

const date = ref<VueCalyObject | null>(null)

</script>

<style>

</style>
