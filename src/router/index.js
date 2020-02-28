import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from "../components/Menu"
import home from "../views/home"
import news from "../views/news"
import research from "../views/research"
import team from "../views/team"
import results from "../views/results"
import recruit from "../views/recruit"
import contact from "../views/contact"
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default: home,
        menu:Menu
      }
    },
    {
      path:'/news',
      name: 'news',
      components: {
        default: news,
        menu:Menu
      }
    },{
      path:'/research',
      name: 'research',
      components: {
        default: research,
        menu:Menu
      }
    },{
      path:'/team',
      name: 'team',
      components: {
        default: team,
        menu:Menu
      }
    },{
      path:'/results',
      name: 'results',
      components: {
        default: results,
        menu:Menu
      }
    },{
      path:'/recruit',
      name: 'recruit',
      components: {
        default: recruit,
        menu:Menu
      }
    },{
      path:'/contact',
      name: 'contact',
      components: {
        default: contact,
        menu:Menu
      }
    }
  ] 
});

router.beforeEach(
);

// eslint-disable-next-line no-unused-vars
router.afterEach(transition => {
});

export default router
