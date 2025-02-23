import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import DropdownList from 'react-widgets/DropdownList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { getAttributesStart } from '~/redux/attribute/slice';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({
    name,
    description,
    attribute
  }: {
    name: string | null;
    description: string | null;
    attribute: number | null;
  }) => void;
}

const CreateComponent: React.FC<IProps> = ({ open, setOpen, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { attributes } = useSelector((state: RootState) => state.attribute);
  const [attribute, setAttribute] = useState<{ id: number; name: string; description: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) {
      setName('');
      setDescription('');
      setAttribute(null);
    } else {
      dispatch(getAttributesStart({}));
    }
  }, [open]);

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{t('create', { value: t('attribute-value') })}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className='p-3 w-full flex flex-col gap-3'>
          <div className='flex w-full gap-3'>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size='small'
              label={t('name')}
            />
            <DropdownList
              className={'text-left'}
              data={attributes}
              onChange={(value) => setAttribute(value)}
              value={attribute}
              dataKey='id'
              textField='name'
              placeholder={t('attribute-value')}
              defaultValue={1}
            />
          </div>
          <div>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              size='small'
              label={t('description')}
            />
          </div>
        </div>
        <Divider />
        <div className='p-3 w-full flex gap-3 justify-end'>
          <Button variant='outlined' onClick={() => onSave({ name, description, attribute: attribute.id })}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default CreateComponent;
