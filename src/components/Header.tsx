interface HeaderProps {
    title?: string;
}

// TODO - metadata based header title
const Header: React.FC<HeaderProps> = ({ title = "Blog." }) => {
    return (
        <header className="pt-16 mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
        </header>
    );
};

export default Header;
