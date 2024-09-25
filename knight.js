class Graph {
  constructor(value) {
    this.value = new Node(value);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextMoves = ["test"];
  }
}
