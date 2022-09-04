import { useState } from 'react'; // , useEffect
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

export interface NavMainProps {
  theme?: MenuProps['theme'];
  onToggleTheme?: Function | undefined;
}

const items: MenuProps['items'] = [
  { key: 'theme', label: '☀' },
].map(val => ({
  key: val.key,
  label: val.label
}));

export default function NavMain({
  theme,
  onToggleTheme,
}: NavMainProps) {
  const [menus, setMenus] = useState<any>(items);

  const onClick: MenuProps['onClick'] = (e) => {
    onToggleTheme?.(theme === 'dark' ? 'light' : 'dark');
    setMenus(menus.map((v: any) => (v.key === e.key ? { ...v, label: theme === 'dark' ? '☀' : '☽' } : v)));
  };

  return (
    <nav id="navMain">
      <Menu
        className="shadow-sm"
        mode="horizontal"
        theme={theme}
        items={menus}
        onClick={onClick}
      />
    </nav>
  )
}
