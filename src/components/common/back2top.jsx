import React, {useState} from 'react';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <React.Fragment>
            {visible && <button id='scrollUp' onClick={scrollToTop}>
                {/*<img className="w-10 h-10 " src="./img/up-arrow.png"/>*/}
                <i className='fas fa-arrow-up'/>
            </button>}
        </React.Fragment>

    );
}

export default ScrollButton;