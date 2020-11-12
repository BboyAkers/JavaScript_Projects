import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

const numbersCollection = new NumbersCollection([10, 3, -5, 0]);
numbersCollection.sort();
console.log(numbersCollection.data);

const charactersCollection = new CharactersCollection('Austin');
charactersCollection.sort();
console.log(charactersCollection);

const linkedList = new LinkedList();
linkedList.add(24);
linkedList.add(-50);
linkedList.add(30);
linkedList.add(6);

linkedList.sort();
linkedList.print();
