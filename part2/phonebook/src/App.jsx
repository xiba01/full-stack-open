import { useEffect } from "react";
import { useState } from "react";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    error: false,
  });

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise");
      setPersons(initialPersons);
    });
  }, []);
  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p
              )
            );
            setNotification({
              message: `Modified ${returnedPerson.name}`,
              error: false,
            });
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${existingPerson.name} has already been removed from server`,
              error: true,
            });
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
      setNotification({ message: `Added ${personObject.name}`, error: false });
    }

    setTimeout(() => {
      setNotification({ message: null, error: false });
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const deletePersonOf = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => alert(`Failed to delete ${person.name}`));
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationInfo={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Persons
        persons={persons}
        filter={filter}
        deletePersonOf={deletePersonOf}
      />
    </div>
  );
};

const Filter = ({ text, filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <>
      <h2>add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = ({ persons, filter, deletePersonOf }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {persons
          .filter((person) =>
            filter === ""
              ? true
              : person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person) => (
            <Person
              person={person}
              key={person.name}
              deletePerson={() => deletePersonOf(person.id)}
            />
          ))}
      </div>
    </>
  );
};

const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name} {person.number}&nbsp;
      <span>
        <button onClick={deletePerson}>delete</button>
      </span>
    </p>
  );
};

const Notification = ({ notificationInfo }) => {
  if (notificationInfo.message === null) {
    return null;
  }

  return (
    <div
      className="notification"
      style={{
        color: notificationInfo.error ? "red" : "green",
      }}
    >
      {notificationInfo.message}
    </div>
  );
};

export default App;
