import axios from './customize-axios';
const fetchAllUser = () => {
    return axios.get("/users");
}
export {fetchAllUser};