<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper w-full p-50px bg-#151515">
    <div class="middle">
      <button
        class="position-relative mx-auto mb-20px px-32px py-10px bg-white display-block border-none rounded-6px uppercase font-mono tracking-0.5em font-500 text-lg w-200px mix-blend-color-dodge perspect-500 preserve-3d"
      >
        按钮1
      </button>
      <button
        class="position-relative mx-auto mb-20px px-32px py-10px bg-white display-block border-none rounded-6px uppercase font-mono tracking-0.5em font-500 text-lg w-200px mix-blend-color-dodge perspect-500 preserve-3d"
      >
        按钮2
      </button>
      <button
        class="position-relative mx-auto mb-20px px-32px py-10px bg-white display-block border-none rounded-6px uppercase font-mono tracking-0.5em font-500 text-lg w-200px mix-blend-color-dodge perspect-500 preserve-3d"
      >
        按钮3
      </button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.custom-wrapper {
    .middle {
        transform: rotatex(10deg);
        animation: rotateAngle 6s linear infinite;
    }
    button {

        &:before, &:after {
            --z: 0px;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            content: '';
            width: 100%;
            height: 100%;
            opacity: 0;
            mix-blend-mode: inherit;
            border-radius: inherit;
            transform-style: preserve-3d;
            transform: translate3d(
                calc(var(--z) * 0px),
                calc(var(--z) * 0px),
                calc(var(--z) * 0px)
            );
        }

        &:after {
            background-color: #5D00FF;
        }

        &:before {
            background-color: #FF1731;
        }

        &:hover {
            background-color: #FFF65B;
            transition: background .3s 0.1s;
        }

        &:hover:before {
            --z: 0.04;
            animation: translateWobble 2.2s ease forwards;
        }

        &:hover:after {
            --z: -0.06;
            animation: translateWobble 2.2s ease forwards;
        }
    }
}

@keyframes rotateAngle {
    0% {
        transform: rotateY(0deg) rotateX(10deg);
        animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }

    25% {
        transform: rotateY(20deg) rotateX(10deg);
    }

    50% {
        transform: rotateY(0deg) rotateX(10deg);
        animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }

    75% {
        transform: rotateY(-20deg) rotateX(10deg);
    }

    100% {
        transform: rotateY(0deg) rotateX(10deg);
    }
}

@keyframes translateWobble {
    0% {
        opacity: 0;
        transform: translate3d(calc(var(--z) * 0px),
                calc(var(--z) * 0px),
                calc(var(--z) * 0px));
    }

    16% {
        transform: translate3d(calc(var(--z) * 160px),
                calc(var(--z) * 160px),
                calc(var(--z) * 160px));
    }

    28% {
        opacity: 1;
        transform: translate3d(calc(var(--z) * 70px),
                calc(var(--z) * 70px),
                calc(var(--z) * 70px));
    }

    44% {
        transform: translate3d(calc(var(--z) * 130px),
                calc(var(--z) * 130px),
                calc(var(--z) * 130px));
    }

    59% {
        transform: translate3d(calc(var(--z) * 85px),
                calc(var(--z) * 85px),
                calc(var(--z) * 85px));
    }

    73% {
        transform: translate3d(calc(var(--z) * 110px),
                calc(var(--z) * 110px),
                calc(var(--z) * 110px));
    }

    88% {
        opacity: 1;
        transform: translate3d(calc(var(--z) * 90px),
                calc(var(--z) * 90px),
                calc(var(--z) * 90px));
    }

    100% {
        opacity: 1;
        transform: translate3d(calc(var(--z) * 100px),
                calc(var(--z) * 100px),
                calc(var(--z) * 100px));
    }
}
</style>
