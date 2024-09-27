
import { dmsPageFactory, registerDataType, Selector, registerComponents} from "~/modules/dms/src"
import { withAuth } from "~/modules/ams/src" 
import { useFalcor } from '~/modules/avl-falcor';
import checkAuth  from "~/layout/checkAuth"
import Logo from '~/layout/Logo'
import AuthMenu from "~/pages/Auth/AuthMenu"


import { siteConfig } from '~/modules/dms/src/patterns/page/siteConfig'
import ComponentRegistry from '~/component_registry'

import theme from './theme'
import CustomComponents from "~/additional_components";
import { DamaMap } from '~/pages/DataManager'

// import BuildingFootprintsDownload from "./buildings_download"



registerDataType("selector", Selector)
registerComponents({...ComponentRegistry, ...CustomComponents})
registerComponents({
  "Map: Dama Map": DamaMap,
})



export default { 
  ...dmsPageFactory(
    siteConfig({ 
      app: "dms-site",
      type: "docs-ctp",
      baseUrl: "",
      useFalcor,
      theme,
      pgEnv:'hazmit_dama'
    }
  ), withAuth),
  name: "CMS",
  sideNav: {
    size: "none"
  },
  topNav: {
    size: "none"
  }
}