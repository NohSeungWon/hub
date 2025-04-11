"use client"

import { useState } from 'react';
import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';

// 메뉴 항목 타입 정의 (공통으로 사용)
export type MenuItem = {
  path?: string;
  label: string;
  submenu?: MenuItem[];
};

// 네비게이션 메뉴 props 타입 정의
export interface NavigationProps {
  isFullWidth?: boolean; // 서브메뉴가 전체 너비를 차지할지 여부
  isMobileMenu?: boolean; // 모바일 메뉴(햄버거) 사용 여부
}

// 메뉴 항목 배열 정의 (서브메뉴 포함)
export const menuItems: MenuItem[] = [
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
    ],
  }
];

export default function Navigation({ 
  isFullWidth = false, 
  isMobileMenu = false 
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 영역 */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Logo</span>
            </a>
          </div>
          
          {/* 네비게이션 영역 */}
          <div className="flex justify-end">
            {/* 데스크탑 내비게이션 - lg 이상에서 표시 */}
            {!isMobileMenu && (
              <div className="hidden lg:flex justify-end">
                <DesktopNav isFullWidth={isFullWidth} />
              </div>
            )}
            
            {/* 햄버거 버튼 - isMobileMenu가 true이거나 lg 미만일 때만 표시 */}
            {(isMobileMenu || !isFullWidth) && (
              <button
                type="button"
                className={`
                  inline-flex items-center justify-center p-2 rounded-md 
                  text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none
                  ${!isMobileMenu ? 'lg:hidden' : ''}
                `}
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Toggle menu</span>
                {/* 햄버거 아이콘 */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* X 아이콘 */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="border-t">
          <MobileNav />
        </div>
      )}
    </nav>
  );
}