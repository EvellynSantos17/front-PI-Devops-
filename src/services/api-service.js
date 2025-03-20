export default async function apiService({endPoit, method, headers, body}) {
    try {
        const config = {
            method: method || 'GET', 
            headers: {
                'Content-Type': 'application/json',
                ...(headers || {}),
            },
            body: JSON.stringify(body),
        };

        const uri = process.env.URI_API

        const response = await fetch(`http://localhost:8080${endPoit}`, config);

        return await response.json();

    } catch (error) {
        console.error({ "Erro ao requisitar endpoint:": error });
        throw error; 
    }
}
