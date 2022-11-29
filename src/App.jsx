import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPen, faTrashCan, faTableCells, faList } from '@fortawesome/free-solid-svg-icons';

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
    console.log(searchName)
  }

  return (
    <div className="page-wrapper relative">
      <header className="main-header px-7 py-2">
        <a href="#" className="brand-logo block font-sans text-[35px] pb-2 text-center font-semibold text-blue-400 underline">User List</a>
        <div className="user-actions flex items-center justify-center">
          <div className="user-search ml-auto">
            <input type="text" name="user-text" id="" class="border-2 border-blue-400 rounded-l-lg text-base py-2 px-4" placeholder="Enter Username" ref={searchValue} />
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
      <main className={`main-content p-5 w-full flex flex-wrap ${changeView === 'list' ? 'flex-col' : ''}`}>
        {searchName.length ? users.map(user => {
          if (user.name.toLowerCase().includes(searchName.toLowerCase())) {
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
        }) : users.map((user, index) => {
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
        })
        }
      </main>
      <div className={`add-user modal bg-gray-700/40 w-full h-screen absolute top-0 left-0 justify-center items-center ${addUserForm ? 'flex' : 'hidden'}`}>
        <form onSubmit={handleSubmit} className="form w-1/2 p-8 bg-white border-2 border-blue-400 rounded-lg relative" ref={userForm}>
          <h2 className="form-title text-center font-semibold text-blue-400 text-2xl mb-5">Add User</h2>
          <div className="form-group flex flex-col pb-2">
            <label htmlFor="username" className="text-blue-400 font-semibold text-xl mb-1">Name</label>
            <input type="text" name="name" id="username" className="py-2 px-4 border-2 border-blue-400 rounded-lg" placeholder="Your Name" ref={nameValue} />
          </div>
          <div className="form-group flex flex-col pb-2">
            <label htmlFor="useremail" className="text-blue-400 font-semibold text-xl mb-1">Email</label>
            <input type="email" name="email" id="useremail" className="py-2 px-4 border-2 border-blue-400 rounded-lg" placeholder="Your Name" ref={emailValue} disabled={disableField} />
          </div>
          <div className="form-group flex flex-col pb-2">
            <label htmlFor="userrole" className="text-blue-400 font-semibold text-xl mb-1">Role</label>
            {/* <input type="text" name="role" id="userrole" className="py-2 px-4 border-2 border-blue-400 rounded-lg" placeholder="Your Role" /> */}
            <select name="role" id="userrole" className="text-black border-2 border-blue-400 rounded-lg px-3 py-2" ref={roleValue}>
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="QA">QA Engineer</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
            </select>
          </div>
          <div className="form-group flex flex-col pb-2">
            <label htmlFor="userimg" className="text-blue-400 font-semibold text-xl mb-1">Image</label>
            <input type="file" name="img" id="userimg" className="py-2 px-4 border-2 border-blue-400 rounded-lg" placeholder="Your Name" ref={imgValue} />
          </div>
          <div className="form-group flex justify-center pt-4 gap-4">
            <button type="submit" className="py-2 px-4 bg-blue-400 text-white rounded-md">Submit</button>
            <button type="reset" className="py-2 px-4 bg-blue-400 text-white rounded-md" onClick={() => { setAddUserForm(!addUserForm) }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;