import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector, RootState } from '../redux/store';
import { getUserList } from '../redux/slices/user';

// components
import Page from '../components/Page';
import FundNewForm from '../components/_dashboard/fund/FundNewForm';

// ----------------------------------------------------------------------

export default function FundCreate() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { funds } = useSelector((state: RootState) => state.fund);
  const isEdit = pathname.includes('show');
  const currentFund = funds.find((fund) => fund.fund_id.toString() === id);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container>
        <FundNewForm isEdit={isEdit} currentFund={currentFund} />
      </Container>
    </Page>
  );
}
