import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Tablo = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // DATA
  useEffect(() => {
    const fetchData = async () => {
        try{
          const tokenRes = await fetch("https://api.baubuddy.de/index.php/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic QVBJX0V4cGxvcmVyOjEyMzQ1NmlzQUxhbWVQYXNz'
            },
            body: JSON.stringify({
              "username": "365",
              "password": "1"
            })
          });
          const tokenData = await tokenRes.json();

          const res = await fetch("https://api.baubuddy.de/index.php/login", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenData.oauth.access_token}`
            }
          });
          const data = await res.json();
          setData(data);
        }
      catch (err) {console.error(err);}
    };
    fetchData();
    const autoRef = setInterval(fetchData, 3600000);
    return ()=> clearInterval(autoRef);
    },[]);

    // SEARCHBAR 

    const handleValue = (e) =>{
      setSearchText(e.target.value);
    };

    const filterData = data.filter((item)=>
    Object.values(item).join(" ").toLowerCase().includes(searchText.toLowerCase()));


  return (
    <div className='content'>
        <input type='text' placeholder='Search...'
      className='input-medium search-query input' value={searchText}
      onChange={handleValue}/>
      
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Color Code</th>
                </tr>
            </thead>
            <tbody>
              {
                filterData.map(item=>(
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td style={{backgroundColor:item.colorCode}}>{item.colorCode}</td>
                  </tr>
                ))
              }
            </tbody>
        </table>
    </div>
  )
}

export default Tablo;