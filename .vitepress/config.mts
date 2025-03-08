import { defineConfig } from 'vitepress'
import { readDirectory } from '..'

export default defineConfig({
  // https://vitepress.dev/reference/site-config#ignoredeadlinks
  ignoreDeadLinks: true,
  cleanUrls: true,
  outDir: 'dist',
  lang: 'zh-CN',
  title: '小杨的进阶之路',
  description: ' ',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端积累',
        items: [
          { text: 'vue', link: '/notes/vue/' },
          { text: '重学typescript', link: '/notes/typescript/' },
          { text: '基础巩固', link: '/notes/base/' }
          // { text: '读万卷书 行万里路', link: '/react/index' },
        ]
      },
      {
        text: '手写代码',
        items: [
          {
            text: 'js',
            link: '/notes/white-code/js/'
          },
          {
            text: 'vue',
            link: '/notes/white-code/vue/'
          }
        ]
      },
      {
        text: '项目',
        items: [
          {
            text: '项目难点',
            link: '/notes/project/webpack'
          }
        ]
      }
      // {
      //   text: '源码阅读',
      //   items: [
      //     {
      //       text: 'vue3',
      //       link: '/源码阅读记/vue3'
      //     }
      //   ]
      // }
    ],
    sidebar: {
      ...readDirectory('project'),
      ...readDirectory('base'),
      ...readDirectory('vue'),
      ...readDirectory('js', 'notes/white-code'),
      ...readDirectory('vue', 'notes/white-code'),
      ...readDirectory('typescript')
    },
    socialLinks: [
      // {
      //   icon: 'github',
      //   link: 'https://github.com/SunnySeptemberBoy/SunnySeptemberBoy.github.io'
      // }
    ],
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local'
    }
  }
})
