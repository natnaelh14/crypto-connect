import React, { useState } from 'react';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';
import './scroll-arrow.css';


const ScrollArrow = () => {
    const [showScroll, setShowScroll] = useState(false)
    const [showDownScroll, setShowDownScroll] = useState(true)
    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };
    const checkScrollDown = () => {
        if (!showDownScroll && window.pageYOffset <= 400) {
            setShowDownScroll(true)
        } else if (showScroll && window.pageYOffset > 400) {
            setShowDownScroll(false)
        }
    }
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const scrollBottom = () => {
        window.scrollTo({ top: 1200, behavior: 'smooth' });
    };
    window.addEventListener('scroll', checkScrollTop)
    window.addEventListener('scroll', checkScrollDown)

    return (
        <>
            <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{ height: 60, display: showScroll ? 'flex' : 'none' }} />
            <FaArrowCircleDown className="scrollTop" onClick={scrollBottom} style={{ height: 60, display: showDownScroll ? 'flex' : 'none' }} />
        </>
    );
}

export default ScrollArrow;