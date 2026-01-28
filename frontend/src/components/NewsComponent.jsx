import React, { useState, useEffect } from 'react';

const NewsComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://newsdata.io/api/1/latest? 
  apikey=pub_bcd6d269e2654b6a95931855e77c2073
  &language=en
  &excludecategory=breaking,business,crime,domestic,education`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default NewsComponent;