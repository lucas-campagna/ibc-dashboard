import { Link } from 'react-router';
import icon from '../../assets/icon.png';

const paths = [
  { name: 'tesouraria', path: '/tesouraria' },
  { name: 'frequência', path: '/frequencia' },
];

const Nav = () => {
  return (
    <header className="bg-blue-500 text-white py-4">
      <nav className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="font-bold text-xl flex items-center">
            <img src={icon} className="w-12 h-12" alt="Icon" />
          </Link>
        </div>
        <div className="flex space-x-6 font-medium">
          {paths.map(({ name, path }) => (
            <Link key={path} to={path} className="hover:text-gray-300 uppercase">
              {name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Nav;