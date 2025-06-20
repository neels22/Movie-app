// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDVlY2M1MDRlMWQxMTliZjNmM2E5OTJhMzA5YWI0OCIsIm5iZiI6MTc1MDI4ODQ4MC4xNjk5OTk4LCJzdWIiOiI2ODUzNDg2MGU2YTY4Nzk2NTQ3OWFlNDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4rOgTMQH85Y_2aTj3-ewA5IXuTFhPsmNNi2Ns5OOZ3E'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));


export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
    },
}


export const fetchMovies = async ({query}:{query: string}) => {
    const endpoint = query ? `search/movie?query=${encodeURIComponent(query)}` : "discover/movie?sort_by=popularity.desc";
    const url = `${TMDB_CONFIG.BASE_URL}/${endpoint}`;
    
    // Debug logging
    // console.log('API Key:', TMDB_CONFIG.API_KEY ? 'Set' : 'Not set');
    // console.log('Request URL:', url);
    // console.log('Request headers:', TMDB_CONFIG.headers);
    
    const options = {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    };
    
    const response = await fetch(url, options);
    // console.log('Response status:', response.status);
    // console.log('Response headers:', response.headers);
    
    if (!response.ok) {
        const errorText = await response.text();
        // console.log('Error response body:', errorText);
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // console.log('Success response:', data);
    return data.results;
}