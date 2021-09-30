<template>
      
  <form class="search" @submit.prevent>
    <input
      type="text"
      class="search__input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Enter starship's name or model"
    />
    <button
      v-if="modelValue"
      type="submit"
      @click="$emit('clear:modelValue')"
      class="search__submit"
    >
      Clear
    </button>
  </form>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue", "clear:modelValue"],
};
</script>

<style scoped lang="scss">
@import "./../styles/_module.scss";
.search {
  display: flex;
  gap: 2rem;
  background: $secondary-color;
  border-radius: 5px;
  padding: 1rem 2rem;
  color: $primary-color;
  position: relative;
  @include cutBorders(4rem, "left");
  @include cutBorders(4rem, "right");
  @include media(sm) {
    gap: 1rem;
  }
  &__input {
    font-size: 2rem;
    flex: 1;
    border-bottom: 1px solid $tertiary-color;
    padding: 0.5rem 1rem;
    &::placeholder {
      text-transform: uppercase;
      font-size: 1.1em;
      @include media(sm) {
        font-size: 0.9em;
      }
    }
    @include media(sm) {
      font-size: 1.6rem;
    }
  }
  &__submit {
    border-radius: 5px;
    padding: 1rem 2rem;
    filter: brightness(160%);
    background: $secondary-color;
    font-size: 1.7rem;
    text-transform: uppercase;
    font-weight: 400;
    @include media(sm) {
        padding: .5rem;
        font-size: 1.3rem;
  }
  }
}
</style>
