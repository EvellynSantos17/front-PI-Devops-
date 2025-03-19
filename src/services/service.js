export default async function service({endPoint, method, body}){
    const response = await fetch(`http://localhost:8080${endPoint}`, {
        method: method,
        body: body,
      });
      const data = await response.json();
      return data
}