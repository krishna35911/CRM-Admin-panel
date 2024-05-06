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
    <section className="hidden lg:block  bg-black  min-h-screen">
      <List className='text-white'>
        {/* crms */}
      <Link to="/view-all-crms">
                <ListItem >
                  <ListItemPrefix>
                  <i class="fa-regular fa-user"></i>
                  </ListItemPrefix>
                  All CRMS
                </ListItem>
              </Link>
            {/* carousal */}
      <Link to={'/add-crm'}>
          <ListItem>
            <ListItemPrefix>
            <i class="fa-solid fa-user-plus"></i>
            </ListItemPrefix>
            Add CRM
          </ListItem>
      </Link>
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

        <Link to={'/add-calender'}>
          <ListItem>
            <ListItemPrefix>
            <i class="fa-solid fa-calendar-plus"></i>
            </ListItemPrefix>
            Add Calender
          </ListItem>
        </Link>

        <Link to={'/all-calender'}>
          <ListItem>
            <ListItemPrefix>
            <i class="fa-solid fa-calendar-days"></i>
            </ListItemPrefix>
            All Calender
          </ListItem>
        </Link>
        <Link to={"/all-leaves"}>
                <ListItem >
                  <ListItemPrefix>
                  <i class="fa-regular fa-user"></i>
                  </ListItemPrefix>
                  All Leaves
                </ListItem>
              </Link>
        <Link to={"/excel-data"}>
                <ListItem >
                  <ListItemPrefix>
                  <i class="fa-solid fa-file-excel"></i>
                  </ListItemPrefix>
                  Add Excel
                </ListItem>
        </Link>
        <Link to={"/all-excel-data"}>
                <ListItem >
                  <ListItemPrefix>
                  <i class="fa-solid fa-table"></i>
                  </ListItemPrefix>
                  All excel data
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
            <Link to="/view-all-crms">
                <ListItem >
                  <ListItemPrefix>
                  <i className="fa-solid fa-plus"></i>
                  </ListItemPrefix>
                  All CRMS
                </ListItem>
              </Link>
              {/* carousals */}
            <Link to={'/add-crm'}>
              <ListItem>
                <ListItemPrefix>
                <i class="fa-solid fa-user-plus"></i>
                </ListItemPrefix>
                Add CRM
              </ListItem>
            </Link>
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

              <Link to={'/add-calender'}>
          <ListItem>
            <ListItemPrefix>
            <i class="fa-solid fa-calendar-plus"></i>
            </ListItemPrefix>
            Add Calender
          </ListItem>
        </Link>

        <Link to={'/all-calender'}>
          <ListItem>
            <ListItemPrefix>
            <i class="fa-solid fa-calendar-days"></i>
            </ListItemPrefix>
            All Calender
          </ListItem>
        </Link>

        <Link to={"/all-leaves"}>
                <ListItem >
                  <ListItemPrefix>
                  <i class="fa-regular fa-user"></i>
                  </ListItemPrefix>
                  All Leaves
                </ListItem>
            </Link>

            
        <Link to={"/excel-data"}>
                <ListItem >
                  <ListItemPrefix>
                  <i class="fa-solid fa-file-excel"></i>
                  </ListItemPrefix>
                  Add Excel
                </ListItem>
            </Link>

            <Link to={"/all-excel-data"}>
                <ListItem >
                  <ListItemPrefix>
                  <i class="fa-solid fa-table"></i>
                  </ListItemPrefix>
                  All excel data
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
