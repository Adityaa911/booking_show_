import { Tabs } from "antd";
import Movielist from './Movielist'
import TheaterList from './TheatreList'

function Admin (){
  
    const tabItems = [
  { key: '1', 
    label: 'Movies',
     children: <div><Movielist/></div> }
     ,
  { key: '2',
     label: 'Theatres',
      children: <div><TheaterList/></div> },
 
]

    return (
        <>
        <h1>Admin</h1>
        <Tabs items={tabItems}/>
        </>
    );
}

export default Admin;
