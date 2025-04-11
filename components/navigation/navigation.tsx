"use client"

import { useState } from 'react';
import Link from 'next/link';

// 메뉴 항목 타입 정의
type MenuItem = {
  path?: string;
  label: string;
  submenu?: MenuItem[];
};

// 메뉴 항목 배열 정의 (서브메뉴 포함)
const menuItems: MenuItem[] = [
  { path: '/', label: 'Home' },
  {
    path: '/about', 
    label: 'About',
    submenu: [
      { path: '/about/company', label: 'Company' },
      { path: '/about/team', label: 'Team' },
    ],
  },
  { path: '/contact', label: 'Contact' },
  {
    label: 'Services',
    submenu: [
        { path: '/services/web-development', label: 'Web Development'},
        { path: '/services/mobile-apps', label: 'Mobile Apps'}
    ]
  }
];

export default function NavigationMenu() {
  // 각 메뉴 항목별 드롭다운 상태 관리
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

  // 드롭다운 토글 함수
  const toggleSubmenu = (index: number) => {
    setOpenMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 로고 영역 (필요 시 추가) */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Logo</span>
            </Link>
          </div>
          
          {/* 메뉴 영역 */}
          <div className="flex items-center">
            <ul className="flex space-x-4">
              {menuItems.map((item, index) => (
                <li key={`menu-item-${index}`} className="relative group">
                  {/* 주 메뉴 항목 */}
                  <div className="flex items-center">
                    {item.path ? (
                      <Link 
                        href={item.path} 
                        className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button 
                        className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center"
                        onClick={() => toggleSubmenu(index)}
                      >
                        {item.label}
                        {/* 서브메뉴가 있으면 화살표 표시 */}
                        {item.submenu && (
                          <svg 
                            className={`ml-1 h-4 w-4 transition-transform ${openMenus[index] ? 'transform rotate-180' : ''}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>

                  {/* 서브메뉴 드롭다운 */}
                  {item.submenu && (
                    <ul 
                      className={`
                        absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-200
                        ${openMenus[index] ? 'opacity-100 visible' : 'opacity-0 invisible'}
                      `}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={`submenu-item-${index}-${subIndex}`}> 
                          <Link 
                            href={subItem.path ?? '#'} 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* 필요시 모바일 메뉴 토글 버튼 추가 영역 */}
        </div>
      </div>
    </nav>
  );
}