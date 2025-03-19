export default async function service({ endPoint, method = 'GET', body = null, headers = null }) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body),
            next: { tags: ['products'] }
        };

        const response = await fetch(`http://localhost:8080${endPoint}`, options);

        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        return { error: error.message };
    }
}
