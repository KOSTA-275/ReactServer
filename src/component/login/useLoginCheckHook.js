import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const useLoginCheckHook = () => {
    const { toggleLogin } = useAuth();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get('http://localhost:8089/check_session', { withCredentials: true });
                if (res.data.session_status) {
                    toggleLogin(true);
                } else {
                    toggleLogin(false);
                }
            } catch (error) {
                toggleLogin(false);
                console.error('로그인 상태 확인 중 오류 발생:', error);
            }
        };

        checkLoginStatus();
    }, [toggleLogin]);
};

export default useLoginCheckHook;
