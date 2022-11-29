import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPen, faTrashCan, faTableCells, faList } from '@fortawesome/free-solid-svg-icons';

const Header = forwardRef(function Header({handleSearch,changeView,setChangeView,handleAddUser},ref){
    return (
        <header className="main-header px-7 py-2">
            <a href="#" className="brand-logo block font-sans text-[35px] pb-2 text-center font-semibold text-blue-400 underline">User List</a>
            <div className="user-actions flex items-center justify-center">
                <div className="user-search ml-auto">
                    <input type="text" name="user-text" id="" class="border-2 border-blue-400 rounded-l-lg text-base py-2 px-4" placeholder="Enter Username" ref={ref} />
                    <button className="search-btn bg-blue-400 text-white py-2 px-4 text-base rounded-r-lg border-2 border-blue-400" onClick={handleSearch}>Search</button>
                </div>
                <div className="options ml-3 flex gap-2">
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
                </div>
            </div>
        </header>
    )
});

export default Header;