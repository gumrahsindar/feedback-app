<script setup lang="ts">
import { TFeedbackItems } from "../types"

defineProps<{
  item: TFeedbackItems
}>()
</script>

<template>
  <li class="feedback">
    <button>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
      </svg>
      <span>{{ item.upvoteCount }}</span>
    </button>
    <div>
      <p>{{ item.badgeLetter }}</p>
    </div>
    <div>
      <p>{{ item.company }}</p>
      <p>
        {{ item.text }}
      </p>
    </div>

    <p>{{ item.daysAgo }}d</p>
  </li>
</template>

<style scoped></style>
