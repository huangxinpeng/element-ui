import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/pages/menu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      redirect:'/Home',
      component: Menu,
      children:[
        {
          path: 'Home',
          name: 'Home',
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/home/home'))
            })
          }
        },{
          path:'Activity',
          redirect:'/Activity/ActivityManage/ActivityAll',
        },{
          path: 'Activity/ActivityManage',
          name: 'ActivityManage',
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/activity/activityManage'))
            })
          },
          children:[
            {
              path:'ActivityAll',
              name:'ActivityAll',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/activity/manage/activityAll'))
                })
              }
            },{
              path:'ActivityRubbish',
              name:'ActivityRubbish',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/activity/manage/activityRubbish'))
                })
              }
            }
          ]
        },{
          path:'Activity/ActivityAdd',
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/activity/activityAdd'))
            })
          },
          children:[
            {
              path:'',
              name: 'ActivityAdd',
              redirect:{name:'ActivityPro1'}
            },{
              path:'ActivityPro1',
              name:'ActivityPro1',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/activity/add/activityPro_1'))
                })
              }
            },{
              path:'ActivityPro2',
              name:'ActivityPro2',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/activity/add/activityPro_2'))
                })
              }
            },{
              path:'ActivityPro3',
              name:'ActivityPro3',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/activity/add/activityPro_3'))
                })
              }
            },{
              path:'ActivityPro4',
              name:'ActivityPro4',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/activity/add/activityPro_4'))
                })
              }
            }
          ]
        },{
          path:'Evaluation',
          name:'Evaluation',
          redirect:{name:'EvaluationList'},
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/evaluation/evaluation'))
            })
          },
          children:[
            {
              path:'EvaluationList',
              name:'EvaluationList',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/evaluation/evaluationList'))
                })
              }
            }
          ]
        },{
          path:'Income',
          name:'Income',
          redirect:{name:'IncomeList'},
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/income/income'))
            })
          },
          children:[
            {
              path:'IncomeList',
              name:'IncomeList',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/income/incomeList'))
                })
              }
            }
          ]
        },{
          path:'User',
          name:'User',
          redirect:{name:'UserSign'},
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/user/user'))
            })
          },
          children:[
            {
              path:'UserSign',
              name:'UserSign',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/user/manage/userSign'))
                })
              }
            },{
              path:'UserPart',
              name:'UserPart',
              component(r) {
                require.ensure([], (require) => {
                  r(require('@/pages/user/manage/userPart'))
                })
              }
            }
          ]
        }
      ]
    },
    {
      path:'/Img',
      name:'Img',
      component(resolve) {
        require(['@/pages/imgCopy/img'], resolve)
      } 
    }
  ]
})
