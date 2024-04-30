import { Chip, List, ListItem, ListItemPrefix, ListItemSuffix } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };
  

  return (
    <>
    {/* Button for small screens */}
    <button onClick={toggleSidebar} className="block lg:hidden p-4 focus:outline-none">
    <i className="fa-solid fa-bars"></i>
    </button>

    {/* Sidebar for large screens */}
    <section className="hidden lg:block  bg-black  h-auto">
      <List className='text-white'>

      <Link to={'/add-carousel'}>
          <ListItem>
            <ListItemPrefix>
            <i className="fa-solid fa-plus"></i>
            </ListItemPrefix>
            Add Carousel
          </ListItem>
      </Link>

        <Link to={'/all-carousel'}>
          <ListItem>
            <ListItemPrefix>
            <i className="fa-regular fa-eye"></i>
            </ListItemPrefix>
            All Carousel
          </ListItem>
        </Link>
      </List>
    </section>

    {/* Sidebar overlay for small screens */}

    {/* Sidebar content for small screens */}
    {open && (
        <div className="lg:hidden fixed inset-0 z-10 w-[60%] bg-black text-white">
          <div className="flex justify-end p-3">
            <button onClick={toggleSidebar} className="p-2 focus:outline-none">
            <i class="fa-solid fa-xmark "></i>
            </button>
          </div>
          <div className="fixed inset-y-8 left-0 w-[40%] max-w-sm bg-black">
            <List className='text-white'>
              <Link to="/add-carousel">
                <ListItem >
                  <ListItemPrefix>
                  <i className="fa-solid fa-plus"></i>
                  </ListItemPrefix>
                  Add Carousel
                </ListItem>
              </Link>
              <Link to="/all-carousel">
                <ListItem >
                  <ListItemPrefix>
                    <i className="fa-solid fa-eye"></i>
                  </ListItemPrefix>
                  All Carousel
                </ListItem>
              </Link>
            </List>
          </div>
        </div>
      )}
  </>
  )
}

export default Sidebar
