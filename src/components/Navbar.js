import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

// main-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #fff;
//   padding: 1rem 2rem;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   position: fixed;
//   width: 100%;
//   top: 0;
//   z-index: 1000;
// };

// const Logo = styled.div`
//   a {
//     display: flex;
//     align-items: center;
//     text-decoration: none;
//     color: #333;
//   }
//   img {
//     height: 50px;
//     width: auto;
//   }
// `;

// const NavContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   width: 100%;
// `;

// const NavUl = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   display: flex;
//   gap: 1rem;
// `;

// const NavItem = styled.li`
//   position: relative;
//   a {
//     display: block;
//     padding: 0.5rem 1rem;
//     color: #333;
//     text-decoration: none;
//     font-weight: 500;
//     transition: color 0.3s ease;

//     &:hover {
//       color: #007bff;
//     }
//   }
// `;

// const DropdownMenu = styled.ul`
//   position: absolute;
//   top: 100%;
//   left: 0;
//   background-color: #fff;
//   min-width: 200px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   border-radius: 4px;
//   display: none;

//   ${NavItem}:hover & {
//     display: block;
//   }

//   li {
//     a {
//       padding: 0.5rem 1rem;
//       display: block;

//       &:hover {
//         background-color: #f8f9fa;
//       }
//     }
//   }
// `;

// const Badge = styled.span`
//   background-color: #007bff;
//   color: white;
//   padding: 0.25em 0.6em;
//   border-radius: 0.25rem;
//   font-size: 0.75rem;
//   margin-left: 0.5rem;
// `;

// const NavbarToggle = styled.button`
//   display: block;

//   @media (max-width: 992px) {
//     display: block;
//     background: none;
//     border: none;
//     padding: 0;
//     cursor: pointer;

//     i {
//       font-size: 24px;
//       color: #333;
//     }
//   }
// `;
/* Navbar Styles */



const Navbar = () => {
  return (
    // <AppBar position="static">
    //   <Toolbar>
        <Box className = "navbar">
          <Box className="logo">
            <Link href="/" legacyBehavior>
              <a>
                <img src="/assets/images/icon/logo1.png" height="50px" alt="Logo" />
              </a>
            </Link>
          </Box>
          {/* <nav id="mega-menu-holder"> */}
            <Box className="nav-container">

              <div id="navbarSupportedContent1">
                <ul className="nav-ul">
                  <li className="nav-item" >
                    <Link href="/" legacyBehavior>
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/about" legacyBehavior>
                      <a>About</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/project-support" legacyBehavior>
                      <a>Project Support</a>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link href="/services" legacyBehavior>
                      <a className="dropdown-toggle">Services</a>
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link href="/services#freelancing" legacyBehavior>
                          <a>Freelancing</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services#web&mobile" legacyBehavior>
                          <a>Web Development</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services#web&mobile" legacyBehavior>
                          <a>App Development</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link href="/become-an-instructor" legacyBehavior>
                      <a>Become an Instructor <span className="badge">New</span></a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/contact" legacyBehavior>
                      <a>Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </Box>
          {/* </nav> */}
        </Box>
        // {/* <Typography variant="h6" component={Link} href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
        //   LD Online IT Solutions
        // </Typography>
        // <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        //   <Button color="inherit" component={Link} href="/" sx={{ mx: 1 }}>
        //     Home
        //   </Button>
        //   <Button color="inherit" component={Link} href="/services" sx={{ mx: 1 }}>
        //     Services
        //   </Button>
        //   <Button color="inherit" component={Link} href="/about" sx={{ mx: 1 }}>
        //     About
        //   </Button>
        //   <Button color="inherit" component={Link} href="/contact" sx={{ mx: 1 }}>
        //     Contact
        //   </Button>
        // </Box> */}
    //   </Toolbar>
    // </AppBar>
  );
};

// import React from 'react';
// import Link from 'next/link';
// import { useState } from 'react';
// import styled from 'styled-components';

// const MainHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #fff;
//   padding: 1rem 2rem;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   position: fixed;
//   width: 100%;
//   top: 0;
//   z-index: 1000;
// `;

