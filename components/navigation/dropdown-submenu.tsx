import Link from 'next/link';
import { MenuItem } from './navigation';

interface DropdownSubmenuProps {
  submenuItems: MenuItem[];
  parentIndex: number;
}

export default function DropdownSubmenu({ submenuItems, parentIndex }: DropdownSubmenuProps) {
  return (
    <ul 
      className={`
        absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-200
      `}
    >
      {submenuItems.map((subItem, subIndex) => (
        <li key={`submenu-item-${parentIndex}-${subIndex}`}> 
          <Link 
            href={subItem.path ?? '#'} 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            {subItem.label}
          </Link>
        </li>
      ))}
    </ul>
  );
} 