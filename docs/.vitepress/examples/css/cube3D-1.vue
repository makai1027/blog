<template>
  <div class="custom-wrapper">
    <div class="container-1">
      <div class="cube-1">
        <div class="cube-item front">
          1
        </div>
        <div class="cube-item back">
          2
        </div>
        <div class="cube-item right">
          3
        </div>
        <div class="cube-item left">
          4
        </div>
        <div class="cube-item top">
          5
        </div>
        <div class="cube-item bottom">
          6
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.custom-wrapper {
  --w: 100px;
  .container-1 {
    position: relative;
    .cube-1 {
      position: relative;
      width: 100%;
      height: 500px;
      background-color: rgba(black, 0.5);
      backface-visibility: visible;
      perspective-origin: 100% 0%;
      transform-style: preserve-3d;
      perspective: 500px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      line-height: 100px;
      .cube-item {
        position: absolute;
        width: var(--w);
        height: var(--w);
        border-radius: 10px;
        border: 2px solid rgba(white, 0.9);
        background-color: rgba(white, 0.3);
      }
      .front {
        background: rgba(0, 0, 0, 0.3);
        transform: translateZ(56px);
      }

      .back {
        background: rgba(0, 255, 0, 1);
        color: black;
        transform: rotateY(180deg) translateZ(56px);
      }

      .right {
        background: rgba(196, 0, 0, 0.7);
        transform: rotateY(90deg) translateZ(56px);
      }

      .left {
        background: rgba(0, 0, 196, 0.7);
        transform: rotateY(-90deg) translateZ(56px);
      }

      .top {
        background: rgba(196, 196, 0, 0.7);
        transform: rotateX(90deg) translateZ(56px);
      }

      .bottom {
        background: rgba(196, 0, 196, 0.7);
        transform: rotateX(-90deg) translateZ(56px);
      }
    }
  }

}
</style>
