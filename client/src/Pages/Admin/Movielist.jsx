import {useState ,useEffect} from 'react'
import { getAllmovies } from '../../Apis/Movies';
import {message , Button, Table ,Popconfirm} from 'antd';
import Movieform from './Movieform'
import { deleteSingleMovie } from '../../Apis/Movies'

function Movielist(){

    const [movies,setmovies] = useState([]);
    const [isModalopen, setIsModalOpen] =useState(false)
    const [selectedMovie,setSelectedMovie] = useState(null);
    
    const getmoviedata = async () =>{
        try{
            const response = await getAllmovies();
            const allmovies = response.data || response;
            setmovies(
                allmovies.map(function(item) {
                    return {...item , key : `movies${item._id}`}
                })
            );
            console.log(allmovies);

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
     getmoviedata()
    },[])

    const handledelete = async (id) =>{
      console.log(id);
        try{
          await deleteSingleMovie(id);
          message.success("movie deleted successfully");
           await getmoviedata();
        }catch(error){
            console.log(error);
            message.error("Failed to delete movie");
        }
    }

    const handleEdit = (record) =>{
     console.log(record);
     setSelectedMovie(record);
      setIsModalOpen(true);
    }


const tablecolumns = [
  {
  title: 'Poster',
  dataIndex: 'poster',
  render: (data) => (
    <img src={data?.posterUrl} alt="poster" style={{ width: 50 }} />
  )
},
  {
    title: "MovieName",
    dataIndex: "title"
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Duration',
    dataIndex: 'duration'
    
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
  },
  {
    title: 'RelaseDate',
    dataIndex: 'relaseDate',
    render: (text,data) => {
             let newdate = new Date(text)
             const formatteddate = newdate.toDateString()
             return(
                <span>{formatteddate}</span>
             )
            }
  },
  {
    title : 'Actions',
    dataIndex : 'actions',
    render : (_,record)=>{
      return(
        <div style={{display : "flex", gap : "10px"}}>
          <Button onClick= {()=> handleEdit(record)}>
             Edit </Button>
        
        <Popconfirm title = "Delete movie?" 
        onConfirm = { () =>{
        console.log(record._id);
        handledelete(record._id);
        }}>        
          <Button> Delete </Button>
        </Popconfirm>
        </div>
      )
    }

  },

  {
    title: 'Language',
    dataIndex: 'language',
  }
]


    return (
        <>
        <Button  onClick={() =>{
            setIsModalOpen(true)
        }}>

            Add Movie
        </Button>
        <div>
            {isModalopen && (
            <Movieform 
            isModalopen={isModalopen} 
            setIsModalOpen={setIsModalOpen}  
            reloaddata={getmoviedata}
            selectedMovie ={selectedMovie}
            />)}
                
        </div>
        <Table columns={tablecolumns} dataSource={movies} /> 
        </>
    )
}

export default Movielist;