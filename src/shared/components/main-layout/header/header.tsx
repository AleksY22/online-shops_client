import { HeaderMenu } from './header-menu';
import { Logo } from './logo';
import { SearchInput } from './search-input';

export function Header() {
  return (
    <div className="flex justify-between items-center p-5 gap-x-4 h-full bg-white border-b">
      <Logo />
      <div className="ml-auto hidden w-[40%] lg:block">
        <SearchInput />
      </div>
      <HeaderMenu />
    </div>
  );
}
