<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container px-12 py-6 rounded-10px">
      <div class="checkbox w-24 inline-block mr-12">
        <input id="checkbox-1" type="checkbox" class="display-none">
        <label for="checkbox-1" class="flex items-center w-12 h-12 justify-center rounded-6">
          <i class="i-ri:check-line">done</i></label>
      </div>
      <div class="checkbox w-24 inline-block">
        <input id="checkbox-2" type="checkbox" class="display-none" checked>
        <label for="checkbox-2" class="flex items-center w-12 h-12 justify-center rounded-6">
          <i class="i-ri:check-line">done</i></label>
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
      .checkbox {
        label {
          box-shadow: $shadow;
          i {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--greyDark);
            transition: all 0.3s ease;
          }

          &:hover i {
            color: var(--primary);
          }
        }
        & input:checked {
          & ~ label {
            box-shadow: $inner-shadow;
            i {
              color: var(--primary);
            }
          }
        }
      }
    }
  }
</style>
