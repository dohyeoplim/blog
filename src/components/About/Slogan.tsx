export interface SloganProps {
    texts: string[];
}

const Slogan = ({ texts }: SloganProps) => {
    return (
        <div className="mt-24 md:text-7xl text-5xl font-extralight flex flex-col space-y-4 cursor-default">
            {texts.map((text, index) => (
                <p
                    key={index}
                    className="hover:scale-[105%] transition-transform duration-300 ease-in-out"
                >
                    <span className="font-semibold">{text.charAt(0)}</span>
                    {text.slice(1)}
                </p>
            ))}
        </div>
    );
};

export default Slogan;
