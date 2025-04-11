import Link from 'next/link';
import { MenuItem } from './navigation';

interface FullWidthSubmenuProps {
  submenuItems: MenuItem[];
  parentIndex: number;
}

export default function FullWidthSubmenu({ submenuItems, parentIndex }: FullWidthSubmenuProps) {
  return (
    <div 
      className={`
        absolute left-0 w-screen bg-white shadow-lg py-4 z-10
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-200
      `}
      style={{ top: '64px' /* h-16의 픽셀 값 */ }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-6">
          {submenuItems.map((subItem, subIndex) => (
            <div key={`submenu-item-${parentIndex}-${subIndex}`} className="group">
              <Link 
                href={subItem.path ?? '#'} 
                className="text-base font-medium text-gray-700 hover:text-blue-600"
              >
                {subItem.label}
              </Link>
              <p className="mt-1 text-sm text-gray-500">
                {/* 서브메뉴 설명 (필요시 추가) */}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 