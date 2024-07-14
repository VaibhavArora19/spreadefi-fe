import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material';

interface ValueLabelComponentProps {
  children: React.ReactElement;
  value: number;
}

const ValueLabelComponent: React.FC<ValueLabelComponentProps> = ({
  children,
  value,
}) => {
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

const MultiplierSlider: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(30);

  return (
    <div className="w-48 pr-4">
      <WhiteSlider
        onChange={(e, value) => {
          if (typeof value === 'number') {
            setSliderValue(value);
          }
        }}
        value={sliderValue}
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
