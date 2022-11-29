import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPen, faTrashCan, faTableCells, faList } from '@fortawesome/free-solid-svg-icons';

const UserCard = (props) => {

    const {
            user,
            changeView,
            handleDropDown,
            handleEdit,
            handleDelete,
            defaultUserImage
        } = props;

    return (
        <div className={`user-card px-2 mb-4 h-100 ${changeView === 'list' ? 'w-100' : 'w-[calc(100%/5)]'}`} key={user.id}>
            <div className="inner-container h-full p-5 border-2 rounded-lg border-slate-400 flex flex-col items-center">
                <div className="icon-container ml-auto cursor-pointer relative h-[30px] w-[30px] flex-[0_0_30px] flex items-center justify-end" onClick={handleDropDown}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                    <div className="dropdown-content absolute top-full right-0 border-2 border-blue-400 rounded-lg bg-white hidden">
                        <button type="button" className="px-4 py-2 flex items-center" onClick={() => { handleEdit(user.id) }}>
                            <div className="icon-container h-[30px] w-[30px] flex-[0_0_30px] bg-lime-400 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faPen} />
                            </div>
                            <span className="label-tex ml-2 text-blue-400">
                                Edit
                            </span>
                        </button>
                        <button type="button" className="px-4 py-2 flex items-center" onClick={() => { handleDelete(user.id) }}>
                            <div className="icon-container h-[30px] w-[30px] flex-[0_0_30px] bg-lime-400 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                            <span className="label-text ml-2 text-blue-400">
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