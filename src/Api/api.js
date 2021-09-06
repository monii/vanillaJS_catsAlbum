const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const getDirectoryData = (nodeId) => {
         return fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`).then(response =>  response.json());
}