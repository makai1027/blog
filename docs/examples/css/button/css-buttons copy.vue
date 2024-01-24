<script lang="ts" setup>
import { useDark } from '@vueuse/core'

const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
})
</script>

<template>
  <div class="data-lite-welcome-wrapper">
    <div class="title">
      我被困住了
    </div>
    <svg width="200" height="200">
      <defs>
        <svg
          id="douyin"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4732"
        >
          <path
            d="M191.061333 730.88a4.266667 4.266667 0 0 1-4.266666 4.266667h-34.773334a4.266667 4.266667 0 0 1-4.266666-4.266667V408.32H112.64a4.266667 4.266667 0 0 1-4.266667-4.266667v-30.848a4.266667 4.266667 0 0 1 4.266667-4.266666h74.154667a4.266667 4.266667 0 0 1 4.266666 4.266666v357.76zM746.069333 290.133333a4.266667 4.266667 0 0 1 4.266667 4.266667v27.221333h161.152a4.266667 4.266667 0 0 1 4.266667 4.266667v379.434667a29.866667 29.866667 0 0 1-25.813334 29.568l-4.053333 0.298666H775.253333a20.224 20.224 0 0 1-9.6-2.432l-2.816-1.834666-54.442666-42.368a2.56 2.56 0 0 1 0.298666-4.224l1.28-0.341334h67.968c3.285333 0 5.930667 2.645333 5.930667 5.888 0 2.602667 1.706667 4.821333 4.010667 5.632l1.877333 0.298667h69.930667a12.8 12.8 0 0 0 12.458666-9.898667l0.341334-2.901333-0.042667-322.005333h-39.381333v279.338666a4.266667 4.266667 0 0 1-4.266667 4.266667h-34.773333a4.266667 4.266667 0 0 1-4.266667-4.266667V360.96h-39.381333v279.338667a4.266667 4.266667 0 0 1-4.266667 4.266666h-34.773333a4.266667 4.266667 0 0 1-4.266667-4.266666V294.4a4.266667 4.266667 0 0 1 4.266667-4.266667h34.773333z m-82.688 0a4.266667 4.266667 0 0 1 4.266667 4.266667l-0.042667 27.221333h10.538667a4.266667 4.266667 0 0 1 4.266667 4.266667v30.890667a4.266667 4.266667 0 0 1-4.266667 4.266666l-10.538667-0.042666v244.181333h11.52a4.266667 4.266667 0 0 1 4.266667 4.266667v30.890666a4.266667 4.266667 0 0 1-4.266667 4.266667l-11.52-0.042667v86.357334a4.266667 4.266667 0 0 1-4.266666 4.266666h-34.773334a4.266667 4.266667 0 0 1-4.266666-4.266666v-86.357334h-78.421334a4.266667 4.266667 0 0 1-4.266666-4.266666v-30.805334a4.266667 4.266667 0 0 1 4.266666-4.266666l78.421334-0.042667V361.002667h-39.381334v200.533333a4.266667 4.266667 0 0 1-4.266666 4.266667h-34.773334a4.266667 4.266667 0 0 1-4.266666-4.266667v-247.466667a4.266667 4.266667 0 0 1 4.266666-4.266666h34.773334a4.266667 4.266667 0 0 1 4.266666 4.266666v7.552h39.381334V294.4a4.266667 4.266667 0 0 1 4.266666-4.266667h34.816z m-177.237333 236.288a4.266667 4.266667 0 0 1 4.266667 4.266667v30.890667a4.266667 4.266667 0 0 1-4.266667 4.266666l-10.496-0.042666v39.381333h10.496a4.266667 4.266667 0 0 1 4.266667 4.266667v30.890666a4.266667 4.266667 0 0 1-4.266667 4.266667l-10.496-0.042667v60.757334a29.866667 29.866667 0 0 1-25.813333 29.568l-4.053334 0.298666h-148.906666a20.224 20.224 0 0 1-9.813334-2.56l-2.858666-1.92-52.394667-42.197333a2.56 2.56 0 0 1 0.341333-4.181333l1.28-0.341334h65.962667c3.242667 0 5.888 2.645333 5.888 5.888 0 2.602667 1.706667 4.821333 4.053333 5.632l1.877334 0.298667h108.288a12.8 12.8 0 0 0 12.458666-9.898667l0.341334-2.901333v-38.442667h-197.546667a4.266667 4.266667 0 0 1-4.266667-4.266666v-30.805334a4.266667 4.266667 0 0 1 4.266667-4.266666l197.546667-0.042667v-39.381333h-197.546667a4.266667 4.266667 0 0 1-4.266667-4.266667v-30.848a4.266667 4.266667 0 0 1 4.266667-4.266667h251.392z m0-236.288a4.266667 4.266667 0 0 1 4.266667 4.266667v188.373333a4.266667 4.266667 0 0 1-4.266667 4.266667H234.752a4.266667 4.266667 0 0 1-4.266667-4.266667V294.4a4.266667 4.266667 0 0 1 4.266667-4.266667h251.392z m-39.082667 118.144H273.792v39.381334h173.226667v-39.381334z m0-78.762666H273.792v39.381333h173.226667v-39.381333z m-260.266666-39.381334a4.266667 4.266667 0 0 1 4.266666 4.266667v30.848a4.266667 4.266667 0 0 1-4.266666 4.266667H112.64a4.266667 4.266667 0 0 1-4.266667-4.266667V294.4a4.266667 4.266667 0 0 1 4.266667-4.266667h74.154667z"
            p-id="4733"
          />
        </svg>
        <filter id="filter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01 0.15"
            numOctaves="2"
            seed="5"
            stitchTiles="stitch"
            result="turbulence"
          />
          <feColorMatrix type="saturate" values="30" in="turbulence" result="colormatrix" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 150 -15"
            in="colormatrix"
            result="colormatrix1"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="colormatrix1"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="A"
            result="displacementMap"
          />
        </filter>
      </defs>
      <use xlink:href="#douyin" x="0%" y="0%" class="douyin douyin1" />
      <use xlink:href="#douyin" x="0%" y="0%" class="douyin douyin2" />
      <use xlink:href="#douyin" x="0%" y="0%" class="douyin" :fill="isDark ? '#fff' : '#000'" />
    </svg>
  </div>
