<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container py-4 px-8 rounded-4 flex items-center">
      <div class="icon-item w-16 h-16 rounded-8 flex items-center justify-center text-8 cursor-pointer transition-all duration-500 ease mr-8">
        <span class="i-solar:home-outline" />
      </div>
      <div class="icon-item w-16 h-16 rounded-8 flex items-center justify-center text-8 cursor-pointer transition-all duration-500 ease mr-8">
        <span class="i-emojione-monotone:person-bowing" />
      </div>
      <div class="icon-item w-16 h-16 rounded-8 flex items-center justify-center text-8 cursor-pointer transition-all duration-500 ease">
        <span class="i-uil:setting" />
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
      .icon-item {
        box-shadow: $shadow;
        color: var(--greyDark);
        &:active {
          box-shadow: $inner-shadow;
          color: var(--primary);
        }
        &:hover {
          color: var(--primary);
        }
      }
    }
  }
</style>
