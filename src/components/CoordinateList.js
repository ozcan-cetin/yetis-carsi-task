import { useState } from 'react';

export const CoordinateList = ({ coordinates, routeIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-[130px] lg:top-[70px]" style={{zIndex:"998"}}>
      <button
        onClick={toggleList}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
      >
        {!isOpen ? 'Show List' : 'Close'}
      </button>
      {isOpen && (
        <ul className="bg-gray-100 p-4 rounded-md max-h-[200px] overflow-scroll">
          {coordinates?.map((coordinate, index) => (
            <li key={index} className={`mb-2 ${index >= routeIndex ? "bg-blue-300" : "bg-green-300"} rounded-lg p-1`}>
              <span className="font-bold">Latitude:</span> {coordinate.lat},{' '}
              <span className="font-bold">Longitude:</span> {coordinate.lng}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

