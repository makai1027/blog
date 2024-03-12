

## 微前端改造项目概述

**背景**：我们现在做的项目是一个集采项目，所以涉及的模块很多，拢共30个项目，你也可以理解为30多个模块，例如采办寻源、彩板方案管理、支付管理、订单管理、合同管理、供应商管理、系统管理等等
原项目采用单体前端架构，所有子应用部署在同一域名下, 项目之间通过相对路径进行区分，通过主系统去管理所有登录权限，登录菜单，然后通过iframe去管理加载对应的子应用
* 所有的应用都是通过iframe进行加载，那么就是一个页面地址就是一个iframe，就导致应用加载缓慢，即使开了协商缓存，但是iframe内的资源还是要加载的，那么必定会浪费一定的渲染时间
* 无法进行有效的项目间通信，简单的例子就是说我要修改登录人的名称，修改完毕之后我要通知子应用去修改，那这个时候就要刷新
* 另外一点就是公共资源管理和组件复用效率低下，部分子应用都是vue2生态，但是项目中的资源都是全量构建没有使用公共资源的抽离，使得资源重复加载，例如vuejs、vue-router、vuex、UI框架、部分依赖，这些都是不会变的
* 子应用无法说保持激活和销毁，我们这个老项目上边有一个tab栏用于记录访问过的菜单，那么就是你只要开过这个菜单就等于加载了一个iframe，关掉就等于这个iframe被移除，销毁了，由此就会带来两个问题，一个就是如果我点击了很多iframe，那么势必会造成我这个浏览器的tab栏占用的内存越来越大，然后就会卡死，浏览器提示崩溃了，再一个问题就是没有缓存，我关掉之后，再打开又要重新加载，那个白屏过程又要走一次

**改造目标**：
- 提高应用加载速度和运行性能。
- 实现子应用间的灵活通信和管理。
- 优化公共资源和组件的复用。
- 减小项目构建体积，提升构建效率。
- 能够实现子应用的灵活启停以及缓存

**解决方案**：采用Wujie微前端框架对项目进行全面升级改造。
在后端、运维端什么都不变的情况下，我做了以下的修改
- 重新开发设计一个子应用模板，该模板涉及
  1. Vue框架升级
  2. 实现组件按需加载
  3. 实现图标按需加载
  4. 制定eslint、git-hooks、代码美化规范
  5. 定义微前端路由分配结构，原有的菜单接口就是只返回的用的菜单列表
    - 根据后端返回的后端列表，通过所有的路由都是通过相对路径进行分配的这个原则，我们进行洗数据，洗完之后再走vue-router的路由注册，就等于每一个项目我只分配了一个路由页面，（其实在代码上所有的子应用都是在一个入口加载的，预加载仅仅是他们的iframe，这个涉及到wujie的原理）
  6. 每一个用户的tab访问记录通过用的id&用户名单独存储到本地缓存，当用户登录之后从本地缓存中取到，历史访问tab菜单，因为每次菜单的点击都会更新对应缓存中那个菜单的updateTime，我们拿到tab之后就可以将数据进行唯一化处理（唯一化处理主要是看项目前缀），然后再进行时间正排序，取后边多少个（最大上限，我设置的是5）进行预加载，在项目使用中也会记录收集子应用的启动数量，当达到一定的数量之后，将最大上限中最老的一个进行注销，这样就能够实现子应用的缓存，以及内存的管理
- 重新优化升级子应用的构建，新增代码压缩、GZIP压缩
- 对于项目的项目依赖全部抽离通过cdn引入，减少项目构建压力，以及项目渲染时间
- 逐步升级子应用框架，使得子应用和主应用用工一个vue生态，通过主应用下发实例，实现生态共享


### 改造成果

1. **子项目灵活管理**：实现了子项目的灵活启停，极大提升了部署和维护的灵活性。
2. **性能优化与缓存机制**：通过Wujie框架的项目缓存功能，显著减少了重复加载时间，提升用户体验。
3. **增强的项目通信**：构建了一个高效的项目间通信机制，使得数据交换和状态管理变得更加高效和直接。
4. **公共资源优化**：成功抽离了项目的公共组件和共有资源（JS、CSS等），实现资源复用，减少了重复代码和资源冗余。
5. **构建体积和性能提升**：通过对子组件进行构建优化，降低了项目构建体积，同时带来显著的性能提升。

### 结论

通过采用Wujie微前端框架和对项目架构进行深度优化，不仅实现了更加灵活和高效的子项目管理和通信，也显著提升了整个应用的加载速度和运行性能。这一改造升级工作不仅提高了开发和部署效率，还为未来项目的扩展和维护奠定了坚实的基础。
