import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createBrandFailure,
  createBrandStart,
  createBrandSuccess,
  deleteBrandFailure,
  deleteBrandStart,
  deleteBrandSuccess,
  getBrandFailure,
  getBrandsFailure,
  getBrandsStart,
  getBrandsSuccess,
  getBrandStart,
  getBrandSuccess,
  updateBrandFailure,
  updateBrandStart,
  updateBrandSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';
import { showNotification } from '~/redux/noti/slice'; // Import showNotification

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getBrandsSuccess(data));
  } catch (error) {
    yield put(getBrandsFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getBrandSuccess(data));
    yield put(showNotification({ message: 'Lấy thông tin thương hiệu thành công!', variant: 'success' }));
  } catch (error) {
    yield put(getBrandFailure(error));
    yield put(showNotification({ message: 'Lấy thông tin thương hiệu thất bại!', variant: 'error' }));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createBrandSuccess(data));
    yield put(showNotification({ message: 'Tạo mới thương hiệu thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createBrandFailure(error));
    yield put(showNotification({ message: 'Tạo mới thương hiệu thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateBrandSuccess(data));
    yield put(showNotification({ message: 'Cập nhật thương hiệu thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateBrandFailure(error));
    yield put(showNotification({ message: 'Cập nhật thương hiệu thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteBrandSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa thương hiệu thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteBrandFailure(error));
    yield put(showNotification({ message: 'Xóa thương hiệu thất bại!', variant: 'error' }));
  }
}

function* typeSaga() {
  yield takeLatest(getBrandsStart.type, getAllRequest);
  yield takeLatest(getBrandStart.type, getOneRequest);
  yield takeLatest(createBrandStart.type, createOneRequest);
  yield takeLatest(updateBrandStart.type, updateOneRequest);
  yield takeLatest(deleteBrandStart.type, deleteOneRequest);
}

export default typeSaga;
