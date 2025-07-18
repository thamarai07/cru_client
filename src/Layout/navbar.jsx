import React from 'react'

export default function Navbar() {
    return (
        <div className='shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-2xl">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <span className="self-center text-4xl font-bold whitespace-nowrap dark:text-white">CRUD</span>
                   

                </div>
            </nav>
        </div>
    )
}
