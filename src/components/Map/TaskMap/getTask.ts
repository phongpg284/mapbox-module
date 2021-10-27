import { useEffect } from 'react'

const getTask = async (id: string) => {
  let data;  
  try {
        const query = {
            action: 'read',
            pk: id,
        }
        const res = await fetch(
            'https://dinhvichinhxac.online/api/task/',
            {
                method: 'POST',
                body: JSON.stringify(query),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        data = await res.json()
    } catch (error) {
      console.log(error)
    }
    return data;
}
export default getTask