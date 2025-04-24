import Link from 'next/link';

const NavbarDropdownItem = ({
  title,
  href,
}: {
  title: string;
  href: string;
}) => {
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
      >
        {title}
      </Link>
    </li>
  );
};

export default NavbarDropdownItem;
