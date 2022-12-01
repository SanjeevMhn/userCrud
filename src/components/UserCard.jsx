import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPen, faTrashCan, faTableCells, faList } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../context/ThemeContext';

const UserCard = (props) => {

    const {theme, setTheme} = useContext(ThemeContext);

    const {
            user,
            changeView,
            handleDropDown,
            handleEdit,
            handleDelete,
            defaultUserImage
        } = props;

    return (
        <div className={`user-card px-2 mb-4 h-100 ${changeView === 'list' ? 'w-100' : 'w-100 md:w-[calc(100%/2)] lg:w-[calc(100%/3)] xl:w-[calc(100%/5)]'}`} key={user.id}>
            <div className={`inner-container h-full p-5 border-2 rounded-lg border-slate-400 flex flex-col items-center ${theme === 'dark' ? "bg-gray-800 text-white" : ""}`}>
                <div className={`icon-container ml-auto cursor-pointer relative h-[30px] w-[30px] flex-[0_0_30px] flex items-center justify-end ${theme === 'dark' ? 'text-white' : ''}`} onClick={handleDropDown}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                    <div className={`dropdown-content absolute top-full right-0 border-2 border-blue-400 rounded-lg hidden ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                        <button type="button" className="px-4 py-2 flex items-center" onClick={() => { handleEdit(user.id) }}>
                            <div className="icon-container h-[30px] w-[30px] flex-[0_0_30px] bg-blue-400 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faPen} />
                            </div>
                            <span className="label-tex ml-2">
                                Edit
                            </span>
                        </button>
                        <button type="button" className="px-4 py-2 flex items-center" onClick={() => { handleDelete(user.id) }}>
                            <div className="icon-container h-[30px] w-[30px] flex-[0_0_30px] bg-blue-400 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                            <span className="label-text ml-2">
                                Delete
                            </span>
                        </button>
                    </div>
                </div>
                <div className="img-container h-[80px] w-[80px] rounded-full border-2 border-slate-400 cursor-pointer">
                    <img src={user.img ? user.img : defaultUserImage} alt="" />
                </div>
                <div className="user-details text-center mt-2">
                    <h2 className="user-name text-lg">
                        {user.name}
                    </h2>
                    <p className="user-role text-sm">{user.role}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard;