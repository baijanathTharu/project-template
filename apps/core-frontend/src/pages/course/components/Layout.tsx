import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Course Management System</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link to="/" className="text-foreground">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/create-course" className="text-foreground">
              Create Course
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}
