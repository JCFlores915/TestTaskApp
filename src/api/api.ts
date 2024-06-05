import axios from "axios";

 const getElements = async () => {

    const response = await axios.get('https://6172cfe5110a740017222e2b.mockapi.io/elements');
    const data = response.data;
    return data;
};


export default getElements;