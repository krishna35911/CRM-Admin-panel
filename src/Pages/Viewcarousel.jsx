import React from 'react';
import Sidebar from '../components/Sidebar';


function Viewcarousel() {
  const [carousels, setCarousels] = useState([]);
  

  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">All Carousals</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-x-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {carousels.map((carousel) => (
                  <tr key={carousel.id}>
                    <td className="border px-4 py-2">{carousel.title}</td>
                    <td className="border px-4 py-2">{carousel.description}</td>
                    <td className="border px-4 py-2">
                      <img src={carousel.image} alt={carousel.title} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="border px-4 py-2">
                      <button className="text-blue-800 mr-10">
                      <i class="fa-solid fa-pen"></i>
                      </button>
                      <button className="text-red-600">
                      <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    <div className='lg:flex '>
        <Sidebar/>
      <div>
        all carousel
      </div>
    </div>
    </div>
  );
}

export default Viewcarousel;
