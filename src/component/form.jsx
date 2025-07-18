import React from 'react'
import Input from './input'
import Button from './button'
export default function From() {

    return (
        <div>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <Input change={(e) => setFromData({ ...FromData, name: e.target.value })} value={From.name} type={"text"} placeholder={"Enter Your Name"} />
                </div>
                <div className="mb-5">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <Input change={(e) => setFromData({ ...FromData, email: e.target.value })} value={From.email} type={"email"} placeholder={"Enter Your Email"} />
                </div>
                <div className="mb-5">
                    <label for="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <Input change={(e) => setFromData({ ...FromData, mobile: e.target.value })} value={From.mobile} type={"number"} placeholder={"Enter Your Mobile Number"} />
                </div>
                <Button text={"Submit"} />

            </form>
        </div>
    )
}
