import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { consignee } from '~/data/fake';
import { useState } from 'react';
import ConsigneeModal from '~/pages/customer/cart/CartPage/components/ConsigneeModal';

const ConsigneeComponent = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <ConsigneeModal show={show} setShow={setShow} />
      <div
        className={
          'w-full text-sm justify-between rounded-lg p-2 cursor-pointer flex bg-[rgb(241,248,254)] border-[rgb(42,131,233)] border-dotted border-[1px]'
        }
        onClick={() => setShow(true)}
      >
        <div className={'text-left'}>
          <div className={'mb-1 text-black'}>
            <span className={'capitalize  font-bold'}>{t('consignee')}: </span>
            <span>{consignee.isMale === true ? t('mr') : t('ms')} </span>
            <span className={'uppercase'}> {consignee.name}</span> - <span>{consignee.phone}</span>
          </div>
          <div className={'text-[#667085]'}>
            <FontAwesomeIcon className={'text-red-500'} icon={faLocationDot} />
            <span> {consignee.address}</span>
          </div>
        </div>
        <div className={'flex items-center '}>
          <FontAwesomeIcon className={'text-[10px] text-[rgb(42,131,233)]'} icon={faChevronRight} />
        </div>
      </div>
    </>
  );
};
export default ConsigneeComponent;
