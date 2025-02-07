import React, {useState, useEffect} from 'react'


import { DmsSite, registerDataType, Selector, adminConfig, registerComponents } from "~/modules/dms/src/"
import ComponentRegistry from '~/component_registry'
import themes from '~/dms_themes'

import { withAuth, useAuth } from "~/modules/ams/src"
import Auth from '~/pages/Auth'

import DamaRoutes from "~/pages/DataManager"
import hazmitDataTypes from "~/pages/HazmitDataTypes"
// import { authMenuConfig } from "~/layout/authMenuConfig"
import { useFalcor } from "~/modules/avl-falcor"
import LayoutWrapper from "~/layout/LayoutWrapper"


import CustomComponents from "~/additional_components";
import { DamaMap } from '~/pages/DataManager'
import siteData from './siteData.json'

// import BuildingFootprintsDownload from "./buildings_download"



registerDataType("selector", Selector)
registerComponents({...ComponentRegistry, ...CustomComponents})
registerComponents({
  "Map: Dama Map": DamaMap,
})

registerDataType("selector", Selector)


Auth.forEach(f => {
  f.Component = f.element 
  delete f.element
})

function App() {
    return (
      <DmsSite
        dmsConfig = {
          adminConfig({
            app: 'dms-site',
            type: 'prod'
          })
        }
        defaultData={siteData}
        authWrapper={withAuth}
        themes={themes}
        // API_HOST='http://localhost:4444'
        
        routes={[
          //cenrep
          ...DamaRoutes({
              baseUrl:'/cenrep',
              defaultPgEnv : "hazmit_dama",
              //navSettings: authMenuConfig,
              dataTypes: hazmitDataTypes,
              useFalcor,
              useAuth
            }),
          // Auth
          ...Auth
        ]} 
      />
    )
}

export default App




// import React, {useMemo} from 'react';
// import {
//   createBrowserRouter,
//   RouterProvider
// } from "react-router-dom";

// // import { Messages } from '~/modules/avl-components/src'
// import { Messages } from '~/modules/ams/src'

// import Layout from '~/layout/avail-layout'
// import LayoutWrapper from '~/layout/LayoutWrapper'

// import { getSubdomain }  from '~/utils'

// import DefaultRoutes from '~/routes'
// import www from '~/sites/www'

// import { DmsSite, dmsSiteFactory, registerDataType, Selector, adminConfig, registerComponents } from "~/modules/dms/src/"


// const Sites = {
//   www
// }

// function App (props) {
//   const SUBDOMAIN = getSubdomain(window.location.host)
  
//   const site = useMemo(() => {
//       return Sites?.[SUBDOMAIN] || Sites['www']
//   },[SUBDOMAIN])

//   const WrappedRoutes =  useMemo(() => {
//     const Routes = [...site.Routes, ...DefaultRoutes]
//     return LayoutWrapper(Routes, Layout)
//   }, [site])
  
  
//   return (
//     <>
//       <RouterProvider router={createBrowserRouter(WrappedRoutes)} />
//       <Messages />
//     </>
//   )

  
// }

// export default App;

