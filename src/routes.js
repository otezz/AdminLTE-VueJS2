import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import DashboardIndex from './components/modules/dashboard/Index.vue'
import NotFound from './components/modules/dashboard/404.vue'
import WidgetsIndex from './components/modules/widgets/Index.vue'
import UIButtons from './components/modules/ui/Buttons.vue'
import UIGeneral from './components/modules/ui/General.vue'
import UIIcons from './components/modules/ui/Icons.vue'
import UIModals from './components/modules/ui/Modals.vue'
import UISliders from './components/modules/ui/Sliders.vue'
import UITimeline from './components/modules/ui/Timeline.vue'

// Routes
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      document.body.className = 'login-page'
      next()
    }
  }, {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      document.body.className += ' skin-blue sidebar-mini'
      next()
    },
    activate: function () {
      this.$nextTick(function () {
        // => 'DOM loaded and ready'
        alert('test')
      })
    },
    children: [
      {
        path: '',
        redirect: '/dashboard'
      }, {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardIndex
      }, {
        path: '/widgets',
        name: 'widgets',
        component: WidgetsIndex
      }, {
        path: '/ui/buttons',
        name: 'ui-buttons',
        component: UIButtons
      }, {
        path: '/ui/general',
        name: 'ui-general',
        component: UIGeneral
      }, {
        path: '/ui/icons',
        name: 'ui-icons',
        component: UIIcons
      }, {
        path: '/ui/modals',
        name: 'ui-modals',
        component: UIModals
      }, {
        path: '/ui/sliders',
        name: 'ui-sliders',
        component: UISliders
      }, {
        path: '/ui/timeline',
        name: 'ui-timeline',
        component: UITimeline
      }, {
        path: '*',
        name: '404',
        component: NotFound
      }
    ]
  }, {
    // not found handler
    path: '*',
    redirect: '/login'
  }
]

export default routes
