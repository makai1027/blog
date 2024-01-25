<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container px-12 py-6 rounded-10px">
      <div class="milk-switch w-24 inline-block mr-12">
        <input id="switch-1" type="checkbox" class="display-none">
        <label for="switch-1" class="inline-block w-full h-12 cursor-pointer rounded-6 relative flex items-center" />
      </div>
      <div class="milk-switch w-24 inline-block">
        <input id="switch-2" type="checkbox" class="display-none" checked>
        <label for="switch-2" class="inline-block w-full h-12 cursor-pointer rounded-6 relative flex items-center" />
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
      .milk-switch {
        label {
          box-shadow: $shadow;
          &::after {
            content: '';
            position: absolute;
            left: .4rem;
            width: 2.1rem;
            height: 2.1rem;
            border-radius: 50%;
            background-color: var(--greyDark);
            transition: all 0.4s ease;
          }

          &::before {
            content: '';
            width: 100%;
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(330deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%);
            opacity: 0;
            transition: all .4s ease;
          }
        }
        & input:checked {
          & ~ label {
            &::before { opacity: 1; }
            &::after {
              left: 57%;
              background: var(--greyLight-1);
            }
          }
        }
      }
    }
  }
</style>
