import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import FeatureEdit from '@/pages/FeatureEdit';
import Map from '@/pages/Map';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    },
    {
      path: '/featureEdit',
      name: 'featureEdit',
      component: FeatureEdit
    }
  ]
})
