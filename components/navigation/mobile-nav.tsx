"use client"

import { useState } from 'react';
import Link from 'next/link';
import { menuItems } from './navigation';

export default function MobileNav() {
  // 각 메뉴 항목별 드롭다운 상태 관리
  const [openSubmenus, setOpenSubmenus] = useState<Record<number, boolean>>({});

  // 서브메뉴 토글 함수
  const toggleSubmenu = (index: number) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="max-w-md mx-auto px-2 pt-2 pb-3 sm:px-3">
      {menuItems.map((item, index) => (
        <div key={`mobile-menu-${index}`}>
          {/* 메인 메뉴 항목 */}
          {item.submenu ? (
            // 서브메뉴가 있는 경우 버튼으로 처리
            <button
              onClick={() => toggleSubmenu(index)}
              className="w-full px-4 py-2 flex items-center justify-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              <span>{item.label}</span>
              <svg 
                className={`ml-2 h-4 w-4 transition-transform ${openSubmenus[index] ? 'transform rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            // 서브메뉴가 없는 경우 링크로 처리
            <Link 
              href={item.path ?? '#'}
              className="block w-full px-4 py-2 text-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {item.label}
            </Link>
          )}

          {/* 서브메뉴 */}
          {item.submenu && openSubmenus[index] && (
            <div className="bg-gray-50">
              {item.submenu.map((subItem, subIndex) => (
                <Link 
                  key={`mobile-submenu-${index}-${subIndex}`}
                  href={subItem.path ?? '#'}
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 