// const Logo = styled.div`
//   a {
//     display: flex;
//     align-items: center;
//     text-decoration: none;
//     color: #333;
//   }
//   img {
//     height: 50px;
//     width: auto;
//   }
// `;

// const NavContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   width: 100%;
// `;

// const NavUl = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   display: flex;
//   gap: 1rem;
// `;

// const NavItem = styled.li`
//   position: relative;
//   a {
//     display: block;
//     padding: 0.5rem 1rem;
//     color: #333;
//     text-decoration: none;
//     font-weight: 500;
//     transition: color 0.3s ease;

//     &:hover {
//       color: #007bff;
//     }
//   }
// `;

// const DropdownMenu = styled.ul`
//   position: absolute;
//   top: 100%;
//   left: 0;
//   background-color: #fff;
//   min-width: 200px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   border-radius: 4px;
//   display: none;

//   ${NavItem}:hover & {
//     display: block;
//   }

//   li {
//     a {
//       padding: 0.5rem 1rem;
//       display: block;

//       &:hover {
//         background-color: #f8f9fa;
//       }
//     }
//   }
// `;

// const Badge = styled.span`
//   background-color: #007bff;
//   color: white;
//   padding: 0.25em 0.6em;
//   border-radius: 0.25rem;
//   font-size: 0.75rem;
//   margin-left: 0.5rem;
// `;

// const NavbarToggle = styled.button`
//   display: block;

//   @media (max-width: 992px) {
//     display: block;
//     background: none;
//     border: none;
//     padding: 0;
//     cursor: pointer;

//     i {
//       font-size: 24px;
//       color: #333;
//     }
//   }
// `;

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
// <MainHeader>
//   <Logo>
//     <Link href="/" legacyBehavior>
//       <a>
//         <img src="/assets/images/icon/logo.png" height="50px" alt="Logo" />
//       </a>
//     </Link>
//   </Logo>
//   <nav id="mega-menu-holder">
//     <NavContainer>
//       {/* <NavbarToggle 
//         type="button" 
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         aria-controls="navbarSupportedContent1" 
//         aria-expanded={isMenuOpen}
//         aria-label="Toggle navigation"
//       >
//         <i className="flaticon-setup"></i>
//       </NavbarToggle> */}
//       <div id="navbarSupportedContent1">
//         <NavUl>
//           <NavItem>
//             <Link href="/" legacyBehavior>
//               <a>Home</a>
//             </Link>
//           </NavItem>
//           <NavItem>
//             <Link href="/about" legacyBehavior>
//               <a>About</a>
//             </Link>
//           </NavItem>
//           {/* <NavItem className="dropdown">
//             <Link href="/it-training" legacyBehavior>
//               <a className="dropdown-toggle">IT training</a>
//             </Link>
//             <DropdownMenu>
//               <li>
//                 <Link href="/corporate-it-training" legacyBehavior>
//                   <a>Corporate Training</a>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/online-it-training" legacyBehavior>
//                   <a>Online Training</a>
//                 </Link>
//               </li>
//             </DropdownMenu>
//           </NavItem> */}
//           <NavItem>
//             <Link href="/project-support" legacyBehavior>
//               <a>Project Support</a>
//             </Link>
//           </NavItem>
//           <NavItem className="dropdown">
//             <Link href="/services" legacyBehavior>
//               <a className="dropdown-toggle">Services</a>
//             </Link>
//             <DropdownMenu>
//               <li>
//                 <Link href="/services#freelancing" legacyBehavior>
//                   <a>Freelancing</a>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/services#web&mobile" legacyBehavior>
//                   <a>Web Development</a>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/services#web&mobile" legacyBehavior>
//                   <a>App Development</a>
//                 </Link>
//               </li>
//             </DropdownMenu>
//           </NavItem>
//           <NavItem>
//             <Link href="/become-an-instructor" legacyBehavior>
//               <a>Become an Instructor <Badge>New</Badge></a>
//             </Link>
//           </NavItem>
//           <NavItem>
//             <Link href="/contact" legacyBehavior>
//               <a>Contact</a>
//             </Link>
//           </NavItem>
//         </NavUl>
//       </div>
//     </NavContainer>
//   </nav>
// </MainHeader>
//   );
// };

// export default Navbar;


export default Navbar;
