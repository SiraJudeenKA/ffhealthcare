/**
 * interface used to declare the type for user details
 */
export interface userDetails {
    name: string;
    password: string;
    address: string;
    dob: string;
    email: string;
    gender: string
}

/**
 * interface used to declare the type for login details
 */
export interface loginDetails {
    password: string;
    email: string;
}
