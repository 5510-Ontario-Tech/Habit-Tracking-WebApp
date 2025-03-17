import {hash} from 'bcryptjs'

export const singupHash = (value , SaltValue) => {

    const result = hash(value, SaltValue);
    return result;

}


// Export the router to use it in your app
export default singupHash; 