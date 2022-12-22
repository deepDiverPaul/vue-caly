<template>
  <div class="w-full max-w-screen-sm mx-auto">
    <div class="text-center p-8 text-2xl">
      🐭 vue-caly
    </div>
    <div class="">
      <vue-caly :freeDates="freeDates" v-model="date" :duration="45" :gap="50" :pause="20" />
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
import useSlotGenerator from "@/plugin/composables/useSlotGenerator";

const date = ref<VueCalyObject | null>(null)

const freeDates = [...useSlotGenerator([
  {
    days: [1,2,3,4,5],
    times: [
      [
        [9,30],[12,30]
      ],
      [
        [13,30],[18,30]
      ]
    ],
    // start: new Date('2022-12-24'),
    start: new Date(),
    end: new Date('2023-02-02'),
    gmtOffset: 8
  }
]),
  {
    start: {
      dateTime: '2022-12-27T10:00:00+08:00'
    },
    end: {
      dateTime: '2022-12-27T10:30:00+08:00'
    }
  }
]



</script>

<style>

</style>
