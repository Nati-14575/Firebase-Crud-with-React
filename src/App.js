import './App.css';
import {useEffect, useState} from "react";
import {db} from "./firebase-config";
import {collection,getDocs, addDoc,updateDoc,deleteDoc, doc} from "firebase/firestore"

function App() {
  const [users, setUsers] = useState(null);
  const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    const[email, setEmail] = useState("");
  const userReference = collection(db, "users");

  const handleSubmit  = async(e) => {
      e.preventDefault();
     await addDoc(userReference,{
          name: name,
          age: age,
          email: email
      }).then((res) => {
          console.log(res)
         getUsers()
     }).catch((err) => {
         console.log(err)
     })
  }

  const deleteUser = async(id) => {
  const  user = doc(db,"users",id)

      deleteDoc(user).then(() => {
          getUsers()
      })


}
    const getUsers = async () => {
        const data = await getDocs(userReference);
        setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    }
    const updateUser = async(id, age) => {
      console.log(id,age)
      const newFields = {age: (parseInt(age) + 1)}
        const userDoc = doc(db,"users",id)

        updateDoc(userDoc,newFields).then(() => {
            getUsers()
        })

    }

  useEffect(() => {
    getUsers()
  },[])
  return (
    <div className="App">
      <table className="table">
        <thead className="bg-primary text-light">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
        </thead>
      <tbody>
      {users && users.map((user) => {
        return <tr>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.email}</td>
          <td><button className={"btn btn-primary"} onClick={() => updateUser(user.id, user.age)}>Increase Age</button></td>
            <td><button className={"btn btn-danger"} onClick={() => deleteUser(user.id)}>Delete</button></td>
        </tr>
      })}
      </tbody>
      </table>

        <form className="mt-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className={"form-control"} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Age</label>
                <input type="text" className={"form-control"} value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className={"form-control"} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <input type={"submit"} value={"Create User"}/>
        </form>
    </div>
  );
}

export default App;
