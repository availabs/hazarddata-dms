import React, { useMemo, useState, useEffect }from 'react'
import {ButtonSelector} from "../component_registry/shared/buttonSelector.jsx";
import {isJson} from "~/utils/macros.jsx";
import GeographySearch from "../component_registry/shared/geographySearch.jsx";
import {EditMap,ViewMap} from "../component_registry/shared/TemplateMap";
import {pgEnv} from "~/utils";
import get from 'lodash/get'
//bg-[#da4e00]
// [#f8f4ec]

export function Header ({  title = '', bgClass='', subTitle='County Profile', link='#', mapLayer={},}) {
  
  return (
    <div className={`h-[300px] bg-cover bg-center w-full flex   bg-gradient-to-tr from-[#f8f4ec] to-[#fefefe]`}>
      <div className='p-2 h-full w-[350px] pl-8'>
        <ViewMap
            layerProps={{ccl: mapLayer}}
            legend={{show:false}}
        />
      </div>
      <div className='flex-1 flex flex-col  items-center p-4'>
        <div className='flex-1'/>
        <div className='text-3xl sm:text-7xl font-bold text-[#f2a91a] text-right w-full text-display'>
          {title && <div>{title}</div>}
        </div>
        <div className='text-lg tracking-wider pt-2 sm:text-3xl font-bold text-slate-200 text-right w-full uppercase'>
          {subTitle && <div>{subTitle}</div>}
        </div>
        {/*<div className='text-sm tracking-wider sm:text-sm font-bold text-slate-200 text-right w-full uppercase'>
          <a href={link} target="_blank">Local Hazard Mitigation Plan <i  className='fa fa-book' /></a>
        </div>*/}
        <div className='flex-1'/>
      </div>
    </div>
  )
}

