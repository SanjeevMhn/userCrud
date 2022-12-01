import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const AddUserForm = forwardRef(function AddUserForm(props, ref) {

    const { theme, setTheme } = useContext(ThemeContext);

    const {
        addUserForm,
        setAddUserForm,
        handleSubmit,
        disableField
    } = props;

    const {
        refName,
        refEmail,
        refRole,
        refImg,
        refForm
    } = ref;

    return (
        <div className={`add-user modal w-[100%] h-full fixed z-50 top-0 left-0 p-5 lg:p-0 justify-center items-center ${addUserForm ? 'flex' : 'hidden'} ${theme === 'dark'? "bg-gray-900/90" : "bg-gray-800/60"}`}>
            <form onSubmit={handleSubmit} className={`form w-[100%] lg:w-1/2 p-4 lg:p-8 border-2 border-blue-400 rounded-lg relative ${theme === 'dark' ? "bg-gray-800" : "bg-white"}`} ref={refForm}>
                <h2 className="form-title text-center font-semibold text-blue-400 text-2xl mb-5">Add User</h2>
                <div className="form-group flex flex-col pb-2">
                    <label htmlFor="username" className="text-blue-400 font-semibold text-xl mb-1">Name</label>
                    <input type="text" name="name" id="username" className="py-2 px-4 border-2 border-blue-400 rounded-lg" placeholder="Your Name" ref={refName} />
                </div>
                <div className="form-group flex flex-col pb-2">
                    <label htmlFor="useremail" className="text-blue-400 font-semibold text-xl mb-1">Email</label>
                    <input type="email" name="email" id="useremail" className="py-2 px-4 border-2 border-blue-400 rounded-lg" placeholder="Your Email" ref={refEmail} disabled={disableField} />
                </div>
                <div className="form-group flex flex-col pb-2">
                    <label htmlFor="userrole" className="text-blue-400 font-semibold text-xl mb-1">Role</label>
                    <select name="role" id="userrole" className="text-black border-2 border-blue-400 rounded-lg px-3 py-2" ref={refRole}>
                        <option value="">Select Role</option>
                        <option value="Manager">Manager</option>
                        <option value="QA">QA Engineer</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                    </select>
                </div>
                <div className="form-group flex flex-col pb-2">
                    <label htmlFor="userimg" className="text-blue-400 font-semibold text-xl mb-1">Image</label>
                    <input type="file" name="img" id="userimg" className="py-2 px-4 border-2 border-blue-400 rounded-lg" placeholder="Your Image" ref={refImg} />
                </div>
                <div className="form-group flex justify-center pt-4 gap-4">
                    <button type="submit" className="py-2 px-4 bg-blue-400 text-white rounded-md">Submit</button>
                    <button type="reset" className="py-2 px-4 bg-blue-400 text-white rounded-md" onClick={() => { setAddUserForm(!addUserForm) }}>Cancel</button>
                </div>
            </form>
        </div>
    );
})

export default AddUserForm;