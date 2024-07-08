import MNYLogo from './mny-logo'
import { Link } from 'react-router-dom'

const Logo = ({sideNav}) => {
	// const theme = useTheme()
	// const themeOptions = {
	// 	size: sideNav?.size || 'micro',
	// 	color: sideNav?.color || 'dark'
	// }

	return (
		<>
			<Link to="/" className={`flex  items-center h-16`}>
				<div className='h-full pl-4 pr-2 flex items-center '>
					<span className='font-bold text-lg tracking-wider px-12'> Hazard Data</span>
				</div>	
			</Link>
		</>
	)
}

export default Logo