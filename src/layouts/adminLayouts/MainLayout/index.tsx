import { LayoutProps } from '~/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSelfStart } from '~/redux/auth/slice';
import { routes } from '~/config';
import { Sidebar } from '~/components';
import AdminHeader from '~/components/AdminHeader';

const MainLayout: React.FC<LayoutProps> = ({ children, title }) => {
  const dispatch = useDispatch();
  const { token, isLogin } = useSelector((state: RootState) => state.auth);
  const nav = useNavigate();
  const [isFullSiderbar] = useState(true);

  useEffect(() => {
    dispatch(getSelfStart());
  }, [dispatch, token]);

  useEffect(() => {
    if (!isLogin) {
      nav(routes.admin.auth.login);
    }
  }, [dispatch, isLogin]);

  const render = () => (
    <div className='w-full min-h-screen bg-[#f2f4f7] flex'>
      <Sidebar isFull={isFullSiderbar} />
      <div className={'w-full'}>
        <AdminHeader title={title} />
        <div className={'px-40 pt-28 w-full'}>{children}</div>
      </div>
    </div>
  );

  return render();
};

export default MainLayout;
