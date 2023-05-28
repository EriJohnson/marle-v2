import { useQuery, Heading, Input } from '@chakra-ui/react';
import { ChangeEvent, Key, useMemo, useState } from 'react';
import UsersService from '@/services/UsersService';
import LeadersList from './LeadersList';
import LeadersListItem from './LeadersListItem';

export default function Leaders() {
  const [search, setSearch] = useState('');

  const { data } = useQuery({
    queryKey: ['leaders'],
    queryFn: UsersService.findAll,
  });

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredLeaders = useMemo(
    () =>
      data?.filter((leader: { fullName: string }) =>
        leader.fullName.toLowerCase().includes(search.toLowerCase())
      ),
    [search, data]
  );

  return (
    <>
      <Heading as="h5" size="md" mb={2}>
        Líderes
      </Heading>

      <Input
        placeholder="Busque pelo nome do líder"
        onChange={handleSearchChange}
        mt={3}
      />

      <LeadersList>
        {filteredLeaders?.map((leader: { id: Key | null | undefined }) => (
          <LeadersListItem key={leader.id} leader={leader} />
        ))}
      </LeadersList>
    </>
  );
}
