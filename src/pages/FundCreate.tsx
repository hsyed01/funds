import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector, RootState } from '../redux/store';
import { getFunds } from '../redux/slices/fund';

// components
import Page from '../components/Page';
import FundNewForm from '../components/_dashboard/fund/FundNewForm';

// ----------------------------------------------------------------------
const iff = (condition: boolean, then: string, otherwise: string) => (condition ? then : otherwise);

export default function FundCreate() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { funds } = useSelector((state: RootState) => state.fund);
  const isEdit = pathname.includes('show') ? 'show' : iff(pathname.includes('new'), 'new', '');
  const currentFund = funds.find((fund) => fund.fund_id!.toString() === id);

  useEffect(() => {
    dispatch(getFunds());
  }, [dispatch]);

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container>
        <FundNewForm isEdit={isEdit} currentFund={currentFund} />
      </Container>
    </Page>
  );
}
