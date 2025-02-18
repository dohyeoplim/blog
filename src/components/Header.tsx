interface HeaderProps {
    title?: string;
}

// TODO - metadata based header title
const Header: React.FC<HeaderProps> = ({ title = "Blog." }) => {
    return (
        <header className="pt-24 mb-16">
            <h1 className="text-4xl font-bold">{title}</h1>
        </header>
    );
};

export default Header;
