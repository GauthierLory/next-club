import Link from 'next/link';

type TeamCardProps = {
  team: {
    id: string,
    name: string,
  };
};

export const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Link
      href={`/teams/${team.id}`}
    >
      <h5>{team.name}</h5>
    </Link>
  );
};
