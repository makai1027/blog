<script lang='ts' setup>
import { ref } from 'vue'

const rangeValue = ref(50)
const sliderBox = ref()
const sliderBtn = ref()
const sliderColor = ref()
const sliderTooltip = ref()
</script>

<template>
  <div class="custom-wrapper pt-10 px-10 pb-20">
    <div class="slider flex self-center flex-col">
      <div ref="sliderBox" class="slider__box w-full h-4 cursor-pointer relative flex justify-center items-center rounded-4">
        <span ref="sliderBtn" class="slider__btn pointer-events-none w-8 h-8 rounded-4 absolute z-100 flex items-center justify-center translate-x--4" :style="{ left: `${rangeValue}%` }" />
        <span ref="sliderColor" class="slider__color h-full absolute left-0 z-50 rounded-inherit" :style="{ width: `${rangeValue}%` }" />
        <span ref="sliderTooltip" class="slider__tooltip absolute top-10 h-10 w-12 rounded-2 flex items-center justify-center text-lg opacity-0 transition-opacity duration-300 ease translate-x--6" :style="{ left: `${rangeValue}%` }">{{ `${rangeValue}%` }}</span>
        <input v-model="rangeValue" type="range" class="w-full absolute left-0 top-0 z-300 border-none m-0 opacity-0" :min="0" :max="100">
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

    .slider {
      &__box {
        box-shadow: $inner-shadow;
      }
      &__btn {
        background-color: var(--white);
        box-shadow: 0px .1rem .3rem 0px var(--greyLight-3);
        &::after {
          content: '';
          position: absolute;
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          box-shadow: $inner-shadow;
        }
      }
      &__color {
        background: var(--primary);
        background: linear-gradient(-1deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%);
      }
      &__tooltip {
        color: var(--primary);
        box-shadow: $shadow;
      }

      &:hover .slider__tooltip {opacity: 1;}

    }
  }
</style>
