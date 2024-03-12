import React, { useMemo, useState, useEffect }from 'react'
import {ButtonSelector} from "../../component_registry/shared/buttonSelector.jsx";
import {isJson} from "~/utils/macros.jsx";
import GeographySearch from "../../component_registry/shared/geographySearch.jsx";
import {EditMap,ViewMap} from "../../component_registry/shared/TemplateMap";
import {pgEnv} from "~/utils";
import get from 'lodash/get'
import DataDownload from './DataDownload.jsx'
//bg-[#da4e00]
// [#f8f4ec]


export function Header () {
  
  return (
    <div className="mt-0 min-h-screen">
  <div className="relative max-w-screen-xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
    <svg
      className="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
      width={404}
      height={784}
      fill="none"
      viewBox="0 0 404 784"
    >
      <defs>
        <pattern
          id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
          x={0}
          y={0}
          width={20}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={0}
            y={0}
            width={4}
            height={4}
            className="text-gray-200"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect
        width={404}
        height={784}
        fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
      />
    </svg>
    <div className="relative lg:grid lg:grid-cols-3 lg:col-gap-8">
      <div className="lg:col-span-1">
        <h3 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Download Data for Planning.
        </h3>
        <div className="mt-10 sm:grid sm:grid-cols-2 sm:col-gap-8 sm:row-gap-10 lg:col-span-2 lg:mt-0">
        <div className="mt-10 sm:mt-0 col-span-2">
          
          <div className="mt-5">
            <h4 className="text-lg leading-6 font-medium text-gray-900">
             
            </h4>
            <p className="mt-2 text-base leading-6 text-gray-500">
             This page allows users to download natural hazard loss data at a variety of geographies including the NCEI Storm Events Data, the SBA Disaster Loans, and the FEMA Public Assistance and Individual Assistance datasets. Below you can find instructions for setting specific parameters to download the data that works for you.

            </p>
          </div>
        </div>
        <div className='col-span-2'>
          {/*<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>*/}
          <div className="mt-5">
            <h4 className="text-lg leading-6 font-medium text-gray-900">
              National Data
            </h4>
            <p className="mt-2 text-base leading-6 text-gray-500">
              To download national data simply the select the dataset of your choice and leave all filters unselected. Click export data.
            </p>
          </div>
        </div>
        <div className="mt-10 sm:mt-0 col-span-2">
          {/*<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
          </div>*/}
          <div className="mt-5 col">
            <h4 className="text-lg leading-6 font-medium text-gray-900">
              County Data
            </h4>
            <p className="mt-2 text-base leading-6 text-gray-500">
              You can pull any of the three datasets for any state or county the United States and Puerto Rico by using the State filter to select the state or county. You can also select the state first and the use the County filter to select all of the counties or a single county within that state.

            </p>
          </div>
        </div>
        <div className="mt-10 sm:mt-0 col-span-2">
          {/*<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>*/}
          {/*<div className="mt-5">
            <h4 className="text-lg leading-6 font-medium text-gray-900">
              Local Data
            </h4>
            <p className="mt-2 text-base leading-6 text-gray-500">
              To download data at the municipal or census tract level, you must first select a county, then use the Geo Level filter to select Municipality or Tracts
            </p>
          </div>*/}
        </div>
        </div>
      </div>
      <div className="mt-10 sm:grid sm:grid-cols-2 sm:col-gap-8 sm:row-gap-10 lg:col-span-2 lg:mt-0">
        
        <div className="w-full sm:grid sm:col-gap-8 sm:row-gap-10 lg:col-span-2 lg:mt-0 pl-4">
          <DataDownload/>
        </div>

      </div>
    </div>
  </div>
</div>
  )
}

const getData = async ({geoid, title, subTitle, link='2023 Update'},falcor) =>{
  
  console.log('county header getData', title)
  const mapLayer =  await getMapLayer(geoid,falcor)
  return {
      title,
      subTitle,
      link,
      mapLayer
  }
}

const Edit = ({value, onChange, size}) => {
    
    // let cachedData = useMemo(() => {
    //     return value && isJson(value) ? JSON.parse(value) : {}
    // }, [value]);

    //console.log('Edit: value,', size)
   
    // const baseUrl = '/';

    // const ealSourceId = 343;
    // const [loading, setLoading] = useState(true);
    // const [status, setStatus] = useState('');
    // const [compData, setCompData] = useState({
    //     geoid: cachedData.geoid || '36001',
    //     title: cachedData.title || '', 
    //     subTitle: cachedData.subTitle || 'County Profile', 
    //     link: cachedData.link || '2023 Update',
    //     mapLayer: cachedData.mapLayer || getMapLayer(cachedData.geoid || '36001')
    // })

    // useEffect(() => {
    //   if(value !== JSON.stringify(compData)) {
    //     onChange(JSON.stringify(compData))
    //   }
    // },[compData])

    return (
      <div className='w-full'>
        <div className='relative'>
          <Header />
        </div>
      </div>
    ) 

}

const View = ({value}) => {
    if(!value) return ''
    let data = {}
    // let data = typeof value === 'object' ?
    //     value['element-data'] : 
    //     JSON.parse(value)
    
    return <Header {...data} />
             
}

Edit.settings = {
    hasControls: true,
    name: 'ElementEdit'
}


export default {
    "name": 'Header: Data Download',
    "type": 'Header',
    "variables": [
        { 
          name:'view_id',
          default: '36001',
        },
        {
          name: 'geoid'
        }
    ],
    getData,
    "EditComp": Edit,
    "ViewComp": View
}