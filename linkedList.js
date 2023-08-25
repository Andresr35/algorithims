const LinkedList = () => {
  let head,
    tail,
    size = 0;
  const getHead = () => head;
  const getTail = () => tail;
  const getSize = () => size;

  const append = (value) => {
    size++;
    if (head == null) {
      head = Nodee(value);
      tail = head;
    } else {
      tail.nextNode = Nodee(value);
      tail = tail.nextNode;
    }
  };

  const prepend = (value) => {
    size++;
    if (head == null) {
      head = Nodee(value);
      tail = head;
    }
    head = Nodee(value, head);
  };

  const at = (index) => {
    let pointer = head;
    while (index !== 0) {
      pointer = pointer.nextNode;
      index--;
    }
    return pointer;
  };

  const pop = () => {
    let pointer = head;
    while (pointer.nextNode.nextNode !== null) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = null;
    tail = pointer;
  };

  const contains = (value) => {
    let pointer = head;
    while (pointer !== null) {
      if (pointer.value == value) return true;
      pointer = pointer.nextNode;
    }
    return false;
  };

  const find = (value) => {
    let index = 0;
    let pointer = head;
    while (pointer !== null) {
      if (pointer.value == value) return index;
      index++;
      pointer = pointer.nextNode;
    }
    return null;
  };

  const toString = () => {
    let pointer = head;
    let s = "";
    while (pointer !== null) {
      s += `(${pointer.value})->`;
      pointer = pointer.nextNode;
    }
    s += "null";
    return s;
  };

  const insertAt = (index, value) => {
    let pointer = head;
    while (index !== 1) {
      index--;
      pointer = pointer.nextNode;
    }
    pointer.nextNode = Nodee(value, pointer.nextNode);
  };

  const removeAt = (index) => {
    let pointer = head;
    while (index != 1) {
      index--;
      pointer = pointer.nextNode;
    }
    pointer.nextNode = pointer.nextNode.nextNode;
  };

  return {
    append,
    prepend,
    getTail,
    getHead,
    getSize,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};

const Nodee = (value = null, nextNode = null) => {
  return { value, nextNode };
};

const linkedList = LinkedList();
linkedList.append("1");
linkedList.append("2");
linkedList.append("3");
linkedList.append("4");
console.log(linkedList.toString());
console.log(linkedList.getTail());
console.log(linkedList.contains("4"));
linkedList.pop();
console.log(linkedList.contains("4"));
console.log(linkedList.getTail());
console.log(linkedList.contains("2"));
console.log(linkedList.find("2"));
console.log(linkedList.find("3"));
console.log("\n" + linkedList.toString());
linkedList.insertAt(2, "5");
console.log(linkedList.toString());
linkedList.removeAt(2);
console.log(linkedList.toString());
