import { useEffect } from 'react';
import { fetchUsers,addUser } from '../store';
import { useSelector } from 'react-redux';
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';


export default function UsersList() {

    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError]= useThunk(addUser);

    const {data}=useSelector((state)=>{
        return state.users;
    })
    useEffect(()=>{
    doFetchUsers();       
    },[doFetchUsers]);

    const handleUserAdd = ()=>{
        doCreateUser();
    }

    let content;
    if(isLoadingUsers){
      content=  <div><Skeleton times={6} className='h-10 w-full'/></div>
    }
    else if(loadingUsersError){
        content= <div>Error fetching data.... </div>
    }
    else{
       content= data.map((user)=>{
           return <UsersListItem key={user.id} user={user} />;
        })
    }
    

  return (
    <div>
    <div className='flex flex-row justify-between items-centre m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading={isCreatingUser} error={creatingUserError} onClick={handleUserAdd}>+ Add User</Button> 
    </div>
     {content}
    </div>
  )
}