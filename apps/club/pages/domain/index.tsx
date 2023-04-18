import { NextPage } from 'next';
import useSWR from 'swr';

import { DomainTable } from '../../components/DomainTable';
import { DomainRecord } from '../api/domain/:name';

const DomainPage: NextPage = () => {
  // const { data, error } = useSWR<DomainRecord>('/api/domain/test');

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <div>
      <DomainTable />
    </div>
  );
};

export default DomainPage;
