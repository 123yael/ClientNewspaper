import axios from 'axios';


export const SentFile = () => {

    const apiKey = 'https://fliphtml5.com/bookcase/immlf/';

    const data = {
        title: 'newspaper',
        file: 'https://localhost:44305/finalNewspaper2.pdf',
        options: {
            flipType: 'flip'
        }
    };

    const config = {
        headers: { Authorization: `Bearer ${apiKey}` }
    };

    axios.post('https://api.fliphtml5.com/v1/book', data, config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error + 2);
        });
    return (
        <div>{link}</div>
    )
}
const apiKey = 'https://fliphtml5.com/bookcase/immlf/';

const data = {
    title: 'newspaper',
    file: 'https://localhost:44305/finalNewspaper2.pdf',
    options: {
        flipType: 'flip'
    }
};

const config = {
    headers: { Authorization: `Bearer ${apiKey}` }
};

let link = axios.post('https://api.fliphtml5.com/v1/book', data, config)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });


