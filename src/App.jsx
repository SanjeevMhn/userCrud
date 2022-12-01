import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import AddUserForm from './components/AddUserForm';
import { ThemeContext } from './context/ThemeContext';

const App = () => {
  let defaultUserImage = './src/assets/user.png';
  let [addUserForm, setAddUserForm] = useState(false);
  let [showDropDown, setShowDropDown] = useState(false);
  let userForm = useRef(null);
  let roleValue = useRef(null);
  let nameValue = useRef(null);
  let emailValue = useRef(null);
  let imgValue = useRef(null);
  let searchValue = useRef(null);
  let [editMode, setEditMode] = useState(false);
  let [searchName, setSearchName] = useState("");
  let [changeView, setChangeView] = useState('grid');
  let [disableField, setDisableField] = useState(false);

  let [theme,setTheme] = useState();
  let [users, setUsers] = useState([
    {
      "id": 100,
      "name": "Ram Sharma",
      "role": "Designer",
      "email": "ram@gmail.com",
      "img": ""
    },
    {
      "id": 101,
      "name": "Shyam Dhakal",
      "role": "Developer",
      "email": "shyam@gmail.com",
      "img": ""
    },
    {
      "id": 102,
      "name": "Ritu Ghimire",
      "role": "QA",
      "email": "ritu@gmail.com",
      "img": ""
    },
    {
      "id": 103,
      "name": "Rishi Rai",
      "role": "Manager",
      "email": "rishi@gmail.com",
      "img": ""
    },
    {
      "id": 104,
      "name": "Pramod Shrestha",
      "role": "Designer",
      "email": "pramod@gmail.com",
      "img": ""
    }
  ]);

  useEffect(() => {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(prefersDark){
      setTheme('dark');
    }else{
      setTheme('light');
    }

  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      let updatedUsers = users.map(usr => {
        if (usr.email === emailValue.current.value) {
          return {
            ...usr,
            name: nameValue.current.value,
            email: emailValue.current.value,
            role: roleValue.current.value,
            img: imgValue.current.value
          }

        }
        return usr;
      });

      setUsers(updatedUsers);
      userForm.current.reset();
      setAddUserForm(!addUserForm);
    } else {
      const data = new FormData(userForm.current);
      const values = Object.fromEntries(data.entries());

      const imgName = values.img.size > 0 ? values.img.name : "";

      setUsers([...users, {
        "id": users.length + 100,
        "name": values.name,
        "email": values.email,
        "role": values.role,
        "img": imgName
      }]);

      setAddUserForm(!addUserForm);
      changeFormTitle("Add User")
      userForm.current.reset();

    }

  }

  const handleAddUser = () => {
    setAddUserForm(!addUserForm);
    changeFormTitle('Add User');
    setEditMode(editMode = false);
    setDisableField(disableField = false);
  }

  const handleDropDown = (event) => {
    let dropdownContent = event.currentTarget.children[1];
    dropdownContent.classList.contains('hidden') ?
      dropdownContent.classList.remove('hidden') :
      dropdownContent.classList.add('hidden');
  }

  const handleEdit = (id) => {
    setEditMode(editMode = true);
    setDisableField(!disableField);
    let selectedUser = users.filter((user) => user.id === id);
    if (selectedUser.length !== 0) {
      setAddUserForm(!addUserForm);
      changeFormTitle("Edit User")
    }
    nameValue.current.value = selectedUser[0].name;
    roleValue.current.value = selectedUser[0].role;
    emailValue.current.value = selectedUser[0].email;
    // imgValue.current.value = selectedUser[0].img;
  }

  const handleDelete = (id) => {
    setUsers(users => users.filter((usr) => usr.id !== id));
  }

  const changeFormTitle = (title) => {
    let formElem = userForm.current.children;

    for (let fm of formElem) {
      if (fm.classList.contains('form-title')) {
        fm.innerHTML = title;
      }
    }
  }

  const handleSearch = () => {
    setSearchName(searchName = searchValue.current.value);
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={`page-wrapper w-full h-screen md:h-screen ${theme === 'dark' ? "bg-gray-800" : ""} ${addUserForm ? 'fixed' : 'relative '}`}>
        <Header
          ref={searchValue}
          handleSearch={handleSearch}
          changeView={changeView}
          setChangeView={setChangeView}
          handleAddUser={handleAddUser}
        />

        <MainContent
          changeView={changeView}
          setChangeView={setChangeView}
          users={users}
          handleDropDown={handleDropDown}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          defaultUserImage={defaultUserImage}
          searchName={searchName}
        />

        <AddUserForm
          addUserForm={addUserForm}
          setAddUserForm={setAddUserForm}
          disableField={disableField}
          handleSubmit={handleSubmit}
          ref={{
            refName: nameValue,
            refEmail: emailValue,
            refRole: roleValue,
            refImg: imgValue,
            refForm: userForm
          }} />
      </div>
    </ThemeContext.Provider>
  )
}

export default App;