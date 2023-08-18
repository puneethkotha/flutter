import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useQuery } from '@wasp/queries';
import getCarousels from '@wasp/queries/getCarousels';

export function Home() {
  const { data: carousels, isLoading, error } = useQuery(getCarousels);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Home Page</h1>
      {carousels.length > 0 ? (
        <Carousel>
          {carousels.map((carousel) => (
            <div key={carousel.id}>
              <img src={carousel.imgPath} alt={carousel.caption} />
              <p className='legend'>{carousel.caption}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <div>No carousels to display</div>
      )}
    </div>
  );
}