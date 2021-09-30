<template>
  <div class="loader">
      <div class="loader__inner"></div>
  </div>
</template>

<style scoped lang="scss">
@import "./../../styles/_module.scss";

@keyframes non-destructive-spin{
    to {
        transform: translate(-50%,-50%) rotate(360deg);
    }
}

.loader {
  @include absCenter;
  border-radius: 50%;
  border-width: 7px;
  padding: 1px;
  border-style: solid;
  border-color: $green-color transparent;
  width: 150px;
  height: 150px;
  animation:  non-destructive-spin 1s linear infinite;
  @include media(sm) {
      width: 100px;
      height: 100px;
    }
  &::after{
      @extend %pseudoDefault;
      @include absCenter;
      border-radius: inherit;
      width: 95%;
      height: 95%;
      border-color: rgba($primary-color, .3);
      border-width: inherit;
      border-style: inherit;
  }
  
}
</style>
