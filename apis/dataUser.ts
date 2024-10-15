import { NewInfoUser } from "@types"

export const changeDataUser = async (newInfo: NewInfoUser) => {
    try {
        const response = await fetch('http://localhost:8000/edit_user/', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newInfo)
          })
    
          if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Error in updating user information')
          }
    
          return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const deleteUserFromBD = async (userID: string | null) => {
    try {
        const response = await fetch(`http://localhost:8000/delete-user/${userID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' } 
        })
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to delete user');
        }
  
        return await response.json()
  
      } catch (error: any) {
        console.error(error)
      }
}