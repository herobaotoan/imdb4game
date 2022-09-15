import React, { useState, useEffect } from "react"

export default function Admin() {
    const [data, setData] = useState([])
    const endPoint = "http://localhost:4001/games"
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [platform, setPlatform] = useState('')
    const [developer, setDeveloper] = useState('')
    const [img, setImg] = useState('')
    const [rating, setRating] = useState([])
    const [newRating, setNewRating] = useState(0)

    // const [statement, setStatement] = useState('')
    // const [isShown, setIsShown] = useState(false);

    const save = () => {
        if (id===''){
            fetch(endPoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, genre: genre, developer:developer, platform: platform, rating: [(Number)(newRating)], img: img})
            }).then(data => load())
        }
        else{
            fetch(endPoint, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id, name: name, genre: genre, developer:developer, platform: platform, rating: rating, img: img})
            }).then(data => load())
        }
    }
        
    const deleteGame = (id) => {
        fetch(endPoint+"/"+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => load())
    }
    const editGame = (id, name, genre, developer, platform, img, rating) => {
        setId(id)
        setName(name)
        setGenre(genre)
        setDeveloper(developer)
        setPlatform(platform)
        setImg(img)
        setRating(rating)
    }

    function addnew(){
        setId('')
        setName('')
        setGenre('')
        setDeveloper('')
        setPlatform('')
        setImg('')
        setRating([])
    }

    const load = () => {
        fetch(endPoint)
          .then(response => response.json())
          .then(data => setData(data));
    }
    useEffect(() => {
        load()
    })

    return(
        <div>
            <h2>Game Form</h2>
            <input type="hidden" class="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>

            <div class="form-group">
            <label>Name:</label><input type="text" class="form-control col-5" value={name} onChange={(e)=>setName(e.target.value)}/>
            <label>Genre: {genre}</label>
            <div class="text-dark">
            <select class="form-control col-1" id="Genres" onChange={()=>setGenre(document.getElementById("Genres").value)}>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Platform">Platform</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Racing">Racing</option>
                <option value="RPG">RPG</option>
                <option value="Shooting">Shooting</option>
                <option value="Simulation">Simulation</option>
                <option value="Sport">Sport</option>
                <option value="Strategy">Strategy</option>
            </select>
            </div>
            <label>Developer:</label><input type="text" class="form-control col-5" value={developer} onChange={(e)=>setDeveloper(e.target.value)}/>
            <label>Platform: {platform}</label>
            <div class="text-dark">
            <select class="form-control col-1" id="Platforms" onChange={()=>setPlatform(document.getElementById("Platforms").value)}>
                <option value="Android">Android</option>
                <option value="PC">PC</option>
                <option value="PS4">PS4</option>
                <option value="PS5">PS5</option>
                <option value="Switch">Switch</option>
                <option value="Xbox">Xbox</option>
            </select>
            </div>
            <label>Image (URL):</label><input type="text" class="form-control col-5" value={img} onChange={(e)=>setImg(e.target.value)}/>
            <label>Rating: </label>
            <div class="text-dark">
            <select class="form-control col-1" id="Ratings" onChange={()=>setNewRating((Number)(document.getElementById("Ratings").value))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            </div>
        </div>

        <button class="btn btn-primary" onClick={()=> save()}>Save</button>

        <button class="btn btn-primary" onClick={()=> addnew()}>Add new</button>

        <h2>All Game</h2>
        <table class="table table-dark table-borderless">
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Developer</th>
            <th>Platform</th>
            <th>Rating</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>      
          {data.map(a => (
            <tr>
                <td>{a.name}</td>
                <td>{a.genre}</td>
                <td>{a.developer}</td>
                <td>{a.platform}</td>
                <td>{a.rating}</td>
                <td>{a.img}</td>
                <td><button className="btn btn-warning" onClick={()=> deleteGame(a._id)}>Delete</button>
                <button className="btn btn-warning" onClick={()=> editGame(a._id, a.name, a.genre, a.developer, a.platform, a.img, a.rating)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>  
        
    </div>
    )
}