import React, {useContext, useEffect, useMemo} from 'react';

import { getAttributes } from './attributes'
import { DamaContext } from '../store'

import { Dropdown } from '~/modules/avl-components/src'
import { Item } from '~/pages/Auth/AuthMenu'

import { Link, useParams } from 'react-router-dom'
import get from 'lodash/get'


const SourcesLayout = ({children }) => {
  const { baseUrl } = useContext(DamaContext)

  return (
    <div className="max-w-6xl mx-auto">
      <div className=''>
        <Breadcrumbs />
      </div>
      <div className='flex'>
        <div className='flex-1 '>
          {children}
        </div>
      </div>
    </div>
  )
}

export const Header = (
  <div className='pt-[2px]'>
    <div className='h-full'>
      <Dropdown control={
        <div className='px-2 flex text-lg'>
          <div className=' font-medium text-gray-800'> Data Manager</div>
          <div className='fal fa-angle-down px-3 mt-[6px] '/>
          <div style={{color: 'red', paddingLeft: '15px', fontWeight: 'bold' }}>PG</div>
        </div>}
        className={`text-gray-800 group`} openType='click'
      >
        <div key={'as'} className='p-1 bg-blue-500 text-base'>
          <div className='py-1 '>
              {Item(`/create/source`, 'fa fa-file-plus flex-shrink-0  pr-1', 'Add New Datasource')}
          </div>
        </div>
      </Dropdown>
    </div>

  </div>
)

export const DataManagerHeader = () => {
  // const { pgEnv } = React.useContext(DamaContext)
  // const baseUrl = '/'
  const { baseUrl='/', user={}} = {}

  return (
    <div className='pt-[2px]'>
      { user?.authLevel >= 5 ?
        (
          <div className='h-full'>
            <Dropdown control={
              <div className='px-2 flex text-lg'>
                <div className=' font-medium text-gray-800'> Data Manager</div>
                <div className='fal fa-angle-down px-3 mt-[6px] '/>
                
              </div>}
              className={`text-gray-800 group`} openType='click'
            >
              <div className='p-1 bg-blue-500 text-base'>
                <div className='py-1 '>
                    {Item(`${baseUrl}/create/source`, 'fa fa-file-plus flex-shrink-0  pr-1', 'Add New Datasource')}
                </div>
                {/*<div className='py-1 '>
                    {Item(`${baseUrl}/settings`, 'fa fa-cog flex-shrink-0  pr-1', 'Datamanager Settings')}
                </div>*/}
              </div>
            </Dropdown>
          </div>
        )
        : <div/>
      }
    </div>
  )
}


export default SourcesLayout

const Breadcrumbs =  () => {
  const { sourceId, page, cat1, cat2} = useParams()
  const { pgEnv, baseUrl, falcor , falcorCache } = React.useContext(DamaContext)

  // console.log('BreadCrumbs', baseUrl)

  useEffect(() => { 
    async function fetchData () {
      return sourceId ? await falcor.get(
        [
          "dama", pgEnv,"sources","byId",sourceId,
          "attributes",["categories","name", "data_type"]
        ]
      ) : Promise.resolve({})
    }
    fetchData()
  }, [falcor, sourceId, pgEnv])

  const pages = useMemo(() => {
    let attr = getAttributes(get(falcorCache,["dama", pgEnv,'sources','byId', sourceId],{'attributes': {}})['attributes']) 
    /*if(!get(attr, 'categories[0]', false)) { 
      return [{name:'',to:''}]
    }*/

    let catList = get(attr ,'categories[0]', false) || [cat1,cat2].filter(d => d)

    // console.log('BreadCrumbs', catList, cat1, cat2, get(attr ,'categories[0]', false))

    let cats = typeof catList !== 'object' ? [] 
      : catList.map((d,i) => {
        return {
          name: d,
          href: `${baseUrl}/cat/${i > 0 ? catList[i-1] + '/' : ''}${d}`        }
      })
    cats.push({name:attr.name})
    return cats

  },[falcorCache,sourceId,pgEnv, cat1, cat2, baseUrl])

  return (
    <nav className="border-b border-gray-200 flex " aria-label="Breadcrumb">
      <ol className="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link to={`${baseUrl || '/'}`} className={"hover:text-[#bbd4cb] text-[#679d89]"}>
              <i className="fad fa-database flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Data Sources</span>
            </Link>
          </div>
        </li>
        {pages.map((page,i) => (
          <li key={i} className="flex">
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-6 h-full text-gray-300"
                viewBox="0 0 30 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              {page.href ? 
                <Link
                  to={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </Link> :
                <div
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </div> 
              }
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}



