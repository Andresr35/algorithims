const node = (coord, parent = null, moves = 0) => {
  return { coord, moves, parent };
};

const knight = () => {
  const moves = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];

  const returnNextMoves = (start) => {
    return moves
      .map((offest) => {
        const x = start.coord[0] + offest[0];
        const y = start.coord[1] + offest[1];
        return node([x, y], start, start.moves + 1);
      })
      .filter((move) => {
        if (
          move.coord[0] < 0 ||
          move.coord[0] > 8 ||
          move.coord[1] < 0 ||
          move.coord[1] > 8
        ) {
          return false;
        } else {
          return true;
        }
      });
  };

  const play = (start, end, queue = [], visited = []) => {
    visited.push(start);
    if (JSON.stringify(start.coord) == JSON.stringify(end.coord)) return start;
    queue.push(
      ...returnNextMoves(start).filter(
        (move) =>
          !visited.some(
            (visit) => JSON.stringify(move.coord) == JSON.stringify(visit.coord)
          )
      )
    );
    if (queue.length === 0) return null; // this is what I would do if I had a smaller board and I couldn't hit a certain square

    return play(queue.shift(), end, queue, visited);
  };

  return { returnNextMoves, play };
};

const test = knight();

function print(start) {
  console.log(`Congrats! You made it in ${start.moves} moves!`);
  while (start !== null) {
    console.log(start.coord);
    start = start.parent;
  }
}

print(test.play(node([3, 3]), node([7, 0])));
