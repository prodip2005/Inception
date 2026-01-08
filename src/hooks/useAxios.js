import { useMemo } from 'react';
import axios from 'axios';

const useAxios = () => {
    const axiosSecure = useMemo(() => {
        return axios.create({
            baseURL: 'https://inception-server.vercel.app',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }, []);

    return axiosSecure;
};

export default useAxios;
