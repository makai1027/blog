<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container px-12 py-6 rounded-10px">
      <div class="btn btn__primary w-60 h-16 rounded-4 flex items-center justify-center transition-all duration-300 ease select-none cursor-pointer mr-6 mb-6">
        <span class="text-lg font-bold">
          Button
        </span>
      </div>
      <div class="btn btn__secondary w-60 h-16 rounded-4 flex items-center justify-center transition-all duration-300 ease select-none cursor-pointer">
        <span class="text-lg font-bold">
          Button
        </span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .custom-wrapper {
    --primary-light: #8abdff;
    --primary: #6d5dfc;
    --primary-dark: #5b0eeb;

    --white: #FFFFFF;
    --greyLight-1: #E4EBF5;
    --greyLight-2: #c8d0e7;
    --greyLight-3: #bec8e4;
    --greyDark: #9baacf;

    $shadow: .3rem .3rem .6rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
    $inner-shadow: inset .2rem .2rem .5rem var(--greyLight-2), inset -.2rem -.2rem .5rem var(--white);

    background-color: var(--greyLight-1);

    .container {
      box-shadow:.8rem .8rem 1.4rem var(--greyLight-2), -.2rem -.2rem 1.8rem var(--white);
      .btn {
        box-shadow: $shadow;
        &__primary {
          background-color: var(--primary);
          box-shadow:inset .2rem .2rem 1rem var(--primary-light), inset -.2rem -.2rem 1rem var(--primary-dark), $shadow;
          color: var(--greyLight-1);
          &:hover { color: var(--white); }
          &:active {
            box-shadow:inset .2rem .2rem 1rem var(--primary-dark), inset -.2rem -.2rem 1rem var(--primary-light);
          }
        }
        &__secondary {
          color: var(--greyDark);
          &:hover { color: var(--primary); }
          &:active {
            box-shadow: $inner-shadow;
          }
        }
      }
    }
  }
</style>
