<template>
  <div class="w-full p-12 bg-#151515">
    <button class="w-300px h-54px border-none outline-none relative group">
      <div class="inner relative z-3 overflow-hidden w-full flex items-center justify-center tracking-2px rounded-30px p-10px text-white text-lg font-bold backdrop-blur-15 overflow-hidden transition-letter-spacing duration-500 linear group-hover:tracking-4px">
        <span>我是一个按钮</span>
        <div class="inner-shadow w-1/2 absolute left-0 top-0 h-full skew-x-45 blur-0 transition-transform duration-500 ease group-hover:translate-x-200%" />
      </div>
      <div class="btn-filter-item absolute left-50% translate-x--50% top--4px w-30px h-10px rounded-10px transition-all duration-500 ease bg-#409eff group-hover:w-80% group-hover:h-50% group-hover:rounded-30px group-hover:top-2px" />
      <div class="btn-filter-item absolute left-50% translate-x--50% bottom--3px w-30px h-10px rounded-10px transition-all duration-500 ease bg-#409eff group-hover:w-80% group-hover:h-50% group-hover:rounded-30px group-hover:bottom-2px" />
    </button>
  </div>
</template>

<style lang='scss' scoped>
  button {
    div.inner {
      background-color: rgba(white, 0.05);
      box-shadow: 0 15px 15px rgba(black, 0.3);
      border-top: 1px solid rgba(white, 0.1);
      border-bottom: 1px solid rgba(white, 0.1);
      .inner-shadow {
        background: linear-gradient(to left, rgba(255, 255, 255, 0.15), transparent);
      }
    }

    .btn-filter-item {
      box-shadow: 0 0 5px #409eff, 0 0 15px #409eff, 0 0 30px #409eff, 0 0 60px #409eff;
    }
  }
</style>
