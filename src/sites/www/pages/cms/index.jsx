
import { dmsPageFactory, registerDataType } from "~/modules/dms/src"
import { withAuth } from "~/modules/ams/src" 
import checkAuth  from "~/layout/checkAuth"
import Logo from '~/layout/Logo'
import AuthMenu from "~/pages/Auth/AuthMenu"


import siteConfig from '~/modules/dms/src/patterns/page/siteConfig'
import ComponentRegistry from '~/component_registry'
import Selector, { registerComponents } from "~/modules/dms/src/patterns/page/selector"

registerDataType("selector", Selector)
registerComponents(ComponentRegistry)


const theme = {
  page: {
    container: 'flex-1 w-full h-full ',
    content:'flex-1 flex px-4'
  },
  layout: {
    page: 'h-full w-full bg-gradient-to-r from-[#f8f4ec] to-[#fefefe] flex flex-col',
    container: 'w-full flex-1 flex flex-col',

  },
  navPadding: {
    1: 'pt-0 ',
    2: 'md:pt-12 pt-0',
    3: 'md:pt-24 pt-0'
  } 
}

export default { 
  ...dmsPageFactory(
    siteConfig({ 
      app: "dms-site",
      type: "docs-ctp",
      logo: <Logo />, 
      rightMenu: <AuthMenu />,
      baseUrl: "",
      checkAuth,
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