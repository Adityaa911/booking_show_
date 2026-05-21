import {Tabs} from 'antd'
import ShowsList from './ShowsList'
function  Owners(){

    const tabItems = [
  { key: '1', 
    label: 'Shows',
     children: <div><ShowsList/></div> 
}
    ]

return (
        <>
        <h1>Theater Onwer's</h1>
        <Tabs items={tabItems}/>
        </>
    );

}

export default Owners;