import api from '../api.js';

export const getUserProfileCard = async () => {
    try {
        const response = await api.get('/api/user/profile/me')
        return response.data;
    } catch (error) {
        throw new Error('Error ao buscar o perfil do usuario');
    }
};