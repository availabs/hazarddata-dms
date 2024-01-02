import checkAuth  from "~/layout/checkAuth"
import { dmsPageFactory, registerDataType } from "~/modules/dms/src"
import { withAuth } from "~/modules/ams/src" 




import templateConfig from '~/modules/dms/src/patterns/page/template/templatesConfig'
// import templatesConfig from './templatesConfig'


import Selector, { registerComponents } from "~/modules/dms/src/patterns/page/selector"
registerDataType("selector", Selector)


export default { 
  ...dmsPageFactory(templateConfig({ 
    app: "dms-site",
    type: "format-page-ctp",
    baseUrl: "/admin/templates",
    checkAuth
  }), "/admin/templates/",  withAuth),
  name: "Templates",
  sideNav: {
    size: "compact",
    color: 'white',
  },
  topNav: {
    position: 'fixed'
  }
  
}