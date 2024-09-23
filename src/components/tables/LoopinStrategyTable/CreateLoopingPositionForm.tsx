'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TLoopingStrategy } from '@/types/looping-positions';
import { assetNameToImage } from '@/constants/assetInfo';
import { chainList } from '@/constants/chainInfo';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RxCheck, RxCross2 } from 'react-icons/rx';
import { FaPen } from 'react-icons/fa';

interface CreateLoopingPositionFormProps {
  data: TLoopingStrategy;
}

const CreateLoopingPositionForm: React.FC<CreateLoopingPositionFormProps> = ({ data }) => {
  const {
    pair,
    chain,
    market,
    currentPrice,
    liquidationPrice,
    liquidationBuffer,
    roe,
    maxLeverage,
  } = data;

  const [baseAsset, quoteAsset] = useMemo(() => pair.split('/'), [pair]);
  const chainInfo = useMemo(
    () => chainList.find((chainEntry) => chainEntry.shortName === chain),
    [chain],
  );

  const [slippage, setSlippage] = useState(0.3);
  const [isEditingSlippage, setIsEditingSlippage] = useState(false);
  const [tempSlippage, setTempSlippage] = useState(slippage.toString());

  const handleSlippageEdit = () => {
    setIsEditingSlippage(true);
  };

  const handleSlippageSave = () => {
    const newSlippage = parseFloat(tempSlippage);
    if (!isNaN(newSlippage) && newSlippage >= 0) {
      setSlippage(newSlippage);
    }
    setIsEditingSlippage(false);
  };

  const handleSlippageCancel = () => {
    setTempSlippage(slippage.toString());
    setIsEditingSlippage(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-white text-lg font-semibold">Create new position for {pair}</div>

      <div className="flex items-start justify-between gap-6">
        <div className="bg-[#1E1E1E] w-full mt-3 rounded-xl p-6 gap-4 flex-col flex items-start justify-normal">
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center -space-x-1.5">
              <Image
                src={assetNameToImage(baseAsset)}
                height={40}
                width={40}
                alt={baseAsset}
                className="rounded-full"
              />
              <Image
                src={assetNameToImage(quoteAsset)}
                height={40}
                width={40}
                alt={quoteAsset}
                className="rounded-full"
              />
            </div>
            <div className="space-y-1">
              <p>
                {pair} on {market}
              </p>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-400">{chain}</p>
                {chainInfo?.logo && (
                  <Image
                    className="hover:scale-110"
                    src={chainInfo.logo}
                    height={25}
                    width={25}
                    alt={chain}
                  />
                )}
              </div>
            </div>
          </div>
          {/* create position form */}
          <div className="w-full space-y-5">
            <div className="space-y-1.5">
              <Label className="font-normal text-gray-400 text-sm">Amount</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="w-full text-lg text-white bg-inherit border border-gray-700 rounded-md outline-none placeholder:text-gray-500 px-4 py-3 overflow-hidden"
                />
                <Button
                  size={'sm'}
                  className="w-fit p-1.5 h-auto text-xs absolute right-2 top-1 hover:text-gray-400">
                  Max
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-normal text-gray-400 text-sm">Leverage</Label>
                <div className="text-sm">7.09x</div>
              </div>
              <Slider defaultValue={[33]} max={100} step={1} className="w-full cursor-pointer" />
            </div>

            <hr className="w-full border-gray-600" />

            <div className="flex items-center justify-between">
              <Label className="font-normal text-gray-400">Slippage Tolerance</Label>
              <div className="text-sm">
                {isEditingSlippage ? (
                  <div className="flex items-center relative h-10">
                    <Input
                      type="number"
                      value={tempSlippage}
                      onChange={(e) => setTempSlippage(e.target.value)}
                      className="w-28 text-white bg-inherit border border-gray-700 rounded-md"
                    />
                    <div className="flex gap-2 items-center absolute right-2">
                      <Button size="sm" className="p-0 h-auto" onClick={handleSlippageSave}>
                        <RxCheck size={16} className="text-gray-400" />
                      </Button>
                      <Button size="sm" className="p-0 h-auto" onClick={handleSlippageCancel}>
                        <RxCross2 size={16} className="text-gray-400" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="text-white bg-inherit group flex items-center gap-2 h-10"
                    onClick={handleSlippageEdit}>
                    <div>{slippage}%</div>
                    <FaPen size={12} className="text-gray-400 hidden group-hover:flex" />
                  </button>
                )}
              </div>
            </div>

            <div className="w-full">
              <InfoItem label="Mark Price" value={currentPrice.toFixed(2)} />
            </div>

            <div>
              <Button className="text-black bg-white w-full">Create Position</Button>
            </div>
          </div>
        </div>
        <AdditionalInfoSection
          chain={chain}
          market={market}
          pair={pair}
          roe={roe}
          maxLeverage={maxLeverage}
          currentPrice={currentPrice}
          liquidationPrice={liquidationPrice}
          liquidationBuffer={liquidationBuffer}
        />
      </div>
    </div>
  );
};

interface AdditionalInfoSectionProps {
  chain: string;
  market: string;
  pair: string;
  roe: number;
  maxLeverage: number;
  currentPrice: number;
  liquidationPrice: number;
  liquidationBuffer: number;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  chain,
  market,
  pair,
  roe,
  maxLeverage,
  currentPrice,
  liquidationPrice,
  liquidationBuffer,
}) => {
  const chainInfo = chainList.find((chainEntry) => chainEntry.shortName === chain);

  return (
    <div className="bg-[#1E1E1E] w-full mt-3 rounded-xl p-6 flex items-start flex-col gap-4 justify-between">
      <InfoSection title="General Info">
        <InfoItem label="Chain" value={chain}>
          {chainInfo?.logo && (
            <Image src={chainInfo.logo} height={25} width={25} alt={chain} className="ml-2" />
          )}
        </InfoItem>
        <InfoItem label="Market" value={market} />
        <InfoItem label="Pair" value={pair} />
      </InfoSection>

      <InfoSection title="Final State">
        <InfoItem label="Value" value="3 ETH" />
        <InfoItem label="Leverage" value={`${maxLeverage.toFixed(2)}x`} />
        <InfoItem label="ROE %" value={`${roe}%`} />
        <InfoItem label="YoY Return" value="0.197858 ETH" />
      </InfoSection>

      <InfoSection title="Liquidation Info" hideSepeparator>
        <InfoItem label="Liquidation Price" value={liquidationPrice.toFixed(2)} />
        <InfoItem label="Current Price" value={currentPrice.toFixed(2)} />
        <InfoItem label="Liquidation Buffer" value={`${liquidationBuffer.toFixed(2)}%`} />
      </InfoSection>
    </div>
  );
};

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  hideSepeparator?: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children, hideSepeparator }) => (
  <>
    <div className="space-y-2 w-full">
      <div className="font-semibold">{title}</div>
      {children}
    </div>

    {!hideSepeparator && <hr className="w-full border-gray-600 h-0.5" />}
  </>
);

interface InfoItemProps {
  label: string;
  value: string | number;
  children?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, children }) => (
  <div className="flex items-end justify-between">
    <div className="text-sm text-gray-400">{label}</div>
    <div className="text-gray-50 font-medium flex items-center">
      {value}
      {children}
    </div>
  </div>
);

export default CreateLoopingPositionForm;
