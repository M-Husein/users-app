export default function request(options: any){
  return new Promise((resolve, reject) => {
    fetch(options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      })
  });
}
