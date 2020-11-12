import React from 'react';
 import DisplayView from '../components/DisplaySelection';


 export default {
   title: "Components/Display view",
   component: DisplayView,
   argTypes: {
     setSelectedDisplay: { action: "click" },
     // backgroundColor : {control: 'color'}
   },
 };

 export const template= (args)=>( <DisplayView {...args} />);

