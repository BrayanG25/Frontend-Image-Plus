interface FrontendErrorMap {
    [key: string]: string;
};

const backendToFrontendFieldMap: { [key: string]: string } = {
    username: 'username',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
};

export const mapBackendErrorsToFrontend = (errors: { [key: string]: { field: string; message: string } }): FrontendErrorMap => {
    const mappedErrors: FrontendErrorMap = {};
  
    Object.keys(errors).forEach((key) => {
      const { message, field } = errors[key];
      const frontendField = backendToFrontendFieldMap[field] || field;
      mappedErrors[frontendField] = message;
    });
  
    return mappedErrors;
  };