import cn from 'classnames';

export function App() {
  return (
    <header className={cn('bg-blue-500', 'shadow-lg', 'p-4')}>
      <nav className="container mx-auto">
        <div className={cn('flex', 'justify-between', 'items-center')}>
          <div className="text-white text-lg">Nome do Site</div>
          <div className="space-x-4">
            <a href="#" className={cn('text-white', 'hover:text-blue-200')}>
              Home
            </a>
            <a href="#" className={cn('text-white', 'hover:text-blue-200')}>
              Sobre
            </a>
            <a href="#" className={cn('text-white', 'hover:text-blue-200')}>
              Contato
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
