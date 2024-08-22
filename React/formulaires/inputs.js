

const Form = ({onSubmit, onChange})=>{
    return(
        <>
            <form onSubmit={onSubmit} className='flex space-between'>
                <input type="text" onChange={onChange} name="title" placeholder="title"/>
                <input type="text" onChange={onChange} name="link" placeholder="link"/>
                <button type="submit">Add</button>
            </form>
        </>
    )
}


function App(){
    const libaries = [
        {title : "React", link : "https://reactjs.org"},
        {title : "Angular", link : "https://angular.io/"},
        {title : "Bootstrap", link : "https://getbootstrap.com/"}
    ]

    const [input, setInput] = useState(null);
    const [items, setItems] = useState(items);
    
    const handleOnChange = e => setInput({...input, [e.target.name]: e.target.value });
    const handleOnSubmit = e =>{
        e.preventDefault()

        if(!input?.title || !input?.link) {return false};

        setItems([input, ...items]);
        setInput(null);
    }

    return (
        <div>
            <header className="App-header">
                <Form onChange={handleOnChange} onSubmit={handleOnSubmit}/>
                {
                    libaries.map((lib, i)=>{
                        return (
                        <Compnent 
                            index = {i}
                            key={lib.link}
                            title = {lib.title}
                            link = {lib.link}
                        />
                    )
                    })
                }
            </header>
        </div>
    )
}