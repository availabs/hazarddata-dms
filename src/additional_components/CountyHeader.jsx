import React, { useMemo, useState, useEffect }from 'react'
import {ButtonSelector} from "../component_registry/shared/buttonSelector.jsx";
import {isJson} from "~/utils/macros.jsx";
import GeographySearch from "../component_registry/shared/geographySearch.jsx";
import {EditMap,ViewMap} from "../component_registry/shared/TemplateMap";


export function Header ({  title = '', bgClass='yellow', subTitle='County Profile', link='#', mapLayer={},}) {
  
  return (
    <div className={`h-[300px] w-full flex border-2 border-yellow-500 bg-gradient-to-br from-yellow-100 to-yellow-500 rounded-lg `}>
      <div className='p-2 h-full w-[250px] pl-8'>
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
        <div className='text-lg tracking-wider pt-2 sm:text-3xl font-bold text-blue-500 text-right w-full uppercase'>
          {subTitle && <div>{subTitle}</div>}
        </div>
        <div className='text-sm tracking-wider sm:text-sm font-bold text-blue-500 text-right w-full uppercase'>
          <a href={link} target="_blank">Local Hazard Mitigation Plan <i  className='fa fa-book' /></a>
        </div>
        <div className='flex-1'/>
      </div>
    </div>
  )
}

function getMapLayer(geoid) {
  return {
         sources : [{
          id: "counties",
          source: {
            "type": "vector",
            "url": "https://dama-dev.availabs.org/tiles/data/hazmit_dama_s365_v778_1694455888142.json"
          },
        }],
        layers:[{
            "id": "counties",
            "source": "counties",
            "source-layer": "s365_v778",
            "type": "fill",
            "filter" :  ['in', geoid.substring(0,2), ['string', ['get', 'geoid']]],
            
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
                '#e1e1e1'
              ]

              // '#ddd', //["get", ["get", "geoid"], ["literal", {[geoid]: 'yellow'}]],
            }
          },
          {
            "id": "counties-line",
            "source": "counties",
            "source-layer": "s365_v778",
            "type": "line",
            "filter" :  ['in', geoid.substring(0,2), ['string', ['get', 'geoid']]],
            "paint": {
              "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5, 0.5,
                22, 1
              ],
              "line-color": "#7e7e7e",
              "line-opacity": 0.5
            }
        }],
        mapFocus: [-79.761313,40.477399,-71.777491,45.01084]
      }
}

const getData = ({geoid, title, subTitle, link='2023 Update'}) =>{
  
  console.log('county header getData', title)
  return new Promise((resolve, reject) => {
    resolve({
        geoid,
      title,
      subTitle,
      link,
      mapLayer: getMapLayer(geoid)
    })
  })
}

const Edit = ({value, onChange, size}) => {
    
    let cachedData = useMemo(() => {
        return value && isJson(value) ? JSON.parse(value) : {}
    }, [value]);

    console.log('Edit: value,', cachedData, value)
   
    const baseUrl = '/';

    const ealSourceId = 343;
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [compData, setCompData] = useState({
        geoid: cachedData.geoid || '36001',
        title: cachedData.title || '', 
        subTitle: cachedData.subTitle || 'County Profile', 
        link: cachedData.link || '2023 Update',
        mapLayer: getMapLayer(cachedData.geoid || '36001'),
        bgClass: 'yellow',
    })

    useEffect(() => {
        console.log('compData', compData, value)
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
                onChange={(v) =>  setCompData({...compData, geoid: v, mapLayer: getMapLayer(v)})}
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
    "name": 'Header: County II',
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
          default: '2023 Update',
        }
    ],
    getData,
    "EditComp": Edit,
    "ViewComp": View
}