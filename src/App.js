import logo from './logo.svg';
import './App.css';
import Cards from './pages/Cards/Cards';
import CardItem from './pages/CardItem/CardItem';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import 'antd/dist/reset.css';
import { Button, Input } from 'antd';
import { nanoid } from 'nanoid'

function App() {

  const createUserItem = () => {
    return {
      'id': nanoid(),
      'label': '',
      'web2': '',//
      'want': '',//
      'flag': '',
      'web3': '',//
      'avatar': '',//
      'uname': '',//
      'city': '',//
      'web3age': '',
    }
  }

  const fileRef = useRef(null);
  const [usersInfo, setUsersInfo] = useState([createUserItem()])

  const handleImage = () => {
    html2canvas(document.getElementById('cards'), {
      allowTaint: true
    }).then(function (canvas) {
      document.getElementById('result').appendChild(canvas);
    });
  }

  const handleMultiImage = async () => {
    const intros = document.querySelectorAll('.cardItem');
    const res = await Promise.all(Array.from(intros).map(async (item, index) => {
      const res = await html2canvas(intros[index], {
        allowTaint: true
      });
      document.getElementById('result').appendChild(res);
    }))
  }

  const handleAddUserItem = () => {
    const newItem = createUserItem();
    setUsersInfo([
      ...usersInfo,
      newItem
    ])
  }

  const handleInfo = (e, id) => {
    const inputVal = e.target.value;

    const newUsersInfo = usersInfo.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [e.target.name]: inputVal
        }
      }
      return item;
    })

    setUsersInfo(newUsersInfo);
  }

  const handleDeleteItem = (e, id) => {
    const newItems = usersInfo.filter(item => {
      return item.id !== id;
    })
    setUsersInfo(newItems);
  }

  const fileChange = (e) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      const jsonData = JSON.parse(reader.result);
      let ppt = jsonData.map(item => {
        let obj = {}
        for (let i in item) {
          if (i.includes('怎么称呼')) {
            obj['uname'] = item[i];
          }
          if (i.includes('城市')) {
            obj['city'] = item[i];
          }

          if (i.includes('资源')) {
            obj['want'] = item[i];
          }

          if (i.includes('多长时间')) {
            obj['web3age'] = item[i];
          }

          if (i.includes('目前从事')) {
            obj['web2'] = item[i];
          }

          if (i.includes('一些想法')) {
            obj['web3'] = item[i];
          }

          if (i.includes('成就')) {
            obj['flag'] = item[i];
          }

          if (i.includes('标签')) {
            obj['label'] = item[i];
          }

          if (i.includes('名片头像')) {
            obj['avatar'] = item[i];
          }
        }
        return obj;

      })

      setUsersInfo(ppt);
      console.log(ppt, 23);
    }
  }

  return (
    <div className="App">
      <div className='AppWrapper'>
        <div id='cards'>
          {
            usersInfo.map(userInfo => (
              <CardItem userInfo={userInfo} key={userInfo.id}></CardItem>
            ))
          }
        </div>
        <div className='editor'>
          <div className='editorWrapper'>
            <form>
              {
                usersInfo.map((userInfo) => (
                  <div className='userItem' key={userInfo.id}>
                    <div className='flex deleteArea'>
                      <span></span>
                      <span className='btnDelete' onClick={(e) => { handleDeleteItem(e, userInfo.id) }}>删除</span>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="label">个人标签</label>
                      <div>
                        <Input type='text' placeholder='个人标签' id='label' name='label' value={userInfo.label} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="web2">Web2 职业</label>
                      <div>
                        <Input type="text" placeholder='Web2 职业' id='web2' name='web2' value={userInfo.web2} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="want">我想要</label>
                      <div>
                        <Input type="text" placeholder='我想要' id='want' name='want' value={userInfo.want} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="job">立个FLAG</label>
                      <div>
                        <Input type="text" placeholder='立个FLAG' id='job' name='flag' value={userInfo.flag} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="web3">WEB3看法</label>
                      <div>
                        <Input type="text" placeholder='WEB3看法' id='web3' name='web3' value={userInfo.web3} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="web3">Name</label>
                      <div>
                        <Input type="text" placeholder='WEB3看法' id='uname' name='uname' value={userInfo.uname} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="web3">City</label>
                      <div>
                        <Input type="text" placeholder='city' id='city' name='city' value={userInfo.city} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="web3">Web3 Age</label>
                      <div>
                        <Input type="text" placeholder='WEB3看法' id='web3age' name='web3age' value={userInfo.web3age} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                    <div className='editorItem'>
                      <label htmlFor="avatar">avatar头像</label>
                      <div>
                        <Input type="text" placeholder='头像链接🔗' id='avatar' name='avatar' value={userInfo.avatar} onChange={(e) => { handleInfo(e, userInfo.id) }} />
                      </div>
                    </div>
                  </div>
                ))
              }

              <div className='flex-center'>
                <Button type="primary" onClick={() => { handleAddUserItem() }} className='mr-12'>新增一条</Button>
                <Button type="primary" onClick={() => { handleImage() }} className='mr-12'>生成整张名片</Button>
                <Button type="primary" onClick={() => { handleMultiImage() }}>生成多个单张</Button>
              </div>
              <div className='padding-24'>
                <Input type='file' onChange={fileChange}></Input>
              </div>
            </form>
          </div>
        </div >
      </div>
      <div className='resultArea'>
        <h2 className='flex-center'>生成图片区域</h2>
        <div id='result' className='flex-center'></div>
      </div>
    </div >
  );
}

export default App;
