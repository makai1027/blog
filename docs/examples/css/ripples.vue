<script lang='ts' setup>

</script>

<template>
  <div class="bg-black h-450px overflow-hidden">
    <div class="container h-450px relative text-0">
      <div class="top absolute left-0 top-0 h-50% w-full overflow-hidden">
        <div class="box-shadow" />
      </div>
      <div class="bottom absolute left-0 bottom-0 h-50% w-full overflow-hidden" />
    </div>

    <svg>
      <filter id="fractal" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0.005 0.005" numOctaves="10">
          <animate attributeName="baseFrequency" dur="30s" values="0.005 0.005;0.05 0.3;0.005 0.005" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="15" />
      </filter>
    </svg>
  </div>
</template>

<style lang='scss' scoped>
  .container {
    .top  {
      &::before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 50%);
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 25px solid white;
        box-shadow: 0 0 4px 1px rgba(255, 255, 255, .8),
          0 0 8px 2px rgba(255, 255, 255, .6);
        z-index: 1;
        background: black;
      }
      .box-shadow {
        position: absolute;
        left: 10%;
        bottom: -3px;
        height: 4px;
        width: 80%;
        z-index: 3;
        background: rgba(46, 106, 232, 1);
        box-shadow: 0 0 5px rgba(46, 106, 232, .7);
        filter: blur(5px) contrast(1.2) brightness(1.2);
        border-radius: 3px;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: repeating-radial-gradient(circle at 50% 100%, transparent, transparent 5px, #2c5ec8 5.2px, #2c5ec8 6.2px, transparent 6.5px);
        mask: radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 1), transparent 50%, transparent);
      }
    }

    .bottom {
      filter: url(#fractal);
      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 25px solid white;
        box-shadow: 0 0 4px 1px rgba(255, 255, 255, .8),
          0 0 8px 2px rgba(255, 255, 255, .6);
        // z-index: 1;
        // background: black;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: repeating-radial-gradient(circle at 50% 0%, transparent, transparent 5px, #2c5ec8 5.2px, #2c5ec8 6.2px, transparent 6.5px);
        mask: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.7), transparent 50%, transparent);

      }
    }
  }
</style>