</template>

  <style lang="scss" scoped>
  .data-lite-welcome-wrapper {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    // background-color: black;
    .title {
        font-family: sans-serif;
        font-size: 4em;
        animation: animate 0.5s linear infinite;
    }
}
@keyframes animate {
    0%,
    100% {
        text-shadow: -1.5px -1.5px 0 #0ff, 1.5px 1.5px 0 #f00;
    }
    25% {
        text-shadow: 1.5px 1.5px 0 #0ff, -1.5px -1.5px 0 #f00;
    }
    50% {
        text-shadow: 1.5px -1.5px 0 #0ff, 1.5px -1.5px 0 #f00;
    }
    75% {
        text-shadow: -1.5px 1.5px 0 #0ff, -1.5px 1.5px 0 #f00;
    }
}

  .douyin {
    text-align: center;
    // fill: #000;
    font-size: 5em;
    letter-spacing: 8px;
    font-family: 'Press Start 2P';
    font-weight: 400;
    /*Create overlap*/

    margin: 0;
    line-height: 0;
    /*Animation*/
    animation: glitch1 2s forwards;
  }

  .douyin1 {
    fill: #25f4ee;
    animation: glitch2 2s forwards;
  }

  .douyin2 {
    fill: #fe2c55;
    animation: glitch3 2s forwards;
  }

  /*Keyframes*/

  @keyframes glitch1 {
    0% {
      transform: none;
      opacity: 1;
    }

    // 7% {
    //   transform: skew(-2.5deg, -0.9deg);
    //   filter: url(#filter);
    //   opacity: 0.75;
    // }

    // 8% {
    //   filter: none;
    // }

    // 10% {
    //   transform: none;
    //   opacity: 1;
    // }

    // 27% {
    //   transform: none;
    //   opacity: 1;
    // }

    // 30% {
    //   transform: skew(1.8deg, -0.1deg);
    //   filter: url(#filter);
    //   opacity: 0.75;
    // }
    // 31% {
    //   filter: none;
    // }

    // 35% {
    //   transform: none;
    //   opacity: 1;
    // }

    // 52% {
    //   transform: none;
    //   opacity: 1;
    // }

    // 55% {
    //   transform: skew(-1deg, 1.2deg);
    //   filter: url(#filter);
    //   opacity: 0.75;
    // }

    56% {
      filter: none;
    }

    60% {
      transform: none;
      opacity: 1;
    }

    72% {
      transform: none;
      opacity: 1;
    }

    75% {
      transform: skew(0.4deg, -1deg);
      filter: url(#filter);
      opacity: 0.75;
    }
    76% {
      filter: none;
    }

    80% {
      transform: none;
      opacity: 1;
    }

    100% {
      transform: none;
      opacity: 1;
    }
  }

  @keyframes glitch2 {
    0% {
      transform: none;
      opacity: 0.25;
    }

    // 7% {
    //   transform: translate(-4px, -6px);
    //   filter: url(#filter);
    //   opacity: 0.5;
    // }

    // 8% {
    //   filter: none;
    // }

    // 10% {
    //   transform: none;
    //   opacity: 0.25;
    // }

    // 27% {
    //   transform: none;
    //   opacity: 0.25;
    // }

    // 30% {
    //   transform: translate(-7px, -4px);
    //   filter: url(#filter);
    //   opacity: 0.5;
    // }

    // 31% {
    //   filter: none;
    // }

    // 35% {
    //   transform: none;
    //   opacity: 0.25;
    // }

    // 52% {
    //   transform: none;
    //   opacity: 0.25;
    // }

    // 55% {
    //   transform: translate(-5px, -2px);
    //   filter: url(#filter);
    //   opacity: 0.5;
    // }

    56% {
      filter: none;
    }

    60% {
      transform: none;
      opacity: 0.25;
    }

    72% {
      transform: none;
      opacity: 0.25;
    }

    75% {
      transform: translate(-4px, -6px);
      filter: url(#filter);
      opacity: 0.5;
    }

    76% {
      filter: none;
    }

    80% {
      transform: none;
      opacity: 0.25;
    }

    100% {
      transform: none;
      opacity: 0.25;
    }
  }

  @keyframes glitch3 {
    0% {
      transform: none;
      opacity: 0.25;
    }

    // 7% {
    //   transform: translate(4px, 6px);
    //   filter: url(#filter);
    //   opacity: 0.5;
    // }

    // 8% {
    //   filter: none;
    // }

    // 10% {
    //   transform: none;
    //   opacity: 0.25;
    // }

    // 27% {
    //   transform: none;
    //   opacity: 0.25;
    // }

    // 30% {
    //   transform: translate(7px, 4px);
    //   filter: url(#filter);
    //   opacity: 0.5;
    // }

    // 31% {
    //   filter: none;
    // }

    // 35% {
    //   transform: none;
    //   opacity: 0.25;
    // }

    // 52% {
    //   transform: none;
    //   opacity: 0.25;
    // }

    // 55% {
    //   transform: translate(5px, 2px);
    //   filter: url(#filter);
    //   opacity: 0.5;
    // }

    56% {
      filter: none;
    }

    60% {
      transform: none;
      opacity: 0.25;
    }

    72% {
      transform: none;
      opacity: 0.25;
    }

    75% {
      transform: translate(4px, 8px);
      filter: url(#filter);
      opacity: 0.5;
    }

    76% {
      filter: none;
    }

    80% {
      transform: none;
      opacity: 0.25;
    }

    100% {
      transform: none;
      opacity: 0.25;
    }
  }
  </style>
