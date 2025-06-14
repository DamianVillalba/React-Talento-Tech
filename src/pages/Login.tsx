import BackToHomeLink from "../components/common/BackToHome";
import LoginForm from "../components/home/LoginForm";

const Login = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md flex flex-col items-center gap-6">
                <LoginForm />
                <BackToHomeLink className="mt-2" />
            </div>
        </section>
    );
};

export default Login;