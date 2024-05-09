import React from 'react';
import { useGlobalContext } from '../GlobalContext/GlobalContext';

const Notification = () => {
    const { stockStatus, showMessage, setShowMessage } = useGlobalContext();
    return (
        <div class="inset-0 flex items-center justify-center absolute" style={{zIndex:"999"}}>
  <div class="bg-white p-8 rounded-lg shadow-lg w-[300px] text-center">
    <h2 class="text-lg font-semibold mb-4">Message</h2>
    <p class="text-gray-700 mb-4">Package Received</p>
    <p class="text-gray-700 mb-4">Stok Status : {stockStatus}</p>
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={()=>setShowMessage(false)}>Close</button>
  </div>
</div>
    );
};

export default Notification;
