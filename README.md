# Project-knight-travails

This is a project that involves finding the shortest amount of moves a knight piece in chess can make to reach it's destination, The Full can be found on [The Odin Project](https://www.theodinproject.com/lessons/javascript-knights-travails)

## ToDo

- Refactor Code
- Look to make more efficiant
- Incorporate ways to shows multiple shortest route

## Starting out

This project took the better part of a Week to do and honestly at one point I almost considered skipping it but that wouldn't accomplish anything and this project has been education and enjoyable.

As the project lists we want to create a function to find the shortest route from the start to the end.

```js
const knightMoves = (start, target) => {
  // Code goes here
};
```

The brief mentions using Graphs which at the time the concept seemed completely alien, Researching Graphs, the `Map()` Object came up a so lets go with that.

As well as having the map I want a function that adds to the map. (The Value is convered to a string because it's easier to compare two strings than it is two arrays. )

```js
const knightMoves = (start, target) => {
  nextMoves = new Map();
  const addNode = (value, start) => {
    nextMoves.set(value.toString(), []);
  };
};
```

Values can now be added to the Map but we need to determine what values can be added. The Knight has a total of eight moves from it's point that it can use. However a chessboard is 8x8 so if any of the values go above 8 or below 0 said moves would be illegal.

(There is probably a more efficient way to determine the next moves eather than push each new move individually but since that's not the focus of the project this was done for speed.)

```js
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
```

With new each value found, to generate more nodes if the answer isn't found I want to add those Functions possible moves to the value.

```js
// Start must be passed in with .toString()
const addEdges = (start, connect) => {
  nextMoves.get(start).push(connect);
};
```

### Creating first values

We run the following in the function to get our first set of values. It iterates through the array of returned by possible moves, adding each of them to the `nextMoves` map and adding their possible moves to the Key

```js
possibleMoves(start).forEach((node) => {
  addNode(node);
  addEdges(node.toString(), possibleMoves(node));
});
```

### Searching for the route.

To Search for the shortest route, we're going to go through the values of possible moves created after the initial function,

To make life easier we push the array of values to a new variable to track it and we create a new Set to hold values that have already been passed.

```js
const bfs = (start, target) => {
  let queue = start;
  let visited = new Set();
};
```

The gist is we want to keep generating new nodes untill the target is found,

We add the array to it's own variable `queue` and untill our target is found in the `Map()` the first value in the queue, if the value is already in the queue it skips it and adds it's possible moves to the end of the queue but not before removing the first value. the process continues untill the target is found.

```js
const bfs = (start, target) => {
  let queue = start;
  while (!nextMoves.has(target.toString())) {
    console.log("while, loop");
    let current = queue.shift();
    let nextMove = nextMoves.get(current.toString());
    nextMove[0].forEach((node) => {
      if (nextMoves.has(node.toString())) {
        return;
      }
      queue.push(node),
        addNode(node),
        addEdges(node.toString(), possibleMoves(node));
    });
  }
};
```

With the Target found the easiest way to find the path to it was to work backwards. Ammending the Map key to also inlude the the value that generated the key. with this value we can use recursion to work backwards and form a path.

```js
const addNode = (value, start) => {
  nextMoves.set(value.toString(), []);
  nextMoves.get(value.toString()).push(start);
};
```

With each Key having the value it came from we can use recursion to create the printed path

```js
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
  console.log(current);
  console.log(start);
  arr.push(current);
  console.log(arr);
  while (current.toString() !== start.toString()) {
    console.log(arr);
    console.log(`Current: ${current}`);
    arr.push(nextMoves.get(current.toString())[0]);
    current = nextMoves.get(current.toString())[0];
  }
  arr.pop();
  return arr.reverse();
};
```

The recurise method returns the path backwards along with the initial value at the end, So it's returned in order as an array which is then added to the returned string.

The Code returns the following after testing
`knightMoves([7,0], [0,0])` returns `A knight can move in 5 moves, starting from [7,0] to [0,0], using the shortest path [7,0][5,1][3,0][4,2][2,1][0,0]`
`knightMoves([1,2], [5,3])` returns ` A knight can move in 3 moves, starting from [1,2] to [5,3], using the shortest path [1,2][3,3][4,5][5,3]`
