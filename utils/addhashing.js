// import {hash, compare } from 'bcryptjs'

export const singupHash = (value , SaltValue) => {

    const result = hash(value, SaltValue);
    return result;

}

export const loginHash = (value , hashedValue) => {

    const result = compare(value, hashedValue);
    return result;

}



// Export the router to use it in your app
export default singupHash; loginHash; 