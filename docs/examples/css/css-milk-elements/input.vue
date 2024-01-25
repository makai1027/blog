<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container px-12 py-6 rounded-10px">
      <div class="form mb-12">
        <input type="text" class="form__input w-80 h-16 border-none rounded-4 px-6 bg-none " placeholder="请输入...">
      </div>

      <div class="search relative flex items-center">
        <input type="text" class="search__input w-80 h-16 border-none rounded-4 pl-12 pr-6 bg-none " placeholder="查询...">
        <span class="i-ic:round-search absolute text-8 left-3 transition-color duration-300 ease" />
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
      input {
        box-shadow: $inner-shadow;
        color: var(--greyDark);
        &::placeholder {
          color: var(--greyLight-3);
        }
        &:focus {
          outline: none;
          box-shadow: $shadow;
        }
      }

      .search {
        span {
          color: var(--greyDark);
        }
        input:focus {
          outline: none;
          box-shadow: $shadow;
          & + span {
            color: var(--primary)
          }
        }
      }
    }
  }
</style>
