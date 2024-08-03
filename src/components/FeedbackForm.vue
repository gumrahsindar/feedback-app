<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { MAX_CHARS } from "../lib/constants"
import { useFeedbackItems } from "../composables/useFeedbackItems"
import { TFeedbackItems } from "../types"

const feedback = ref("")
const inputRef = ref<HTMLTextAreaElement | null>(null)

const { postFeedbackItem } = useFeedbackItems()

const remainingCharacters = computed(() => MAX_CHARS - feedback.value.length)

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  if (target.value.length > MAX_CHARS) {
    target.value = target.value.slice(0, MAX_CHARS)
    feedback.value = target.value
  }
}

const handleSubmit = async () => {
  const newItem: TFeedbackItems = {
    id: Date.now(),
    upvoteCount: 0,
    badgeLetter: feedback.value[0].toUpperCase(),
    company: "New Company",
    text: feedback.value,
    daysAgo: 0,
  }
  await postFeedbackItem(newItem)
  feedback.value = ""
  inputRef.value?.focus()
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
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
