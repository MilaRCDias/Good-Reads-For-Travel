import React from 'react';
import Grid from '@material-ui/core/Grid'
import style from './GoodRead.module.css'

/**
 *  Container component of Good Reads for travel
 * 
 */

const GoodRead=() =>{
   
   
    return (
      <div className={style.main}>
   
        <Grid container justify="space-between" alignItems="center" className={{root:style.headResults}}>
          <h3>
            Results for
            <a href="#">City name</a>
            <span>(238)</span>
          </h3>
          
        </Grid>
      </div>
    );
}

export default GoodRead;