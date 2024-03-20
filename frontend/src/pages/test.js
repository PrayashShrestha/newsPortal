import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import { Typography } from '@mui/material';

const ImageDisplay = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchImageData = async () => {
      const response = await fetch('/api/editor',{
        method: 'GET',

      })
      if(response.ok){
        const res = await response.json()
        console.log(res)
          setData(res[18])
      }
    };

    fetchImageData();
  }, []);

  return (
    <div>
        <h1>
            {data?.title}
        </h1>
        {data?.content?.map((d) => (<Typography>{d}</Typography>))}
        <Image src={data.featuredImage} alt='testing' width={100} height={100}/>
    </div>
  );
};

export default ImageDisplay;