"use client"

import Link from 'next/link';
import { MenuItem, menuItems } from './navigation';
import FullWidthSubmenu from './full-width-submenu';
import DropdownSubmenu from './dropdown-submenu';

interface DesktopNavProps {
  isFullWidth?: boolean;
}

export default function DesktopNav({ isFullWidth = false }: DesktopNavProps) {
  return (
    <ul className="flex space-x-4 justify-end">
      {menuItems.map((item, index) => (
        <li key={`menu-item-${index}`} className="relative group">
          {/* 주 메뉴 항목 */}
          <div className="flex items-center">
            {item.path ? (
              <Link 
                href={item.path} 
                className={`px-3 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center`}
              >
                {item.label}
                {/* 서브메뉴가 있으면 화살표 표시 */}
                {item.submenu && (
                  <svg 
                    className="ml-1 h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>
            ) : (
              <span 
                className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium cursor-pointer flex items-center"
              >
                {item.label}
                {/* 서브메뉴가 있으면 화살표 표시 */}
                {item.submenu && (
                  <svg 
                    className="ml-1 h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            )}
          </div>

          {/* 서브메뉴 드롭다운 - isFullWidth props에 따라 다른 컴포넌트 사용 */}
          {item.submenu && (
            <>
              {isFullWidth ? (
                <FullWidthSubmenu submenuItems={item.submenu} parentIndex={index} />
              ) : (
                <DropdownSubmenu submenuItems={item.submenu} parentIndex={index} />
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
} 