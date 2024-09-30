const knightMoves = (start, target) => {
  if (
    typeof (start, target) !== "array" &&
    start.length !== 2 &&
    target.length !== 2
  ) {
    throw new Error("Please enter two co-ordinates as arrays");
  }
  nextMoves = new Map();

  const addNode = (value, start) => {
    nextMoves.set(value.toString(), []);
    nextMoves.get(value.toString()).push(start);
  };
  const possibleMoves = (start) => {
    let arr = new Array();
    arr.push([start[0] + 2, start[1] + 1]);
    arr.push([start[0] - 2, start[1] - 1]);
    arr.push([start[0] - 2, start[1] + 1]);
    arr.push([start[0] + 2, start[1] - 1]);
    arr.push([start[0] + 1, start[1] + 2]);
    arr.push([start[0] - 1, start[1] - 2]);
    arr.push([start[0] - 1, start[1] + 2]);
    arr.push([start[0] + 1, start[1] - 2]);
    return arr.filter(
      (node) => node[0] > -1 && node[1] > -1 && node[0] < 9 && node[1] < 9
    );
  };

  const addEdges = (start, connect) => {
    nextMoves.get(start).push(connect);
  };

  const buildPath = (start, target) => {
    let movedPath = stepGrab(start, target);
    let printPath = "";
    for (let i = 0; i < movedPath.length; i++) {
      printPath += `[${movedPath[i]}]`;
    }
    return ` A knight can move in ${
      movedPath.length + 1
    } moves, starting from [${start}] to [${target}], using the shortest path [${start}]${printPath}[${target}]`;
  };

  const stepGrab = (start, target) => {
    let arr = [];
    current = [nextMoves.get(target.toString())[0]];
    arr.push(current);
    while (current.toString() !== start.toString()) {
      arr.push(nextMoves.get(current.toString())[0]);
      current = nextMoves.get(current.toString())[0];
    }

    arr.pop();
    return arr.reverse();
  };

  const bfs = (start, target) => {
    let queue = start;
    while (!nextMoves.has(target.toString())) {
      let current = queue.shift();
      let nextMove = nextMoves.get(current.toString());
      nextMove[1].forEach((node) => {
        if (nextMoves.has(node.toString())) {
          return;
        }
        queue.push(node),
          addNode(node, current),
          addEdges(node.toString(), possibleMoves(node));
      });
    }
  };
  possibleMoves(start).forEach((node) => {
    addNode(node, start);
    addEdges(node.toString(), possibleMoves(node));
  });
  bfs(possibleMoves(start), target);
  return buildPath(start, target);
};
knightMoves([7, 0], [0, 0]);
