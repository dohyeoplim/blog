import Header from "./Header";

const NotFound = () => {
    return (
        <>
            <Header title="Error" />

            <div className="flex flex-col items-center space-y-4 justify-center h-72">
                <p className="text-4xl font-bold">404</p>
                <p>페이지를 찾을 수 없습니다 🤔</p>
            </div>
        </>
    );
};
export default NotFound;
