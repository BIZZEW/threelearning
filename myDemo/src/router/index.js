import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ThreeDemo from '@/components/ThreeDemo'
import { Slider } from "element-ui";

Vue.use(Slider);

Vue.use(Router);



export default new Router({
  routes: [
    {
      path: '/',
      name: 'ThreeDemo',
      component: ThreeDemo,
    }
  ]
})
