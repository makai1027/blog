<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container px-12 py-6 rounded-10px">
      <div class="segmented-control w-full h-16 rounded-4 flex items-center relative px-2">
        <input id="tab-1" class="display-none" type="radio" name="radio2" value="3" checked>
        <label for="tab-1" class="segmented-control__1 flex-1 h-14 text-lg flex items-center justify-center cursor-pointer transition-all duration-500 ease">
          <p>Tab 1</p></label>

        <input id="tab-2" class="display-none" type="radio" name="radio2" value="4">
        <label for="tab-2" class="segmented-control__2 flex-1 h-14 text-lg flex items-center justify-center cursor-pointer transition-all duration-500 ease">
          <p>Tab 2</p></label>

        <input id="tab-3" class="display-none" type="radio" name="radio2" value="5">
        <label for="tab-3" class="segmented-control__3 flex-1 h-14 text-lg flex items-center justify-center cursor-pointer transition-all duration-500 ease">
          <p>Tab 3</p></label>

        <div class="segmented-control__color h-12 rounded-3.2 absolute left-2 transition-transform duration-300 ease" />
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
      .segmented-control {
        box-shadow: $shadow;
        input:checked + label {
          transition: all 0.5s ease;
          color: var(--primary);
          font-weight: bold;
        }
        label {
          color: var(--greyDark);
          &:hover {
            color: var(--primary);
            font-weight: bold;
          }
        }
        &__color {
          box-shadow: $inner-shadow;
          pointer-events: none;
          width: calc(calc(100% - 1rem) / 3);
        }

        #tab-1:checked ~ .segmented-control__color {
          transform: translateX(0);
        }
        #tab-2:checked ~ .segmented-control__color {
          transform: translateX(100%);
        }
        #tab-3:checked ~ .segmented-control__color {
          transform: translateX(200%);
        }
      }

    }
  }
</style>
