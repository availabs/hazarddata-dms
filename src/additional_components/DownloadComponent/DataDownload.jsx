import React from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
//import {setActiveStateGeoid} from "../../store/modules/stormEvents";
//import {CSVLink} from "react-csv";
// import PromptModal from "./PromptModal";


const fips = ["01", "02", "04", "05", "06", "08", "09", "10", "11", "12", "13", "15", "16", "17", "18", "19", "20", "21", "22", "23",
    "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "44", "45", "46",
    "47", "48", "49", "50", "51", "53", "54", "55", "56","72","60","66","78"]
const hazards = [
    {value:'wind', name:'Wind'},
    {value:'wildfire', name:'Wildfire'},
    {value:'tsunami', name:'Tsunami/Seiche'},
    {value:'tornado', name:'Tornado'},
    {value:'riverine', name:'Flooding'},
    {value:'lightning', name:'Lightning'},
    {value:'landslide', name:'Landslide'},
    {value:'icestorm', name:'Ice Storm'},
    {value:'hurricane', name:'Hurricane'},
    {value:'heatwave', name:'Heat Wave'},
    {value:'hail', name:'Hail'},
    {value:'earthquake', name:'Earthquake'},
    {value:'drought', name:'Drought'},
    {value:'avalanche', name:'Avalanche'},
    {value:'coldwave', name:'Coldwave'},
    {value:'winterweat', name:'Snow Storm'},
    {value:'volcano', name:'Volcano'},
    {value:'coastal', name:'Coastal Hazards'}
];

const states_data = {
   "00": "National Data",
   "01": "Alabama",
   "02": "Alaska",
   "04": "Arizona",
   "05": "Arkansas",
   "06": "California",
   "08": "Colorado",
   "09": "Connecticut",
   "10": "Delaware",
   "11": "District of Columbia",
   "12": "Florida",
   "13": "Geogia",
   "15": "Hawaii",
   "16": "Idaho",
   "17": "Illinois",
   "18": "Indiana",
   "19": "Iowa",
   "20": "Kansas",
   "21": "Kentucky",
   "22": "Louisiana",
   "23": "Maine",
   "24": "Maryland",
   "25": "Massachusetts",
   "26": "Michigan",
   "27": "Minnesota",
   "28": "Mississippi",
   "29": "Missouri",
   "30": "Montana",
   "31": "Nebraska",
   "32": "Nevada",
   "33": "New Hampshire",
   "34": "New Jersey",
   "35": "New Mexico",
   "36": "New York",
   "37": "North Carolina",
   "38": "North Dakota",
   "39": "Ohio",
   "40": "Oklahoma",
   "41": "Oregon",
   "42": "Pennsylvania",
   "44": "Rhode Island",
   "45": "South Carolina",
   "46": "South Dakota",
   "47": "Tennessee",
   "48": "Texas",
   "49": "Utah",
   "50": "Vermont",
   "51": "Virginia",
   "53": "Washington",
   "54": "West Virginia",
   "55": "Wisconsin",
   "56": "Wyoming"
}

