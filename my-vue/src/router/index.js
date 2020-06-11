import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Store from '../store/index.js'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/login'),
      meta: {
        title: '登录',
        keepAlive: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/register'),
      meta: {
        title: '注册',
        keepAlive: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index/index'),
      redirect: '/home',
      meta: {
        title: 'index',
        keepAlive: true
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/home'),
          meta: {
            title: '主页',
            keepAlive: true
          }
        },
        {
          // path: "/gallary/top",
          path: '/gallary/top',
          name: 'gallary',
          component: () => import('@/views/gallary/top'),
          meta: {
            title: '画廊',
            keepAlive: true
          }
        },
        {
          path: '/bbs/club',
          name: 'club',
          component: () => import('@/views/bbs/club'),
          meta: {
            title: '部落',
            keepAlive: true
          }
        },
        {
          path: '/mine/mine',
          name: 'mine',
          component: () => import('@/views/mine/mine'),
          meta: {
            title: '我的',
            keepAlive: true
          }
        },
        {
          path: '/test/iconList',
          name: 'iconList',
          component: () => import('@/views/test/iconList'),
          meta: {
            title: '测试',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/bbs/postlist',
      name: 'postList',
      component: () => import('@/views/bbs/postList'),
      meta: {
        title: '帖子列表',
        keepAlive: false
      }
    },
    {
      path: '/post/detail',
      name: 'postDetail',
      component: () => import('@/views/bbs/postDetail'),
      meta: {
        title: '帖子详细页',
        keepAlive: false
      }
    },
    {
      path: '/mine/focus',
      name: 'focus',
      component: () => import('@/views/mine/focus'),
      meta: {
        title: '关注',
        keepAlive: true
      }
    },
    {
      path: '/mine/fans',
      name: 'fans',
      component: () => import('@/views/mine/fans'),
      meta: {
        title: '粉丝',
        keepAlive: true
      }
    },
    {
      path: '/mine/settings',
      name: 'settings',
      component: () => import('@/views/mine/settings'),
      meta: {
        title: '设置',
        keepAlive: true
      }
    },
    {
      path: '/mine/about',
      name: 'about',
      component: () => import('@/views/mine/about'),
      meta: {
        title: '关于本站',
        keepAlive: true
      }
    },
    {
      path: '/mine/edition',
      name: 'edition',
      component: () => import('@/views/mine/edition'),
      meta: {
        title: '版本信息',
        keepAlive: true
      }
    },
    {
      path: '/post/addPostHead',
      name: 'addPostHead',
      component: () => import('@/views/bbs/addPostHead'),
      meta: {
        title: '发布主题',
        keepAlive: true
      }
    },
    {
      path: '/mine/setNote',
      name: 'setNote',
      component: () => import('@/views/mine/setNote'),
      meta: {
        title: '发布主题',
        keepAlive: true
      }
    },
    {
      path: '/mine/test',
      name: 'testPage',
      component: () => import('@/components/emoji/lib/emojiTextPanel'),
      meta: {
        title: '测试',
        keepAlive: true
      }
    },
    {
      path: '/mine/personalSettings',
      name: 'personalSettings',
      component: () => import('@/views/mine/personalSettings'),
      meta: {
        title: '个人资料',
        keepAlive: true
      }
    },
    {
      path: '/bbs/clubSearch',
      name: 'searchClub',
      component: () => import('@/views/bbs/searchClub'),
      meta: {
        title: '搜索',
        keepAlive: false
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  Store.commit('setIndexRouterKeepAlive', to.name)
  console.log(Store.getters.getIndexRouterKeepalive, '123')
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
