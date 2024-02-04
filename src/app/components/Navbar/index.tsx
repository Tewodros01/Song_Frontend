import React from "react";
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  MobileIcon,
  MobileMenu,
  MobileLink,
} from "./NavbarStyledComponent";
import { DiCssdeck } from "react-icons/di";
import { FaBars } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <DiCssdeck size="3rem" />
          <Span>Song App</Span>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={toggleMenu} />
        </MobileIcon>
        <NavItems>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/songs">Songs</NavLink>
          <NavLink to="/artists">Artists</NavLink>
          <NavLink to="/albums">Albums</NavLink>
        </NavItems>
        <MobileMenu isOpen={isOpen}>
          <MobileLink to="/" onClick={toggleMenu}>
            Home
          </MobileLink>
          <MobileLink to="/songs" onClick={toggleMenu}>
            Songs
          </MobileLink>
          <MobileLink to="/artists" onClick={toggleMenu}>
            Artists
          </MobileLink>
          <MobileLink to="/albums" onClick={toggleMenu}>
            Albums
          </MobileLink>
        </MobileMenu>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