async function getMapLayer(geoid,falcor) {
  
   const stateView = 285; // need to pull this based on categories
    const countyView = 286;

    // mapFocus
    const geomColTransform = [`st_asgeojson(st_envelope(ST_Simplify(geom, ${false && geoid?.toString()?.length === 5 ? `0.1` : `0.5`})), 9, 1) as geom`],
        geoIndices = {from: 0, to: 0},
        stateFips = geoid?.toString()?.substring(0, 2),
        geoPath = (view_id) =>
            ['dama', pgEnv, 'viewsbyId', view_id,
                'options', JSON.stringify({
                filter: {
                    geoid: [false && geoid?.toString()?.length >= 5 ? geoid : stateFips.substring(0, 2)]
                }}),
                'databyIndex'
            ];
    const geomRes = await falcor.get([...geoPath(false && geoid?.toString()?.length === 5 ? countyView : stateView), geoIndices, geomColTransform]);
    const geom = get(geomRes, ["json", ...geoPath(false && geoid?.toString()?.length === 5 ? countyView : stateView), 0, geomColTransform]);
    const mapFocus = get(JSON.parse(geom), 'bbox');
    // console.log('mapFocus', mapFocus)

  return {
         sources : [{
          id: "counties",
          source: {
            "type": "vector",
            "url": "https://tiles.availabs.org/data/tiger_carto.json"
          },
        }],
        layers:[{
            "id": "counties",
            "source": "counties",
            "source-layer": "s365_v778",
            "type": "fill",
            "filter" :   ['==', ['string', geoid.substring(0,2)], ['slice', ['string', ['get', 'geoid']],0,2]],
            
            "paint": {
              "fill-color": [
                'case',
                [
                  'has',
                  ['to-string', ['get', 'geoid']],
                  [
                    'literal',
                    {[geoid]: '#f2a91a'}
                  ]
                ],
                [
                  'get',
                  ['to-string', ['get', 'geoid']],
                  [
                    'literal',
                    {[geoid]: '#f2a91a'}
                  ]
                ],
                '#d0d0ce'
              ]

              // '#ddd', //["get", ["get", "geoid"], ["literal", {[geoid]: 'blue'}]],
            }
          },
          {
            "id": "counties-line",
            "source": "counties",
            "source-layer": "s365_v778",
            "type": "line",
            "filter" :  ['in', geoid.substring(0,2), ['slice', ['string', ['get', 'geoid']],0,2]],
            "paint": {
              "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5, 0.5,
                22, 1
              ],
              "line-color": "#efefef",//"#7e7e7e",
              "line-opacity": 0.5
            }
        }],
        mapFocus//: [-79.761313,40.477399,-71.777491,45.01084]
      }
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
    
    let cachedData = useMemo(() => {
        return value && isJson(value) ? JSON.parse(value) : {}
    }, [value]);

    //console.log('Edit: value,', size)
   
    const baseUrl = '/';

    const ealSourceId = 343;
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [compData, setCompData] = useState({
        geoid: cachedData.geoid || '36001',
        title: cachedData.title || '', 
        subTitle: cachedData.subTitle || 'County Profile', 
        link: cachedData.link || '2023 Update',
        mapLayer: cachedData.mapLayer || getMapLayer(cachedData.geoid || '36001')
    })

    useEffect(() => {
      if(value !== JSON.stringify(compData)) {
        onChange(JSON.stringify(compData))
      }
    },[compData])

    return (
      <div className='w-full'>
        <div className='relative'>
          <div className={'border rounded-md border-blue-500 bg-blue-50 p-2 m-1'}>
            <div className={'flex flex-row flex-wrap justify-between'}>
              <label className={'shrink-0 pr-2 py-1 my-1 w-1/4'}>Title:</label>
              <div className={`flex flex row w-3/4 shrink my-1`}>
                <input type='text' value={compData.title} onChange={(e) => setCompData({...compData, title: e.target.value})} />
              </div>
            </div>
            <GeographySearch value={compData.geoid} 
                onChange={(v) => setCompData({...compData, "geoid": v})} 
                className={'flex-row-reverse'}
            />

            <div className={'flex flex-row flex-wrap justify-between'}>
              <label className={'shrink-0 pr-2 py-1 my-1 w-1/4'}>subTitle:</label>
              <div className={`flex flex row w-3/4 shrink my-1`}>
                <input type='text' value={compData.subTitle} onChange={(e) => setCompData({...compData, subTitle: e.target.value})} />
              </div>
            </div>

            <div className={'flex flex-row flex-wrap justify-between'}>
              <label className={'shrink-0 pr-2 py-1 my-1 w-1/4'}>Note:</label>
              <div className={`flex flex row w-3/4 shrink my-1`}>
                <input type='text' value={compData.note} onChange={(e) => setCompData({...compData, note: e.target.value})} />
              </div>
            </div>

            <div className={'flex flex-row flex-wrap justify-between'}>
              <label className={'shrink-0 pr-2 py-1 my-1 w-1/4'}>Bg Class:</label>
              <div className={`flex flex row w-3/4 shrink my-1`}>
                <input type='text' value={compData.bgClass} onChange={(e) => setCompData({...compData, bgClass: e.target.value})} />
              </div>
            </div>
          </div>
          <Header {...compData}/>
        </div>
      </div>
    ) 

}

const View = ({value}) => {
    if(!value) return ''
    let data = typeof value === 'object' ?
        value['element-data'] : 
        JSON.parse(value)
    
    return <Header {...data} />
             
}

Edit.settings = {
    hasControls: true,
    name: 'ElementEdit'
}


export default {
    "name": 'Header: County 2',
    "type": 'Header',
    "variables": [
        { 
          name:'geoid',
          default: '36001',
        },
        { 
          name:'title',
          default: 'MitigateNY',
        },
        { 
          name: 'subTitle',
          default: 'New York State Hazard Mitigation Plan',
        },
        { 
          name:'link',
          default: '',
        }
    ],
    getData,
    "EditComp": Edit,
    "ViewComp": View
}