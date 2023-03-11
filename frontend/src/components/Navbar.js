import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='flex flex-row items-center justify-between py-3 px-5'>
            <div>
                <Link className='flex items-center' to="do/plans">
                    <svg xmlns="http://www.w3.org/2000/svg" fill='white' viewBox="0 0 24 24" strokeWidth={0.7} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span className='font-nunito font-extrabold text-4xl mx-2 text-gray-600'>
                        Productiwin
                    </span>
                </Link>
            </div>
            <div>
                <ul className='flex flex-row items-center justify-evenly'>
                    <li>
                        <Link className='navbar-item' to="login">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link className='navbar-item'>
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar