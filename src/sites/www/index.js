import { useFalcor } from '~/modules/avl-falcor';
import { useAuth } from "~/modules/ams/src";

import CMS from './pages/cms'


import DamaRoutes from "~/pages/DataManager"
import hazmitDataTypes from "~/pages/HazmitDataTypes"


const Routes = [
  // -- Admin Routes -- //
  // Admin,
  ...DamaRoutes({
    baseUrl:'/cenrep',
    defaultPgEnv : "hazmit_dama",
    //navSettings: authMenuConfig,
    dataTypes: hazmitDataTypes,
    useFalcor,
    useAuth
  }),
  // Templates,
  // Interactive,
  // -- Managed Data Routes -- //
  // -- Front End Routes -- //
  CMS
]

const site = {
	Routes
}

export default site