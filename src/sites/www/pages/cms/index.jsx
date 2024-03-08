
import { dmsPageFactory, registerDataType } from "~/modules/dms/src"
import { withAuth } from "~/modules/ams/src" 
import { useFalcor } from '~/modules/avl-falcor';
import checkAuth  from "~/layout/checkAuth"
import Logo from '~/layout/Logo'
import AuthMenu from "~/pages/Auth/AuthMenu"


import siteConfig from '~/modules/dms/src/patterns/page/siteConfig'
import ComponentRegistry from '~/component_registry'
import Selector, { registerComponents } from "~/modules/dms/src/patterns/page/selector"

import theme from './theme'
import CountyHeader from "~/additional_components/CountyHeader.jsx";

registerDataType("selector", Selector)
registerComponents({...ComponentRegistry, "Header: County Header II": CountyHeader})




export default { 
  ...dmsPageFactory(
    siteConfig({ 
      app: "dms-site",
      type: "docs-ctp",
      logo: <Logo />, 
      rightMenu: <AuthMenu />,
      baseUrl: "",
      checkAuth,
      useFalcor,
      theme
    }
  ), "/",  withAuth),
  name: "CMS",
  sideNav: {
    size: "none"
  },
  topNav: {
    size: "none"
  }
}