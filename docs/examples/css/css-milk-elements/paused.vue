<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container px-12 py-16 rounded-4 flex items-center justify-center relative">
      <input type="checkbox" class="w-24 h-24 m-2 z-100 absolute opacity-0">
      <span class="circle__btn w-24 h-24 flex items-center justify-center m-2 rounded-12 text-5xl relative cursor-pointer relative z-50">
        <span class="transition-opacity duration-200 linear absolute pause i-carbon:pause-filled" />
        <span class="transition-opacity duration-200 linear absolute play i-carbon:play-filled-alt" />
      </span>
      <span class="circle__back-1 w-24 h-24 rounded-12 blur-1 absolute" />
      <span class="circle__back-2 w-24 h-24 rounded-12 blur-1 absolute" />
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
    @keyframes waves {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      50% {
        opacity: 1;
      }

      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    .container {
      box-shadow:.8rem .8rem 1.4rem var(--greyLight-2), -.2rem -.2rem 1.8rem var(--white);
      .circle__btn {
        color: var(--primary);
        background-color: var(--greyLight-1);
        box-shadow:  0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
        .pause {
          opacity: 0;
        }
        .play {
          opacity: 1;
        }
      }
      .circle__back-1 {
        box-shadow: 0.4rem 0.4rem 0.8rem var(--greyLight-2), -0.4rem -0.4rem 0.8rem var(--white);
        background: linear-gradient(to bottom right, var(--greyLight-2) 0%, var(--white) 100%);
        animation: waves 4s linear infinite;
        animation-play-state: paused;
      }
      .circle__back-2 {
        box-shadow: 0.4rem 0.4rem 0.8rem var(--greyLight-2), -0.4rem -0.4rem 0.8rem var(--white);
        animation: waves 4s linear 2s infinite;
        animation-play-state: paused;
      }
      input:checked ~ .circle__btn {
        .pause {
          opacity: 1;
        }
        .play {
          opacity: 0;
        }
      }

      input:checked ~ .circle__back-1, input:checked ~ .circle__back-2 {
        animation-play-state: running;
      }

    }
  }
</style>
