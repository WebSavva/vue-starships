<template>
  <div class="message-box" :class="{ 'message-box--error': isError }">
    <img
      v-if="isError"
      src="../../assets/error.svg"
      class="message-box__img"
      alt="error Icon"
    />
    <img
      v-else
      src="../../assets/vader.svg"
      class="message-box__img"
      alt="Warning Icon"
    />
    <h2 class="message-box__heading">{{ text }}</h2>
    <button
      class="message-box__retry"
      v-if="isError && isFixableError"
      @click="retryHandler"
    >
      Retry
    </button>
  </div>
</template>

<script>
export default {
  props: {
    retryHandler: Function,
    isError: Boolean,
    text: String,
    isFixableError: Boolean,
  },
};
</script>

<style scoped lang="scss">
@import "./../../styles/_module.scss";
.message-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  color: $primary-color;
  &--error {
    color: $danger-color;
  }
  &__img {
    width: 15rem;
    @include media(sm) {
      width: 10rem;
    }
  }
  &__heading {
    text-transform: uppercase;
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
    @include media(sm) {
      font-size: 1.8rem;
    }
  }

  &__retry {
    padding: 1rem;
    display: block;
    width: 50%;
    font-size: 1.7rem;
    border-radius: 5px;
    color: currentColor;
    border: 1px solid currentColor;
    @include media(sm) {
      font-size: 1.4rem;
    }
  }
}
</style>
