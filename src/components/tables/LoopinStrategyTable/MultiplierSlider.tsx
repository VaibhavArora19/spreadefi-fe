import React from 'react';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material';

interface ValueLabelComponentProps {
  children: React.ReactElement;
  value: number;
}

const ValueLabelComponent: React.FC<ValueLabelComponentProps> = ({ children, value }) => {
  return (
    <Tooltip open enterTouchDelay={0} placement="top" title={`${value / 10}x`}>
      {children}
    </Tooltip>
  );
};

const WhiteSlider = styled(Slider)({
  color: '#ffffff',
  '& .MuiSlider-thumb': {
    backgroundColor: '#ffffff',
  },
  '& .MuiSlider-track': {
    backgroundColor: '#ffffff',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#d3d3d3',
  },
});

interface MultiplierSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const MultiplierSlider: React.FC<MultiplierSliderProps> = ({ value = 0, onChange }) => {
  return (
    <div className="w-48 pr-4">
      <WhiteSlider
        onChange={(e, newValue) => {
          if (typeof newValue === 'number') {
            onChange(newValue);
          }
        }}
        value={value}
        valueLabelDisplay="auto"
        step={10}
        min={10}
        max={100}
        valueLabelFormat={(value) => `${value / 10}x`}
        slots={{
          markLabel: ValueLabelComponent,
        }}
        className="w-[80%]"
      />
    </div>
  );
};

export default MultiplierSlider;
