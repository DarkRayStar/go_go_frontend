import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { SliderData } from './SliderData';
import axios from 'axios';
import './home.css'

const HomeSlider = () => {

    const [current, setCurrent] = useState(0);
    // const [SliderData, SetSliderData] = useState([]);
    // const [length, setLength] = useState();
    const length = SliderData.length;
    console.log('a', SliderData);

    // const getItems = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5050/storeAdmin');
    //         // SetSliderData(response.data.images);
    //         setLength(response.data.length);
    //         for (var i=0 ; i < response.data.length ; i++){
    //             // console.log('i', response.data[i].images[0])
    //             // SetSliderData(response.data[i].images[0])
    //             SliderData.push(response.data[i].images);
    //         }
    //         console.log('a',SliderData )
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getItems();
    // }, [])

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }

    return (
        <section className='slider'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} alt='travel image' className='image' />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default HomeSlider;