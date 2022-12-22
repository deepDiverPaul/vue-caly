<template>
  <div class="w-full max-w-screen-sm mx-auto">
    <div class="text-center p-8 text-2xl">
      vue-caly
    </div>
    <div class="">
      <vue-caly v-model="date" />
    </div>
    <div class="mt-6">
      <pre>
        {{date}}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {VueCalyObject} from "@/plugin/VueCaly.d";
import {VueCaly} from '@/plugin'

const date = ref<VueCalyObject | null>(null)

</script>

<style>

</style>
