// app/page.tsx

import React from 'react';
import PlayerCard from './src/components/cards/player-card';

interface Player {
  id: number;
  name: string;
  position: string;
  nationality: string;
  height: string;
  weight: string;
  team: string;
  image: string;
}

// Dummy data – Replace with real API fetch or DB query
const getPlayers = async (): Promise<Player[]> => {
  return [
    {
      id: 1,
      name: 'John Doe',
      position: 'Quarterback',
      nationality: 'USA',
      height: '6\'2"',
      weight: '210 lbs',
      team: 'London Warriors',
      image: '/images/john-doe.jpg',
    },
    {
      id: 2,
      name: 'Marco Rossi',
      position: 'Wide Receiver',
      nationality: 'Italy',
      height: '5\'11"',
      weight: '190 lbs',
      team: 'Milano Seamen',
      image: '/images/marco-rossi.jpg',
    },
    // Add more players here
  ];
};

export default async function HomePage() {
  const players = await getPlayers();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Discover American Football Players in Europe</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </main>
  );
}
