import './App.css';
import Sidebar from './Layout/sidebar';
import Navbar from './Layout/navbar';
import UserTable from './Layout/Usertable';
import RecipeTable from './Layout/RecipeTable';
import { Outlet, Route, Routes } from 'react-router-dom';

function Layout() {
  return (
    <div className="App max-w-[1366px] m-auto">
      <div className="flex">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="flex flex-col w-[80%] p-4">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="user" element={<UserTable />} />
        <Route path="recipe" element={<RecipeTable />} />
      </Route>
    </Routes>
  );
}

export default App;
