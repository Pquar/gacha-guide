export function SpendingTable() {
  return (
    <div className="flex justify-center mt-8">
      <table className="w-3/5 border-collapse text-center">
        <thead>
          <tr className="border-b">
            <th className="p-4">Acronym</th>
            <th className="p-4">Term</th>
            <th className="p-4">Description</th>
            <th className="p-4">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4">F2P</td>
            <td className="p-4">Free-to-Play Players</td>
            <td className="p-4">Players who do not spend money in the game.</td>
            <td className="p-4 text-green-500 text-2xl">🟢</td>
          </tr>
          <tr className="border-b">
            <td className="p-4">M3P</td>
            <td className="p-4">Mid Spenders</td>
            <td className="p-4">Players who spend moderately and aim to maximize the amount spent.</td>
            <td className="p-4 text-blue-500 text-2xl">🔵</td>
          </tr>
          <tr className="border-b">
            <td className="p-4">Whale</td>
            <td className="p-4">Heavy Spenders</td>
            <td className="p-4">Players who invest heavily to maximize POWER gains.</td>
            <td className="p-4 text-purple-500 text-2xl">🟣</td>
          </tr>
          <tr>
            <td className="p-4">Kraken</td>
            <td className="p-4">Max Spenders</td>
            <td className="p-4">Players who buy almost everything available without limits.</td>
            <td className="p-4 text-red-500 text-2xl">🔥</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
