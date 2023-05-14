'use client';
import React, { useEffect, useState } from 'react';
import supabase from '../../../lib/supabase-browser';
import { useRouter } from 'next/navigation';

function TeamForm() {
  const router = useRouter();
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');

  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    fetchSports();
    fetchPlayers();
  }, []);

  const fetchSports = async () => {
    const { data: sports, error } = await supabase.from('category_sports').select('*');
    if (error) {
      console.log('Error fetching sports', error);
    } else {
      console.log('sports', sports);
      setSports(sports);
    }
  };

  const fetchPlayers = async () => {
    const { data: players, error } = await supabase.from('profiles').select('*');
    if (error) {
      console.log('Error fetching players', error);
    } else {
      console.log('players', players);
      setPlayers(players);
    }
  };

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handlePlayerChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedPlayers(selectedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    console.log('formData', )
    try {
      const { data, error } = await supabase.from('teams').insert({
        name,
        sport: selectedSport, // Ajouter le sport sélectionné dans l'insertion de la nouvelle équipe
      }).select();

      if (!error) {
          const { error: teamMembersError } = await supabase.from('team_members').insert(
            selectedPlayers.map((playerId) => ({ team_id: data[0].id, user_id: playerId }))
          );
        if (!teamMembersError) {
          router.push(`/teams`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="name">Choose players:</label>
      <input name="name" type={'text'} required />
      <label htmlFor="sport">Choose a sport:</label>
      <select id="sport" name="sport" onChange={handleSportChange}>
        <option value="">Select a sport</option>
        {sports.map((sport) => (
          <option key={sport.id} value={sport.id}>
            {sport.name}
          </option>
        ))}
      </select>
      <label htmlFor="players">Choose players:</label>
      <select id="players" name="players" multiple onChange={handlePlayerChange}>
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.id}
          </option>
        ))}
      </select>
      <button type={'submit'}>
        create team
      </button>
    </form>
  );
}

export default TeamForm;
