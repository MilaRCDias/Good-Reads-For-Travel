import React from 'react';
import FilterMenu from '../components/FilterMenu';

export default {
  title: "Components/Filter Menu",
  component: FilterMenu,
  argTypes: {
    onChangeBookFilter: { action: "click" },
    selectBookFilter: {
      control: {
        type: "select",
        options: ["travel", "novel", "culture"],
      },
    },
  },
};
export const template = (args) => {
    
    
    return (
      <div>
        {args.loading ? null : (
          <FilterMenu {...args}  />
        )}
      </div>
    );

};


        
    template.args = {
      loading: false,
    };