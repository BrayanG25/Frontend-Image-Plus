'use client'

import InputField from './inputField';
import ButtonSubmit from './buttonSubmit';
import Redirect from './redirect';
import Title from './title';

import { useForm } from 'react-hook-form';
import { singUpFetch } from '../api/auth';
import { mapBackendErrorsToFrontend } from '../utils/fieldMappings';
import { emailRegex, passwordMinLength } from '../utils/regex';

const SignUpForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    
    const onSubmit = handleSubmit(async(data) => {
        if(data.password != data.confirmPassword) return setError('confirmPassword', { type: 'validate', message: 'Password do not match'});

        const response = await singUpFetch(data);
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
                            message: `${errorMappings[key]}`
                        });
                    }
                }
            }
        }
    })

    return (
        <form onSubmit={onSubmit}>
            {/* Title */}
            <div className='mb-4'>
                <Title 
                    text='Sign up' 
                    align='text-left' 
                    size='text-4xl'
                />
            </div>
            {/* Username */}
            <InputField
                id="username"
                label="Username"
                type="text"
                placeholder="username123"
                register={register}
                validation={{ required: { value: true, message: 'Username is required' } }}
                error={errors.username}
            />  
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
            {/* Confirm password */}
            <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                register={register}
                validation={{ required: { value: true, message: 'Confirm Password is required' } }}
                error={errors.confirmPassword}
            />
            {/* Button submit */}
            <ButtonSubmit
                label='Sign up'
                paddingX='px-4'
                paddingY='py-2'
                size='text-md'
                marginTop='mt-2'
                marginButtom='mb-4'
            />
            {/* Redirect register */}
            <Redirect
                text='Log In'
                description='Already have an account?'
                href='/auth/login'
            />
        </form>
    );
};

export default SignUpForm;
