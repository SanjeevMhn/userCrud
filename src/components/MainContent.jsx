import React, { forwardRef } from 'react';
import UserCard from './UserCard';

const MainContent = (props) => {
    const {
        changeView,
        setChangeView,
        users,
        handleDropDown,
        handleEdit,
        handleDelete,
        defaultUserImage,
        searchName
    } = props;

    return (
        <main className={`main-content p-5 w-full flex flex-wrap ${changeView === 'list' ? 'flex-col' : ''}`}>
            {searchName.length ? users.map(user => {
                if (user.name.toLowerCase().includes(searchName.toLowerCase())) {
                    return (
                        <UserCard
                            user={user}
                            changeView={changeView}
                            handleDropDown={handleDropDown}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            defaultUserImage={defaultUserImage}
                            key={user.id} />
                    )
                }
            }) : users.map((user, index) => {
                return (
                    <UserCard
                        user={user}
                        changeView={changeView}
                        handleDropDown={handleDropDown}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        defaultUserImage={defaultUserImage}
                        key={user.id} />
                )
            })}
        </main>
    )
}

export default MainContent;