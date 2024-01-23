<template>
  <div class="custom-wrapper">
    <div class="container-2">
      <div class="cube-2">
        <div class="slides">
          <div class="cube-item top" />
          <div class="cube-item right" />
          <div class="cube-item bottom" />
          <div class="cube-item left" />
          <div class="cube-item front" />
          <div class="cube-item back" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.custom-wrapper {
  --w: 100px;

  @keyframes rotate {
    0% {
      transform: rotateX(-37.5deg) rotateY(45deg);
    }
    50% {
      transform: rotateX(-37.5deg) rotateY(405deg);
    }
    100% {
      transform: rotateX(-37.5deg) rotateY(405deg);
    }
  }
  @keyframes top-animation {
    0% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(100px);
    }
    20% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(100px);
    }
    100% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(100px);
    }
  }

  @keyframes bottom-animation {
    0% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(100px);
    }
    20% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(100px);
    }
    100% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(100px);
    }
  }

  @keyframes front-animation {
    0% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(var(--w));
    }
    20% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(var(--w));
    }
    100% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(var(--w));
    }
  }

  @keyframes back-animation {
    0% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(var(--w));
    }
    20% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(var(--w));
    }
    100% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(var(--w));
    }
  }
  @keyframes left-animation {
    0% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(var(--w));
    }
    20% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(var(--w));
    }
    100% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(var(--w));
    }
  }
  @keyframes right-animation {
    0% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(var(--w));
    }
    20% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(var(--w));
    }
    100% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(var(--w));
    }
  }

  .container-2 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: #151515;
    padding: 60px 0;
    height: 400px;
    .cube-2 {
      position: relative;
      width: var(--w);
      height: var(--w);
      * {
        width: var(--w);
        height: var(--w);
        position: absolute;
      }
      .slides {
        animation: rotate 3s ease infinite;
        animation-delay: 0.8s;
        transform-style: preserve-3d;
        transform: rotateX(-37.5deg) rotateY(45deg);

        .cube-item {
          border: 1px solid white;
          border-radius: 8px;
          background: rgba(white, 0.1);
        }
        .top {
          animation: top-animation 3s ease infinite;
          animation-delay: 0ms;
          transform: rotateX(90deg) translateZ(var(--w));
          animation-fill-mode: forwards;
          transform-origin: 50% 50%;
        }
        .bottom {
          animation: bottom-animation 3s ease infinite;
          animation-delay: 0ms;
          transform: rotateX(-90deg) translateZ(var(--w));
          animation-fill-mode: forwards;
          transform-origin: 50% 50%;
        }
        .front {
          animation: front-animation 3s ease infinite;
          animation-delay: 100ms;
          transform: rotateY(0deg) translateZ(var(--w));
          animation-fill-mode: forwards;
          transform-origin: 50% 50%;
        }

        .back {
          animation: back-animation 3s ease infinite;
          animation-delay: 100ms;
          transform: rotateY(-180deg) translateZ(var(--w));
          animation-fill-mode: forwards;
          transform-origin: 50% 50%;
        }
        .left {
          animation: left-animation 3s ease infinite;
          animation-delay: 100ms;
          transform: rotateY(-90deg) translateZ(var(--w));
          animation-fill-mode: forwards;
          transform-origin: 50% 50%;
        }
        .right {
          animation: right-animation 3s ease infinite;
          animation-delay: 100ms;
          transform: rotateY(90deg) translateZ(var(--w));
          animation-fill-mode: forwards;
          transform-origin: 50% 50%;
        }
      }
    }
  }
}
</style>
