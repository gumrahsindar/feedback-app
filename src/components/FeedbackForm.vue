<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { MAX_CHARS } from "../lib/constants"

const feedback = ref("")
const inputRef = ref<HTMLTextAreaElement | null>(null)

const remainingCharacters = computed(() => MAX_CHARS - feedback.value.length)

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  if (target.value.length > MAX_CHARS) {
    target.value = target.value.slice(0, MAX_CHARS)
    feedback.value = target.value
  }
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})
</script>

<template>
  <form class="form">
    <textarea
      v-model="feedback"
      @input="onInput"
      name=""
      id="feedback-textarea"
      placeholder=""
      spellcheck="false"
      ref="inputRef"
    />
    <label for="feedback-textarea"
      >Enter your feedback here, remember to #hashtag the company</label
    >
    <div>
      <p class="u-italic">{{ remainingCharacters }}</p>
      <button>
        <span>Submit</span>
      </button>
    </div>
  </form>
</template>

<style scoped></style>
