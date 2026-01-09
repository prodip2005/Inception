import { useMemo } from 'react';
import axios from 'axios';

const useAxios = () => {
    const axiosSecure = useMemo(() => {
        return axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }, []);

    return axiosSecure;
};

export default useAxios;
