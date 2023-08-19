<script lang='ts' setup>
import Gitalk from 'gitalk'
import { onMounted } from 'vue'

onMounted(() => {
  const gitalk = new Gitalk({
    clientID: '243936355361ea9d1d33',
    clientSecret: '8201b3418abe0b04adb5eb93948dc8f04c9ed323',
    repo: 'blog-comments', // The repository of store comments,
    owner: 'makai1027',
    admin: ['makai1027'],
    language: 'zh-CN',
    id: location.pathname, // Ensure uniqueness and length less than 50
    distractionFreeMode: false, // Facebook-like distraction free mode
  })
  gitalk.render('gitalk-container')
})
</script>

<template>
  <div id="gitalk-container" />
</template>

<style lang="scss">
html {
  #gitalk-container {
    .gt-header-textarea  {
      position: relative;
      display: block;
      resize: vertical;
      padding: 5px 11px;
      line-height: 1.5;
      box-sizing: border-box;
      width: 100%;
      font-size: inherit;
      font-family: inherit;
      color: var(--el-input-text-color, var(--el-text-color-regular));
      background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
      background-image: none;
      -webkit-appearance: none;
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
      border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
      transition: var(--el-transition-box-shadow);
      border: none;
      &:hover {
        box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
      }
      &:focus {
        box-shadow: 0 0 0 1px var(--el-color-primary) inset;
      }
    }
    .gt-btn.gt-btn-preview {
      background-color: transparent;
    }
    .gt-comments {
      .gt-comment-content {
        background-color: var(--el-bg-color-overlay);

        .gt-comment-body {
          color: var(--el-text-color-primary) !important;
        }
        &:hover {
          box-shadow: var(--el-box-shadow-light);
        }
      }
    }
  }
  &.dark {
    #gitalk-container {
      .gt-container .gt-ico-github svg {
        fill: white !important
      }
    }
  }
}
</style>
