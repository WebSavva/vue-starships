<template>
  <ul class="starships">
    <li v-for="ship in starshipsData" :key="ship.name" class="starships__item">
      <router-link :to="`/starship/${ship.id}`" class="starships__link">
        <span>{{ ship.name }}</span>
        <strong class="starships__separator">/</strong>
        <span>{{ ship.model }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    starshipsData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "./../styles/_module.scss";

.starships {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1.6rem;
  color: rgba($primary-color, 0.8);
  list-style: none;
  max-height: 80%;
  overflow: auto;
  @include media(sm) {
    font-size: 1.4rem;
  }
  &::-webkit-scrollbar {
    appearance: none;
  }
  &__item {
    font-weight: 200;
    background: rgba($tertiary-color, 0.6);
    text-align: center;
    border-radius: 10px;
    clip-path: polygon(3% 0, 100% 0, 97% 100%, 0% 100%);
    border: 2px solid rgba($green-color,.2);
    animation: fadeIn 0.5s ease-in;
    transition: all 0.4s;
    @include media(xs) {
      clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
    }
    &:hover {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
  &__separator {
    display: inline-block;
    margin: 0 0.5rem;
    font-size: 1.1em;
    color: $green-color;
  }
  &__link {
    padding: 1.5rem 0;
    @include fillElement;
    @include media(sm) {
      padding: 1rem;
    }
    @include media(xs) {
      & > *:not(:first-child) {
        display: none;
      }
    }
  }
}
</style>
