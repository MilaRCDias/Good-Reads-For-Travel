import React from "react";
import Lottie from 'react-lottie';
import animation from '../../assets/animation/reading-clouds.json';



/**
 * Component with animation to show on empty state
 */
 const EmptyState = () => {
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

    return (

        <Lottie options={defaultOptions}
            width={300}
         />
 
  );
};

export default EmptyState;
