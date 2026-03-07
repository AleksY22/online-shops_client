import { HeaderMenu } from './header-menu';
import { Logo } from './logo';
import { SearchInput } from './search-input';

export function Header() {
  return (
    <div className="hidden lg:flex justify-between items-center p-5 gap-x-3 h-full bg-white border-b">
      <Logo />
      <div className="ml-auto w-[40%]">
        <SearchInput />
      </div>
      <HeaderMenu />
    </div>
  );
}
