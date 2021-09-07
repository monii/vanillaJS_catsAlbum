const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const getDirectoryData = async (nodeId) => {
    try {
        const response =  await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`);
        if(response.ok) {
            return response.json();
        }
    } catch (error) {
        console.warn(error);
    }
}