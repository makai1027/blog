<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container px-12 py-6 rounded-10px">
      <div class="alert w-full flex items-center h-16 rounded-4 justify-between justify-self-center">
        <div class="p-4 text-xl font-bold icon-left">
          <span class="i-gis:color" />
        </div>
        <p class="flex-1 text-lg px-2 m-0">
          some tips.....
        </p>
        <div class="p-4 text-xl font-bold icon-right cursor-pointer">
          <span class="i-iconamoon:close-light" />
        </div>
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
      .alert {
        box-shadow: $shadow;
        .icon-left {
          color: var(--primary);
        }
        p {
          color: var(--greyDark);
        }
        .icon-right {
          color: var(--greyDark);
        }
      }

    }
  }
</style>
