import React, { useState, useEffect } from 'react';
import './SlideShow.css';

const SlideShow = ({ setShowDonatePage, setShowLogin, isLoggedIn }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { src: '/blanket.jpg', text: 'Spread warmth this winter by donating your gently used winter clothes to those in need' },
        { src: '/food.jpeg', text: 'Share the love by donating food to help nourish those in need.' },
        { src: '/health.jpg', text: 'Extend a helping hand by donating to NGOs and support those in need.' },
        { src: '/gro.webp', text: 'Got excess groceries or rations? Share them to feed families in need' },
    ];

    // Automatic slide transition logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // 5-second delay for each slide
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const handleDonateNow = () => {
        if (!isLoggedIn) {
            setShowLogin(true); // Show login popup if not logged in
        } else {
            setShowDonatePage(true); // Show the donation page if logged in
        }
    };

    return (
        <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    key={index}
                >
                    <img src={slide.src} alt={`Slide ${index + 1}`} />
                    <div className="slide-text">
                        <h2>{slide.text}</h2>
                        <button onClick={handleDonateNow}>Donate now</button>
                    </div>
                </div>
            ))}
            <button className="prev" onClick={prevSlide}>❮</button>
            <button className="next" onClick={nextSlide}>❯</button>
        </div>
    );
};

export default SlideShow;
