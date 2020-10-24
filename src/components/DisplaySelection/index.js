import React, {useEffect, useState} from 'react';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from "fg-loadcss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";



/**
 * Component for select the type of view display
 * @param {boolean} selectedDisplay
 * @param {function} setSelectedDisplay 
 */

const DisplaySelection = ({ setSelectedDisplay }) => {
 const [displayView, setDisplayView] = useState('list');
    
 
 const onHandleSelection = (event) => {
    const value = event.target.value === "grid" ? true : false;
    setDisplayView(event.target.value);
    setSelectedDisplay(value);
  };

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <div>
      
      <RadioGroup row aria-label="position" name="radio" defaultValue="list">
        <Radio
          icon={<Icon className="fas fa-list" />}
          checkedIcon={<Icon className="fas fa-list" color="primary" />}
          color="default"
          value="list"
          onChange={onHandleSelection}
          name="radio"
          inputProps={{ "aria-label": "list" }}
          checked={displayView === "list"}
        />

        <Radio
          icon={<Icon className="fas fa-th-large" />}
          checkedIcon={<Icon className="fas fa-th-large" color="primary" />}
          color="default"
          value="grid"
          onChange={onHandleSelection}
          name="radio"
          inputProps={{ "aria-label": "grid" }}
          checked={displayView === "grid"}
        />
      </RadioGroup>
    </div>
  );
};



export default DisplaySelection;