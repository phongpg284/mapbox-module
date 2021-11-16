import { useEffect } from 'react'
import { ENDPOINT_URL } from '../../../app/config';

const getTask = async (id: string) => {
  let data;  
  try {
        const query = {
            action: 'read',
            pk: id,
        }
        const res = await fetch(
            ENDPOINT_URL + '/task/',
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