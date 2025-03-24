import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ConfirmModal, Table } from '~/components';
import { CreateComponent, UpdateComponent } from './components';
import { InvoiceItem, RowAction } from '~/types';
import { Delete as DeleteIcon, KeyboardArrowLeft, ModeEdit } from '@mui/icons-material';
import { getInvoiceStart, updateInvoiceStart } from '~/redux/invoice/slice';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '~/utils/currency';
import { admin } from '~/config/routes';

const InvoiceDetailPage = () => {
  const { t } = useTranslation();
  const { invoice, pageCount, rowCount } = useSelector((state: RootState) => state.invoice);
  const dispatch = useDispatch();
  const { id } = useParams();

  const nav = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentItem, setCurrentItem] = useState<InvoiceItem>();

  const columns: MRT_ColumnDef<object>[] = [
    {
      header: '#',
      accessorKey: 'no',
      size: 1,
      enableSorting: false,
      Cell: ({ renderedCellValue }) => <div className='text-center'>{renderedCellValue}</div>
    },
    {
      header: t('name'),
      accessorKey: 'name',
      enableColumnOrdering: true,
      enableMultiSort: true,
      size: 80,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      )
    },
    {
      header: t('price'),
      accessorKey: 'price',
      size: 80,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {formatCurrency(Number(renderedCellValue))}
        </div>
      )
    },
    {
      enableSorting: false,
      header: t('quantity'),
      accessorKey: 'quantity',
      size: 50,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      )
    },
    {
      enableSorting: false,
      header: t('item-total'),
      accessorKey: 'itemTotal',
      size: 90,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {formatCurrency(Number(renderedCellValue))}
        </div>
      )
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: <ModeEdit className='text-green-500' />,
      onClick: (row) => {
        setCurrentItem(row.original);
        setOpenUpdate(true);
      },
      label: t('edit', { value: null })
    },
    {
      icon: <DeleteIcon className='text-red-500' />,
      onClick: (row) => {
        setCurrentItem(row.original);
        setOpenDelete(true);
      },
      label: t('delete', { value: null })
    }
  ];

  useEffect(() => {
    dispatch(getInvoiceStart(id));
  }, [dispatch]);

  const handleSave = (item: InvoiceItem) => {
    dispatch(
      updateInvoiceStart({
        id: id,
        sdtKh: invoice.sdtKh,
        sdtCuaHang: invoice.sdtCuaHang,
        tenKh: invoice.tenKh,
        diaChiCuaHang: invoice.diaChiCuaHang,
        diaChiKh: invoice.diaChiKh,
        items: [...invoice.items, item]
      })
    );
    setOpenCreate(false);
  };

  const handleUpdate = (item: InvoiceItem) => {
    if (currentItem) {
      dispatch(
        updateInvoiceStart({
          id: id,
          sdtKh: invoice.sdtKh,
          sdtCuaHang: invoice.sdtCuaHang,
          tenKh: invoice.tenKh,
          diaChiCuaHang: invoice.diaChiCuaHang,
          diaChiKh: invoice.diaChiKh,
          items: invoice.items.map((i) => (i.id === item.id ? { ...i, ...item } : i))
        })
      );
      setOpenUpdate(false);
    }
  };

  useEffect(() => {
    if (confirmDelete && currentItem) {
      dispatch(
        updateInvoiceStart({
          id: id,
          sdtKh: invoice.sdtKh,
          sdtCuaHang: invoice.sdtCuaHang,
          tenKh: invoice.tenKh,
          diaChiCuaHang: invoice.diaChiCuaHang,
          diaChiKh: invoice.diaChiKh,
          items: invoice.items.filter((i) => i.id != currentItem.id)
        })
      );
      setConfirmDelete(false);
    }
  }, [confirmDelete, currentItem, dispatch]);

  return (
    <>
      <CreateComponent open={openCreate} setOpen={setOpenCreate} onSave={handleSave} />
      <UpdateComponent open={openUpdate} setOpen={setOpenUpdate} onSave={handleUpdate} value={currentItem} />
      <ConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        confirm={confirmDelete}
        setConfirm={setConfirmDelete}
        content={t('confirm-delete', { value: t('type') })}
      />
      <div className='w-full p-3'>
        <div className='flex mb-4 font-bold items-center'>
          <span className={'flex items-center'}>
            <KeyboardArrowLeft
              className={'cursor-pointer'}
              onClick={() => {
                nav(admin.main.invoice);
              }}
            />
            <h3>
              {t('invoice')} {invoice?.id}
            </h3>
          </span>
          <Button variant='contained' style={{ marginLeft: 'auto' }} onClick={() => setOpenCreate(true)}>
            {t('add')}
          </Button>
        </div>
        <div className='w-full'>
          <Table
            columns={columns}
            data={
              invoice?.items?.map((value, index) => ({
                no: index + 1,
                ...value
              })) || []
            }
            setPagination={setPagination}
            pagination={pagination}
            rowCount={rowCount}
            pageCount={pageCount}
            actions={actions}
          />
        </div>
      </div>
    </>
  );
};

export default InvoiceDetailPage;
