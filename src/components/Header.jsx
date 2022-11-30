import React, { forwardRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPen, faTrashCan, faTableCells, faList, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../context/ThemeContext';


const Header = forwardRef(function Header(props, ref) {

    const { theme, setTheme } = useContext(ThemeContext);
    let {
        handleSearch,
        changeView,
        setChangeView,
        handleAddUser
    } = props;

    return (
        <header className={`main-header px-5 py-2 ${theme === 'dark' ? "bg-gray-800" : ""}`}>
            <a href="#" className="brand-logo block font-sans text-[35px] pb-2 text-center font-semibold text-blue-400 underline" onClick={()=>{window.location.reload()}}>User List</a>
            <div className="user-actions flex items-center justify-center">
                <div className="user-search ml-auto flex">
                    <input type="text" name="user-text" id="" class="border-2 border-blue-400 rounded-l-lg text-base py-2 px-4 flex-grow" placeholder="Enter Username" ref={ref} />
                    <button className="search-btn bg-blue-400 text-white py-2 px-4 text-base rounded-r-lg border-2 border-blue-400 flex-grow" onClick={handleSearch}>Search</button>
                </div>
                <div className="options-sm flex lg:hidden pl-2">
                    <button type="button" className="bg-blue-400 text-white border-2 border-blue-400 py-2 px-4 rounded-lg">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </div>
                    </button>
                </div>
                <div className="options-lg ml-3 hidden lg:flex gap-2">
                    <button type="button" className="bg-blue-400 text-white py-2 px-4 text-base rounded-lg border-2 border-blue-400" onClick={handleAddUser}>Add User</button>
                    <button type="button" className="bg-blue-400 text-white py-2 px-4 text-base rounded-lg border-2 border-blue-400" onClick={() => { setChangeView(changeView = 'grid') }}>
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faTableCells} />
                        </div>
                    </button>
                    <button type="button" className="bg-blue-400 text-white text-base py-2 px-4 border-2 border-blue-400 rounded-lg" onClick={() => { setChangeView(changeView = 'list') }}>
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faList} />
                        </div>
                    </button>
                    <button type="button" className="bg-blue-400 text-white text-base py-2 px-4 border-2 border-blue-400 rounded-lg" onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light') }}>
                        <div className="icon-container">
                            {
                                theme === 'light' ? (<FontAwesomeIcon icon={faSun} />) : (<FontAwesomeIcon icon={faMoon} />)
                            }
                        </div>
                    </button>
                </div>
            </div>
        </header>
    )
});

export default Header;