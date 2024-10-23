import Navbar from '@/app/components/navbar';
import SignUpForm from '../../components/signUpForm';

function SignUpPage () {
    return(
        <>
            <Navbar/>
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className='w-full max-w-md p-6 sm:p-10 rounded-md bg-zinc-700 mx-4 my-4'>
                    <div className="max-h-[80vh] overflow-auto">
                        <SignUpForm/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;