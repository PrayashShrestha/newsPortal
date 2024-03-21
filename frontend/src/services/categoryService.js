import axios from "axios";

export default getByCategory = async (id) => {
    try {
      const response = await axios.post(`/api/news/Publish/${id}`,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log(response)
    }catch(error){
      console.log(error)
    }
  };