 // const bg = 'gray-50'
  const primary =  'nuetral'
  const highlight =  'white'
  const accent =  'blue'

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
  },
  sidenav: (opts={}) =>  {
        const {color = 'white', size = 'compact',  subMenuStyle = 'inline', responsive = 'top'} = opts
          let mobile = {
            top : 'hidden md:block',
            side: 'hidden md:block',
            none: ''
          }
          let colors = {
            white: {
              contentBg: `bg-${highlight}`,
              contentBgAccent: `bg-neutral-100`,
              accentColor: `${accent}-600`,
              accentBg: `hover:bg-${accent}-400`,
              borderColor: `border-${primary}-100`,
              textColor: `text-${primary}-600`,
              textColorAccent: `text-slate-800`,
              highlightColor: `text-${primary}-800`,
            },
            transparent: {
              contentBg: `bg-neutral-100`,
              contentBgAccent: `bg-neutral-100`,
              accentColor: `${accent}-600`,
              accentBg: `hover:bg-${accent}-400`,
              borderColor: `border-${primary}-100`,
              textColor: `text-${primary}-600`,
              textColorAccent: `text-slate-800`,
              highlightColor: `text-${primary}-800`,
            },
             dark: {
              contentBg: `bg-neutral-800`,
              contentBgAccent: `bg-neutral-900`,
              accentColor: `white`,
              accentBg: ``,
              borderColor: `border-neutral-700`,
              textColor: `text-slate-300`,
              textColorAccent: `text-slate-100`,
              highlightColor: `text-${highlight}`,
            },
            bright: {
              contentBg: `bg-${accent}-700`,
              accentColor: `${accent}-400`,
              accentBg: `hover:bg-${accent}-400`,
              borderColor: `border-${accent}-600`,
              textColor: `text-${highlight}`,
              highlightColor: `text-${highlight}-500`,
            }
          }

      let sizes = {
        none: {
          wrapper: "w-0 overflow-hidden",
          sideItem: "flex mx-2 pr-4 py-2 text-base ",
          topItem: "flex items-center text-sm px-4 border-r h-12",
          icon: "mr-3 text-lg",
        },
        compact: {
          fixed: 'ml-0 md:ml-44',
          wrapper: "w-44 p-1 pt-4",
          sideItem: "flex mx-2 pr-4 py-2 text-base ",
          topItem: "flex items-center text-sm px-4 border-r h-12",
          icon: "mr-3 text-lg",
        },
        full: {
          fixed: '',
          wrapper: "w-full",
          sideItem: "flex px-4 py-2 text-base font-base border-b ",
          topItem: "flex pr-4 py-2 text-sm font-light",
          icon: "mr-4 text-2xl",
        },
        mini: {
          fixed: 'ml-0 md:ml-20',
          wrapper: "w-20 overflow-x-hidden p-1 pt-4",
          sideItem: "flex pr-4 py-4 text-base font-base border-b",
          topItem: "flex px-4 items-center text-sm font-light ",
          icon: "w-20 mr-4 text-4xl",
          sideItemContent: 'hidden',
        },
        micro: {
          fixed: 'ml-0 md:ml-14',
          wrapper: "w-14 overflow-x-hidden",
          itemWrapper: 'p-1',
          sideItem: "flex text-base font-base",
          topItem: "flex mx-6 pr-4 py-2 text-sm font-light",
          icon: "w-12 text-2xl hover:bg-neutral-900 px-2 py-3 my-2 rounded-lg mr-4 hover:text-blue-500",
          sideItemContent: 'hidden',
        },

      }

      let subMenuStyles = {
                inline: {
                    indicatorIcon: 'fa fa-angle-right',
                    indicatorIconOpen: 'fa fa-angle-down',
                    subMenuWrapper: `w-full`,
                    subMenuParentWrapper: `flex flex-col w-full`
                },
                flyout: {
                    indicatorIcon: 'fa fa-angle-down',
                    indicatorIconOpen: 'fa fa-angle-right',
                    subMenuWrapper: `absolute ml-${sizes[size].width - 8}`,
                    subMenuParentWrapper: `flex flex-row`,
                    subMenuWrapperTop: `absolute top-full`,
                },
        }

        return {
        fixed: `md:${sizes[size].fixed}`,
        logoWrapper: `${sizes[size].wrapper} ${colors[color].contentBgAccent} ${colors[color].textColorAccent}`,
        sidenavWrapper: `${mobile[responsive]} ${colors[color].contentBg} ${sizes[size].wrapper} h-full z-20`,
        menuIconSide: ` text-${colors[color].accentColor} ${sizes[size].icon} group-hover:${colors[color].highlightColor}`,
        itemsWrapper: `${colors[color].borderColor} ${sizes[size].itemWrapper}  `,
        navitemSide: `
            group font-sans flex flex-col
            ${sizes[size].sideItem} ${colors[color].textColor} ${colors[color].borderColor}
            hover:${colors[color].highlightColor}
            focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300
            transition-all cursor-pointer
         `,
        navItemContent: `${sizes[size].sideItemContent}`,
        navitemSideActive: `
            group font-sans flex flex-col
            ${sizes[size].sideItem} text-blue-500 ${colors[color].borderColor}
            hover:${colors[color].highlightColor}
            focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300
            transition-all cursor-pointer
          `,
          ...subMenuStyles[subMenuStyle],
          vars: {
            colors,
            sizes,
            mobile
          }
        }
        
    },


    /* -----
         Top Nav Theme Components Minimal
        ------*/
    topnav: ({color='white',size='compact'}) => {

      let colors = {
        white: {
          contentBg: `bg-gradient-to-r from-[#f8f4ec] to-[#fefefe]`,
          accentColor: `[#da4e00]`,
          accentBg: `hover:bg-[#da4e00]`,
          borderColor: `border-${primary}-100`,
          textColor: `text-${primary}-500`,
          highlightColor: `text-${highlight}`,
        },
        bright: {
          contentBg: `bg-${accent}-700`,
          accentColor: `${accent}-400`,
          accentBg: `hover:bg-${accent}-400`,
          borderColor: `border-${accent}-600`,
          textColor: `text-${highlight}`,
          highlightColor: `text-${highlight}`,
        }
      }
      let sizes = {
        compact: {
          menu: 'hidden md:flex flex-1 justify-end',
          sideItem: "flex mx-6 pr-4 py-2 text-sm font-light hover:pl-4",
          topItem: `flex items-center text-lg  font-medium px-8  h-16 ${colors[color].textColor} ${colors[color].borderColor}
            ${colors[color].accentBg} hover:${colors[color].highlightColor}`,
          activeItem: `flex items-center text-lg  font-medium px-8 border-b border-[#da4e00]  h-16 ${colors[color].textColor} ${colors[color].borderColor}
            ${colors[color].accentBg} hover:${colors[color].highlightColor}`,
          icon: "mr-3 text-md fa-fw",
          responsive: 'md:hidden'
        },
        inline: {
          menu: 'flex flex-1',
          sideItem: "flex mx-4 pr-4 py-4 text-base font-base border-b hover:pl-4",
          topItem: `flex px-4 py-2 mx-2 font-medium text-gray-400 border-b-2 ${colors[color].textColor} ${colors[color].borderColor}
          hover:border-gray-300 hover:text-gray-700 border-gray-100 `,
          activeItem: `flex px-4 py-2 mx-2 font-medium text-blue-600 border-b-2 ${colors[color].textColor} ${colors[color].borderColor} border-blue-600 `,
          icon: "mr-4 text-2xl",
          responsive: 'hidden'
        }

      }


      return {
        topnavWrapper: `w-full ${colors[color].contentBg} `,
        topnavContent: `flex w-full h-full`,
        topnavMenu: `${sizes[size].menu} h-full overflow-x-auto overflow-y-hidden scrollbar-sm`,
        menuIconTop: `text-[#da4e00] ${sizes[size].icon} group-hover:${colors[color].highlightColor}`,
        menuOpenIcon: `fa fa-bars`,
        menuCloseIcon: `fa fa-xmark fa-fw"`,
        navitemTop: `
            group font-sans
            ${sizes[size].topItem}
            focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300
            transition cursor-pointer
        `,
        //`px-4 text-sm font-medium tracking-widest uppercase inline-flex items-center  border-transparent  leading-5 text-white hover:bg-white hover:text-darkblue-500 border-gray-200 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out h-full`,
        topmenuRightNavContainer: "hidden md:block h-full",
        navitemTopActive:
          ` group font-sans
            ${sizes[size].activeItem}
            focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300
            transition cursor-pointer
          `,
        mobileButton:
          `${sizes[size].responsive} ${colors[color].contentBg} inline-flex items-center justify-center p-2  text-gray-400 hover:bg-gray-100 `,
        vars: {
            colors,
            sizes
          }
      }

    },
}

export default theme