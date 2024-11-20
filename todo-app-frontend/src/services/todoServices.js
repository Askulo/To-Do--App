import axios from "axios";

const API_URL ='http://localhost:5000/api/todos';


//fetch all todos 

export const fetchTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;

    } catch(error){
        console.log('Error fetching todos:', error);
        return [];
        
    }
};


export const addTodo = async (title)=> {
    try {
        const response = await axios.post(`${API_URL}/add`, {title});
        return response.data;
        
    } catch (error) {
        console.error('Error adding Todo:',error);
        return null;
        
        
    }
};


//Update a  to do

export const updateTodo = async (id, updatedData) => {
    try {

        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
        
    } catch (error) {
        console.error('Error updating todo:', error);
        return null;
    
        
    }
}


// Delete a To-Do
export const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return null;
    }
  };
  