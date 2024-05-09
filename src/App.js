import React  from 'react';
import UserList from './components/UserList';
import MapContainer from './components/MapContainer';
import {useGlobalContext } from './GlobalContext/GlobalContext';
import Notification from './components/Notification';

const App = () => {
  const {showMessage, stockStatus, setStartDelivery} = useGlobalContext();
  return (
          <>
          {showMessage && <Notification/>}
        <div className='bg-slate-500 min-h-[100vh] mx-auto px-1 lg:px-[80px] py-5'>
            <h1 className='text-center font-bold text-[white] py-3'>PACKAGE DELIVERY APP</h1>
            <div className="flex justify-between gap-3 my-2">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center" onClick={()=>setStartDelivery(true)}>
          Start Delivery
        </button>
        <div class="flex items-center border border-[blue] p-3 rounded-lg text-yellow-500">
          <div class="w-4 h-4 rounded-full mr-2 bg-green-500"></div>
          {stockStatus > 0 ? (
            <p class="text-sm font-bold">In Stock ({stockStatus} items)</p>
          ) : (
            <p class="text-sm font-bold">Out Of Stock</p>
          )}
        </div>
      </div>

            <div className='flex flex-col gap-5 lg:flex-row'>
              <div className='w-full lg:w-[50%]'>
            <UserList/>
              </div>
              <div className='w-full lg:w-[50%]'>
            <MapContainer/>
              </div>
            </div>
        </div>
          </>
    );
};

export default App;

