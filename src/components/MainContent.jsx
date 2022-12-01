import React, { forwardRef, useContext } from 'react';
import UserCard from './UserCard';
import { ThemeContext } from '../context/ThemeContext';

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

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <main className={`main-content w-full h-auto ${theme === 'dark' ? "bg-gray-800" : ""}`}>
            <div className={`inner-container py-5 px-2 lg:px-5 w-full flex flex-wrap ${changeView === 'list' ? 'flex-col' : 'flex-col md:flex-row'}`}>
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

            </div >
        </main>
    )
}

export default MainContent;