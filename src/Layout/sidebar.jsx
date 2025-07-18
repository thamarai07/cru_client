import React from 'react'
import { Link } from 'react-router-dom'
export default function Sidebar() {
    return (
        <div>
            <aside id="default-sidebar" className=" w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-2xl" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/user" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className=" ms-3 whitespace-nowrap">User</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/recipe" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className=" ms-3 whitespace-nowrap">Recipe</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>


        </div>
    )
}
