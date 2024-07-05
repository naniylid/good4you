import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import './ProductPage.module.scss';
import { catalogData } from '../../components/Catalog/data';
import image from './main photo.svg';
import image2 from '../../components/Catalog/image.svg';

interface Product {
  id: number;
  title: string;
  price?: number;
}

export const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState<Product>();
  const images = [image, image2, image, image2, image, image2, image];
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  React.useEffect(() => {
    const foundProduct = catalogData.find((item) => item.id === Number(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <>
        <h2>Загрузка...</h2>{' '}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.title}`} | Goods4you</title>
      </Helmet>
      <section className='product-block'>
        <div className='product-block__photos' aria-label='Image Gallery'>
          <div className='main-image'>
            <img src={selectedImage} alt='Selected Product' />
          </div>
          <div className='thumbnail-gallery'>
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img loading='lazy' src={image} alt={`Product ${index}`} />
              </div>
            ))}
          </div>
        </div>
        <div className='product-block__info'>
          <h2>{product.title}</h2>
          <div className='product-block__info--wrapper'>
            <div className='rating'>
              <input type='radio' hidden name='rate' id='rating_opt5' data-idx='0' />
              <label htmlFor='rating_opt5' aria-label='Star'>
                <svg
                  aria-hidden='true'
                  width='16'
                  height='15'
                  viewBox='0 0 16 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z' />
                </svg>
              </label>
              <input type='radio' hidden name='rate' id='rating_opt4' data-idx='1' />
              <label htmlFor='rating_opt4' aria-label='Star'>
                <svg
                  aria-hidden='true'
                  width='16'
                  height='15'
                  viewBox='0 0 16 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z' />
                </svg>
              </label>
              <input type='radio' hidden name='rate' id='rating_opt3' data-idx='2' />
              <label htmlFor='rating_opt3' aria-label='Star'>
                <svg
                  aria-hidden='true'
                  width='16'
                  height='15'
                  viewBox='0 0 16 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z' />
                </svg>
              </label>
              <input type='radio' hidden name='rate' id='rating_opt2' data-idx='3' />
              <label htmlFor='rating_opt2' aria-label='Star'>
                <svg
                  aria-hidden='true'
                  width='16'
                  height='15'
                  viewBox='0 0 16 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z' />
                </svg>
              </label>
              <input type='radio' hidden name='rate' id='rating_opt1' data-idx='4' />
              <label htmlFor='rating_opt1' aria-label='Star'>
                <svg
                  aria-hidden='true'
                  width='16'
                  height='15'
                  viewBox='0 0 16 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z' />
                </svg>
              </label>
            </div>

            <div className='category'>
              <p>electronics, selfie accessories</p>
            </div>
          </div>
          <h4>In Stock - Only 5 left!</h4>
          <p className='about-product'>
            The Essence Mascara Lash Princess is a popular mascara known for its volumizing and
            lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free
            formula.
          </p>
          <p className='delivery-date'>1 month warranty</p>
          <p className='delivery-date'>Ships in 1 month</p>
          <div className='order--block'>
            <div className='order--block__price'>
              <h3>$7.17</h3>
              <p>$9.99</p>
            </div>
            <div className='order--block__discount'>
              <p>
                Your discount: <strong>14.5%</strong>
              </p>
            </div>
            <div className='order--block__button'>
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