const DataDownload = (props) => {
    
    const [state, setState] = React.useState({
            dataset : 'severeWeather',
            datasets :[{name : 'AVAIL Fusion Events Data',value : 'severeWeather'},{name:'AVAIL Fusion Annual County Data',value:'sba'}],
            state_fips:null,
            county:'',
            geolevel: 'counties',
            geolevels:[{name : 'County',value : 'counties',disabled:false},{name:'Municipality',value:'cousubs',disabled:true},{name:'Tracts',value:'tracts',disabled:true}],
            geolevels_sba:[{name : 'County',value : 'counties',disabled:false},{name:'Zip Codes',value:'zip_codes',disabled:true}],
            hazard: new Map(),
            user_hazards :[],
            data: [],
            loading:false,
            changed: false

    })
   


    // onChange(e) {
    //     console.log('---',e.target.id,e.target.value,state);
    //     if(e.target.id === 'hazard'){
    //         const isChecked = e.target.checked
    //         let value = e.target.value
    //         const object  = state;
    //         if(value === 'all'){
    //             let  hazard: object.hazard.set(hazard.value,isChecked)
    //             hazards.forEach(hazard =>{
    //                 setState({...state, });
    //             })


    //         }else{
    //             setState({...state,hazard: object.hazard.set(value,isChecked) });
    //         }
    //         setState({
    //             ...state,
    //             user_hazards : Array.from(state.hazard, ([hazard, value]) => ({hazard, value}))
    //                 .reduce((a,c) =>{
    //                     if(c.value){
    //                         a.push(c.hazard)
    //                     }
    //                     return a
    //                 },[])
    //         })
    //     }else{
    //         /*if(e.target.id === 'geolevel'){
    //             console.log('check',e.target)
    //         }*/
    //         setState({ ...state, [e.target.id]: e.target.value });
    //     }
    // }

    // componentDidUpdate(prevProps,prevState,snapshot){
    //     if(state.dataset !== prevState.dataset
    //         || (state.state_fips !== prevState.state_fips)
    //         || (state.county !== prevState.county)
    //         || !_.isEqual(state.user_hazards,prevState.user_hazards)
    //         || state.geolevel !== prevState.geolevel
    //     ){
    //         this.setState({
    //             changed: true
    //         })
    //         this.fetchFalcorDeps().then(async d =>{
    //             const res = await this.processData()
    //             if(res.length >0){
    //                 this.setState({
    //                     loading : false,
    //                     data : res
    //                 })
    //             }
    //         })
    //     }
    //     if(state.loading){
    //         this.fetchFalcorDeps().then(async d =>{
    //             const res = await this.processData()
    //             if(res.length >0){
    //                 this.setState({
    //                     loading : false,
    //                     data : res,
    //                     changed:false
    //                 })
    //             }
    //         })
    //     }
    //     if(state.state_fips !== prevState.state_fips){
    //         this.setState({
    //             changed: true
    //         })
    //         this.countiesDataDropDown()
    //     }
    // }

    // fetchFalcorDeps(){
    //     const attributes = state.dataset === 'severeWeather' ? ['total_damage', 'num_episodes','property_damage','crop_damage','num_episodes','num_events'] :
    //         state.dataset === 'fema' ? [
    //             'ia_ihp_amount',
    //             'ia_ihp_count',
    //             'pa_project_amount',
    //             'pa_federal_share_obligated',
    //             'hma_prop_actual_amount_paid',
    //             'hma_prop_number_of_properties',
    //             'hma_proj_project_amount',
    //             'hma_proj_project_amount_count',
    //             'hma_proj_federal_share_obligated',
    //             'hma_proj_federal_share_obligated_count',
    //             'total_cost',
    //             "total_cost_summaries",
    //             "total_disasters"
    //         ] : ['total_loss','loan_total','num_loans']
    //     return this.props.falcor.get(['geo',fips,'name'])
    //         .then(response =>{
    //             if(state.state_fips){
    //                 this.props.falcor.get(['geo',state.state_fips,'counties','geoid'])
    //                     .then(response =>{
    //                         this.counties = Object.values(response.json.geo)
    //                             .reduce((out, state) => {
    //                                 if (state.counties) {
    //                                     out = [...out, ...state.counties]
    //                                 }
    //                                 return out
    //                             }, [])
    //                         this.props.falcor.get(['geo',state.county !== '' ? state.county : this.counties,state.geolevel])
    //                             .then( async response =>{
    //                                 this.filtered_geo = Object.values(response.json.geo)
    //                                     .reduce((out, state) => {
    //                                         if (state[state.geolevel]) {
    //                                             out = [...out, ...state[state.geolevel]]
    //                                         }
    //                                         return out
    //                                     }, [])

    //                                 await this.props.falcor.get(['geo',this.filtered_geo,'name'])
    //                                 if(this.filtered_geo.length > 0 && state.dataset!== 'sba' && state.user_hazards.length && state.geolevel !== 'zip_codes'){
    //                                     let dataset =  state.dataset === 'fema' ? ['fema','disasters'] : [state.dataset]
    //                                         let chunks = _.chunk(this.filtered_geo,20)
    //                                         let disaster_requests = []
    //                                         chunks.forEach(chunk =>{
    //                                             disaster_requests.push([...dataset,chunk,state.user_hazards,[{
    //                                                 from: 1996,
    //                                                 to: 2019
    //                                             }], attributes])
    //                                         })
    //                                         return disaster_requests.reduce((a, c, cI) => a.then(() => {
    //                                             this.props.falcor.get(c)
    //                                                 .then(response =>{
    //                                                     return response
    //                                                 })
    //                                         }), Promise.resolve())
    //                                             .then(response =>{
    //                                                 return response
    //                                             })
    //                                 }
    //                                 if(state.dataset === 'sba' && state.user_hazards.length){
    //                                     if(state.geolevel === 'zip_codes' && state.county !== "") {
    //                                         this.props.falcor.get(['geo',state.county, 'byZip', ['zip_codes']])
    //                                             .then(async response =>{
    //                                                 this.zip_codes = Object.values(response.json.geo).reduce((out, geo) => {
    //                                                     if (geo.byZip) {
    //                                                         out = [...out, ...geo.byZip['zip_codes']]
    //                                                     }
    //                                                     return out
    //                                                 }, [])
    //                                                 return await this.props.falcor.get([state.dataset,'all','byZip',this.zip_codes,state.user_hazards, [{
    //                                                     from: 1996,
    //                                                     to: 2018
    //                                                 }], attributes])
    //                                             })
    //                                     }
    //                                     else {
    //                                         let chunks = _.chunk(this.filtered_geo,20),requests = []
    //                                         chunks.forEach(chunk =>{
    //                                             requests.push([state.dataset, 'all',chunk, state.user_hazards, [{
    //                                                 from: 1996,
    //                                                 to: 2018
    //                                             }], attributes])
    //                                         })
    //                                         return requests.reduce((a, c, cI) => a.then(() => {
    //                                             this.props.falcor.get(c)
    //                                                 .then(response =>{
    //                                                     return response
    //                                                 })
    //                                         }), Promise.resolve())
    //                                             .then(response =>{
    //                                                 return response
    //                                             })
    //                                     }
    //                                 }
    //                                 if(state.dataset === 'fema' && state.geolevel === 'zip_codes' && state.county !== ""){
    //                                     this.props.falcor.get(['geo',state.county, 'byZip', ['zip_codes']])
    //                                         .then(async response =>{
    //                                             this.zip_codes = Object.values(response.json.geo).reduce((out, geo) => {
    //                                                 if (geo.byZip) {
    //                                                     out = [...out, ...geo.byZip['zip_codes']]
    //                                                 }
    //                                                 return out
    //                                             }, [])
    //                                             return await this.props.falcor.get(['fema','disasters','byZip',this.zip_codes,state.user_hazards, [{
    //                                                 from: 1996,
    //                                                 to: 2019
    //                                             }], attributes])
    //                                         })
    //                                 }
    //                                 return response
    //                             })
    //                         return response
    //                 })
    //             }
    //             return response
    //         })

    // }

    // statesDataDropDown(){
    //     let geo = get(this.props.falcorCache,['geo'],{})
    //     let states_data = []
    //     Object.keys(geo).filter(d => d !== '$__path')
    //         .forEach(d=>{
    //             if(fips.includes(d)){
    //                 states_data.push({
    //                     fips:d,
    //                     name:get(geo,[d,'name'],'')
    //                 })
    //             }

    //         })
    //     states_data = states_data.sort((a,b) => a.name.localeCompare(b.name))
    //     return states_data

    // }

    // countiesDataDropDown(){
    //     if(state.state_fips){
    //         let counties_data = []
    //         let counties = get(this.props.falcorCache,['geo'],{})
    //         Object.keys(counties).forEach(c=>{
    //             if(c.slice(0,2) === state.state_fips && c.length ===5){
    //                 counties_data.push({
    //                     value : c,
    //                     name: counties[c].name || ''
    //                 })
    //             }
    //         })
    //         counties_data = counties_data.sort((a,b) => a.name.localeCompare(b.name))
    //         return counties_data
    //     }
    // }

    // processData(){
    //     let data = []
    //     let data_set = state.geolevel !== 'zip_codes' ?
    //         state.dataset === 'fema' ? `fema.disasters` : state.dataset :
    //         state.dataset === 'fema' ? `fema.disasters.byZip` : state.dataset
    //     let user_hazards = state.user_hazards
    //     let falcorCache = this.props.falcorCache
    //     let fetchedData = get(falcorCache,data_set,null)
    //     let attributes = state.dataset === 'severeWeather' ? ['total_damage', 'num_episodes','property_damage','crop_damage','num_episodes','num_events'] :
    //         state.dataset === 'fema' ? [
    //             'ia_ihp_amount',
    //             'ia_ihp_count',
    //             'pa_project_amount',
    //             'pa_federal_share_obligated',
    //             'hma_prop_actual_amount_paid',
    //             'hma_prop_number_of_properties',
    //             'hma_proj_project_amount',
    //             'hma_proj_project_amount_count',
    //             'hma_proj_federal_share_obligated',
    //             'hma_proj_federal_share_obligated_count',
    //             'total_cost',
    //             "total_cost_summaries",
    //             "total_disasters"
    //         ] : ['total_loss','loan_total','num_loans']
    //     if(data_set !== 'sba' && hazards.length && fetchedData){
    //         Object.keys(fetchedData).filter(d => d!== '$__path').forEach(geo =>{
    //             user_hazards.forEach(hazard =>{
    //                 let d = get(fetchedData[geo],[hazard],{})
    //                 Object.keys(d).filter(d => d!=='$__path').forEach(item =>{

    //                     data.push(
    //                         attributes.reduce((a,c) =>{
    //                             a[c]= state.dataset === 'fema' ? get(fetchedData[geo], [hazard, item,c,'value'], 0):get(fetchedData[geo], [hazard, item,c], 0)
    //                             a['name'] = get(falcorCache,['geo',geo,'name'],'')
    //                             a['year'] = item
    //                             a['hazard'] = hazards.reduce((a,c) =>{
    //                                 if(c.value === hazard){
    //                                     a = c.name
    //                                 }
    //                                 return a
    //                             },'')
    //                             return a
    //                         },{})
    //                     )
    //                 })
    //             })
    //         })
    //     }
    //     if(data_set === 'sba' && hazards.length && fetchedData){
    //         let fetchedData = state.geolevel === 'zip_codes' ?
    //             get(falcorCache,[data_set,'all','byZip'],{}) :
    //             get(falcorCache,[data_set,'all'],{})
    //         Object.keys(fetchedData).filter(d => d!== '$__path').forEach(geo =>{
    //             user_hazards.forEach(hazard =>{
    //                 let d = get(fetchedData[geo],[hazard],{})
    //                 Object.keys(d).filter(d => d!=='$__path').forEach(item =>{
    //                     data.push(
    //                         attributes.reduce((a,c) =>{
    //                             a[c]= get(fetchedData[geo], [hazard, item,c], 0)
    //                             a['name'] = get(falcorCache,['geo',geo,'name'],geo)
    //                             a['year'] = item
    //                             a['hazard'] = hazards.reduce((a,c) =>{
    //                                 if(c.value === hazard){
    //                                     a = c.name
    //                                 }
    //                                 return a
    //                             },'')
    //                             return a
    //                         },{})
    //                     )
    //                 })
    //             })
    //         })

    //     }
    //     console.log('data',data)
    //     return data
    // }

    // downloadHandler(e){
    //     e.preventDefault();
    //     this.setState({
    //         loading: true
    //     })
    // }



    return (
            <form>
                <div className="w-full max-w-full ">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Data Download
                            </h3>
                        </div>
                        <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700 flex-initial">
                                    Data Set <span className="text-red-600">*</span>
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        onChange={() => {}}
                                        value = {state.dataset}
                                        id = 'dataset'
                                        required
                                    >
                                        {state.datasets.map((item,i) =>{
                                            return(
                                                <option key={i} value={item.value}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="text-red-600 text-xs">{state.dataset === "" ? 'Please select a dataset' :null}</div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700 flex-initial">
                                    State <span className="text-red-600">*</span>
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        onChange={() => {}}
                                        value = {state.state_fips}
                                        id = 'state_fips'
                                    >
                                        <option key={0} value={"00"}>National Data</option>
                                        {Object.keys(states_data).map((fips,i) =>{
                                            return(
                                                <option key={i+1} value={fips}>{states_data[fips]}</option>
                                            )
                                        })}
                                        
                                    </select>
                                </div>
                                {/*<div className="text-red-600 text-xs">{!state.state_fips  ? 'Please select a State' :null}</div>*/}
                            </div>
                            {/*<div className="sm:col-span-6">
                                <label htmlFor="county" className="block text-sm font-medium leading-5 text-gray-700">
                                    County
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        onChange={() =>{}}
                                        value = {state.county}
                                        id = 'county'
                                    >
                                        <option key={0} value={""}>---Select all Counties---</option>
                                        {counties_data.length > 0 ? counties_data.map((item, i) => {
                                                return (
                                                    <option key={i + 1} value={item.value}>{item.name}</option>
                                                )
                                            })
                                            :
                                            null
                                        }
                                    </select>
                                </div>
                            </div>*/}
                            {/*<div className="sm:col-span-6">
                                <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700 flex-initial">
                                    Geo Level
                                    <span className="text-red-600">
                                        *
                                    </span>
                                    <span style={{'float': 'right'}}
                                    >
                                        <PromptModal prompt={'Please select a county in order to enable the sub geolevels'} id={'geo_level'}/>
                                        </span>

                                </label>
                               
                                <div className="text-red-600 text-xs">{state.geolevel === "" ? 'Please select a Geolevel' :null}</div>
                            </div>*/}
                            {/*<div className="sm:col-span-6">
                                <div className="mt-6 ">
                                    <fieldset>
                                        <div className="relative flex items-start">
                                            <div className="flex items-center h-5">
                                                <legend className="text-base font-medium text-gray-900 flex-initial">
                                                    Hazards <span className="text-red-600">*</span>
                                                </legend>
                                                <input id="hazard" type="checkbox"
                                                       name={'all'}
                                                       value={'all'}
                                                       className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ml-2"
                                                       onChange={() => {}}
                                                       checked={state.hazard.get(...hazards.map(d => d.value === true ? d.value: false))}
                                                ></input>
                                            </div>
                                            <div className="ml-3 text-sm leading-5">
                                                <label htmlFor="comments"
                                                       className="font-medium text-gray-700">Select All</label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {hazards.map((hazard,i) =>{
                                                return (
                                                    <div className="mt-4" key={i}>
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5">
                                                                <input id="hazard" type="checkbox"
                                                                       name={hazard.name}
                                                                       value={hazard.value}
                                                                       className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                                       onChange={() =>{}}
                                                                       checked={state.hazard.get(hazard.value)}
                                                                ></input>
                                                            </div>
                                                            <div className="ml-3 text-sm leading-5">
                                                                <label htmlFor="comments"
                                                                       className="font-medium text-gray-700">{hazard.name}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) }
                                        </div>
                                        <div className="text-red-600 text-xs">{state.hazard.size === 0 ? 'Please select at least one hazard' :null}</div>
                                    </fieldset>
                                </div>
                            </div>*/}
                            <div className="sm:col-span-2">
                                <div className="flex justify pt-4">
                                   
                                        <a
                                            onClick={() => {}}
                                            href='https://graph.availabs.org/files/hazmit_dama_834/AVAIL_Fusion_Events_v834.zip'
                                            target="_blank"
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">

                                            <svg className="fill-current w-4 h-4 mr-2"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                                            </svg>
                                            <span>Export Data</span>
                                        </a>
                                      

                                </div>
                                {state.loading ? 'Fetching Data ...' : null}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    
}

export default DataDownload
