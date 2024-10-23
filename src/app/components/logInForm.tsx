'use client'

import InputField from './inputField';
import ButtonSubmit from './buttonSubmit';
import Redirect from './redirect';
import Title from './title';

import { useForm } from 'react-hook-form';
import { logInFetch } from '../api/auth';
import { mapBackendErrorsToFrontend } from '../utils/fieldMappings';
import { emailRegex, passwordMinLength } from '../utils/regex';
import { useRouter } from 'next/navigation';

const LogInForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const router = useRouter();
    
    const onSubmit = handleSubmit(async(data) => {

        const response = await logInFetch(data);
        console.log(response);

        if (!response.success) {
            const errorField = response.data;
            if (errorField) {                
                const errorMappings = mapBackendErrorsToFrontend(errorField);
                if (errorMappings) {
                    const keys = Object.keys(errorMappings);
                    for (const key of keys) {
                        setError(key, {
                            type: 'server',
                            message: `The ${errorMappings[key]}`
                        });
                    }
                }
            }
        } else {
            router.push('/images/favorites');
        }
    })

    return (
        <form onSubmit={onSubmit}>
            {/* Title */}
            <div className='mb-4'>
                <Title 
                    text='Log In' 
                    align='text-left' 
                    size='text-4xl'
                />
            </div>
            {/* Email */}
            <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="username123@gmail.com"
                register={register}
                validation={{ 
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: emailRegex, message: 'Invalid email address' }
                }}
                error={errors.email}
            />
            {/* Password */}
            <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                register={register}
                validation={{ 
                    required: { value: true, message: 'Password is required' },
                    minLength: { value: passwordMinLength, message: 'The password must be at least 8 characters long'},
                }}
                error={errors.password}
            />
            {/* Button submit */}
            <ButtonSubmit
                label='Log In'
                paddingX='px-4'
                paddingY='py-2'
                size='text-md'
                marginTop='mt-2'
                marginButtom='mb-4'
            />
            {/* Redirect register */}
            <Redirect
                text='Sign Up'
                description='Don&apos;t have an account?'
                href='/auth/signup'
            />
        </form>
    );
};

export default LogInForm;
